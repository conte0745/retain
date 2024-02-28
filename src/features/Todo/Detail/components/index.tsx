import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { Todo } from "@prisma/client";
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
	detailTodo: Todo | undefined;
}> = ({ isOpen, onClose, submitFlg, setSubmitFlg, detailTodo }) => {
	const initialRef = useRef(null);
	const finalRef = useRef(null);
	const toast = useToast();
	const options = { timeZone: "Asia/Tokyo" };

	const url = process.env.NEXT_PUBLIC_API_URL;
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<Todo>();

	const {
		handleSubmit: handleDelSubmit,
		register: delRegister,
		setValue: setDelValue,
		formState: { isSubmitting: isDelSubmitting },
	} = useForm<Todo>();

	async function onUpdateSubmit(values: Todo) {
		if (values.content === "") {
			return;
		}

		await fetch(`${url}/todo/update/${values.todo_id}`, {
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

	async function onDeleteSubmit(values: Todo) {
		await fetch(`${url}/todo/delete/${values.todo_id}`, {
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
			setValue("content", detailTodo?.content ?? "");
			setValue("todo_id", Number(detailTodo?.todo_id) ?? "");
			setDelValue("todo_id", Number(detailTodo?.todo_id) ?? "");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [detailTodo?.todo_id]);

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
					<ModalHeader>Todo</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<form onSubmit={handleSubmit(onUpdateSubmit)} id="update">
							<FormControl isInvalid={errors.content && true}>
								<FormLabel htmlFor="update_content">内容</FormLabel>
								<Input
									defaultValue={detailTodo?.content}
									id="update_content"
									{...register("content", {
										required: "必須項目です。",
										maxLength: {
											value: 190,
											message: "190文字までの入力です。",
										},
									})}
								/>
								<Input
									type="hidden"
									defaultValue={detailTodo?.todo_id}
									{...register("todo_id")}
								/>
								<FormErrorMessage>
									{errors.content && errors.content.message}
								</FormErrorMessage>

								<Badge>{`作成日：${detailTodo?.created_at.toLocaleString(
									"ja-JP",
									options
								)}`}</Badge>
								<br />
								{!detailTodo?.updated_at ? (
									""
								) : (
									<Badge>{`更新日：${detailTodo?.updated_at.toLocaleString(
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
							defaultValue={detailTodo?.todo_id}
							{...delRegister("todo_id")}
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
