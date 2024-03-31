"use client";

import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { Vocabulary } from "@prisma/client";
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	FormControl,
	ModalHeader,
	FormLabel,
	Input,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	Badge,
	FormErrorMessage,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export const ModalArea: FC<{
	isOpen: boolean;
	onClose: () => void;
	submitFlg: boolean;
	setSubmitFlg: Dispatch<SetStateAction<boolean>>;
	detailVocabulary: Vocabulary | undefined;
}> = ({ isOpen, onClose, submitFlg, setSubmitFlg, detailVocabulary }) => {
	const initialRef = useRef(null);
	const finalRef = useRef(null);
	const toast = useToast();
	const options = { timeZone: "Asia/Tokyo" };

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<Vocabulary>();

	const {
		handleSubmit: handleDelSubmit,
		register: delRegister,
		setValue: setDelValue,
		formState: { isSubmitting: isDelSubmitting },
	} = useForm<Vocabulary>();

	async function onUpdateSubmit(values: Vocabulary) {
		if (values.title === "") {
			return;
		}

		await fetch(`/api/vocabulary/update/${values.vocabulary_id}`, {
			method: "post",
			headers: {
				// "Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then((response) => {
				if (response.ok) {
					setSubmitFlg(!submitFlg);
					onClose();
					response.json();
					toast({
						title: "Success",
						description: "更新に成功しました。",
						status: "success",
						isClosable: true,
					});
				}
			})
			.catch((e) => console.error(e));
	}

	async function onDeleteSubmit(values: Vocabulary) {
		await fetch(`api/vocabulary/delete/${values.vocabulary_id}`, {
			method: "post",
			headers: {
				// "Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.ok) {
					setSubmitFlg(!submitFlg);
					onClose();
					response.json();
					toast({
						title: "Success",
						description: "削除に成功しました。",
						status: "warning",
						isClosable: true,
					});
				}
			})
			.catch((e) => console.error(e));
	}

	useEffect(() => {
		if (isOpen) {
			setValue("title", detailVocabulary?.title ?? "");
			setValue("vocabulary_id", Number(detailVocabulary?.vocabulary_id) ?? "");
			setDelValue(
				"vocabulary_id",
				Number(detailVocabulary?.vocabulary_id) ?? ""
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [detailVocabulary?.vocabulary_id]);

	return (
		<>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Vocabulary</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<form onSubmit={handleSubmit(onUpdateSubmit)} id="update">
							<FormControl isInvalid={errors.title && true}>
								<FormLabel htmlFor="update_title">用語</FormLabel>
								<Input
									defaultValue={detailVocabulary?.title}
									id="update_title"
									{...register("title", {
										required: "必須項目です。",
										maxLength: {
											value: 190,
											message: "190文字までの入力です。",
										},
									})}
								/>
								<FormErrorMessage>
									{errors.title && errors.title.message}
								</FormErrorMessage>
								<br />
								<br />
								<FormLabel htmlFor="update_description">説明</FormLabel>
								<Input
									defaultValue={detailVocabulary?.description ?? ""}
									id="update_description"
									{...register("description", {
										maxLength: {
											value: 190,
											message: "190文字までの入力です。",
										},
									})}
								/>
								<FormErrorMessage>
									{errors.description && errors.description.message}
								</FormErrorMessage>
								<br />
								<br />
								<Input
									type="hidden"
									defaultValue={detailVocabulary?.vocabulary_id}
									{...register("vocabulary_id")}
								/>

								<Badge>{`作成日：${detailVocabulary?.created_at.toLocaleString(
									"ja-JP",
									options
								)}`}</Badge>
								<br />
								{!detailVocabulary?.updated_at ? (
									""
								) : (
									<Badge>{`更新日：${detailVocabulary?.updated_at.toLocaleString(
										"ja-JP",
										options
									)}`}</Badge>
								)}
							</FormControl>
						</form>
					</ModalBody>
					<form onSubmit={handleDelSubmit(onDeleteSubmit)} id="delete">
						<Input
							type="hidden"
							defaultValue={detailVocabulary?.vocabulary_id}
							{...delRegister("vocabulary_id")}
						/>
					</form>
					<ModalFooter>
						<Button
							colorScheme="teal"
							mr={2}
							isLoading={isSubmitting}
							form="update"
							type="submit"
						>
							更新
						</Button>
						<Button
							colorScheme="red"
							mr={2}
							isLoading={isDelSubmitting}
							form="delete"
							type="submit"
						>
							削除
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
