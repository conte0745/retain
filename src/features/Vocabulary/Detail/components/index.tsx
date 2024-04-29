import { Dispatch, FC, useEffect, useRef, useState } from "react";
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
	Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useVocabularies } from "@Vocabulary/VocabularyContext";

interface ModalAreaProps {
	isOpen: boolean;
	onClose: () => void;
	setSubmitId: Dispatch<number | null>;
	detailVocabulary: Vocabulary;
}

export const ModalArea: FC<ModalAreaProps> = ({
	isOpen,
	onClose,
	detailVocabulary,
}) => {
	const initialRef = useRef<HTMLInputElement>(null);
	const finalRef = useRef<HTMLInputElement>(null);
	const toast = useToast();
	const options = { timeZone: "Asia/Tokyo" };
	const [isHidden, setIsHidden] = useState<boolean>(true);
	const { vocabularies, setVocabularies } = useVocabularies();

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

	const onUpdateSubmit = async (values: Vocabulary) => {
		if (values.title === "") return;

		try {
			const response = await fetch(
				`/api/vocabulary/update/${values.vocabulary_id}`,
				{
					method: "post",
					body: JSON.stringify(values),
				}
			);

			if (response.ok) {
				const { message } = await response.json();
				if (message === "OK") {
					toast({
						title: "Success",
						description: "更新に成功しました。",
						status: "success",
						isClosable: true,
					});
					setVocabularies((prevItems) => {
						const newItems = prevItems ? [...prevItems] : [];
						const index = vocabularies?.findIndex(
							(v) => v.vocabulary_id === values.vocabulary_id
						);
						if (index !== undefined && index >= 0)
							newItems[index] = {
								vocabulary_id: detailVocabulary.vocabulary_id,
								title: values.title,
								description: values.description,
								created_at: detailVocabulary.created_at,
								updated_at: new Date(),
								deleted_at: detailVocabulary.deleted_at,
								isDisplay: true,
							};

						return newItems;
					});
					onClose();
				} else {
					toast({
						title: "エラー",
						description: "使用できない単語が含まれています。",
						status: "error",
						isClosable: true,
					});
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	const onDeleteSubmit = async (values: Vocabulary) => {
		try {
			const response = await fetch(
				`api/vocabulary/delete/${values.vocabulary_id}`,
				{
					method: "post",
				}
			);

			if (response.ok) {
				toast({
					title: "Success",
					description: "削除に成功しました。",
					status: "warning",
					isClosable: true,
				});
				setVocabularies((prevItems) => {
					if (prevItems !== null) {
						return prevItems.filter(
							(v) => v.vocabulary_id !== detailVocabulary.vocabulary_id
						);
					} else return [];
				});
				onClose();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleToggleDescription = () => {
		setIsHidden(false);
		setValue("description", detailVocabulary.description ?? "未作成");
		console.log("click");
	};

	useEffect(() => {
		if (isOpen) {
			setIsHidden(true);
			setValue("title", detailVocabulary?.title ?? "");
			setValue("vocabulary_id", detailVocabulary.vocabulary_id);
			setDelValue("vocabulary_id", detailVocabulary.vocabulary_id);
			setValue("description", "内緒");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	return (
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
							<Button onClick={handleToggleDescription} isDisabled={!isHidden}>
								答え
							</Button>
							<br />
							<br />
							<FormLabel htmlFor="update_description">説明</FormLabel>
							<Textarea
								defaultValue={detailVocabulary?.description ?? ""}
								size="md"
								rows={10}
								isDisabled={isHidden}
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
								defaultValue={detailVocabulary.vocabulary_id}
								{...register("vocabulary_id")}
							/>
							{detailVocabulary?.created_at && (
								<Badge>{`作成日：${detailVocabulary?.created_at.toLocaleString(
									"ja-JP",
									options
								)}`}</Badge>
							)}
							<br />
							{detailVocabulary?.updated_at && (
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
						defaultValue={detailVocabulary.vocabulary_id}
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
	);
};

// https://github.com/naveenchr/SpringBoot-SeleniumFramework
