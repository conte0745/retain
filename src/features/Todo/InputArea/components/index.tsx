import { FC, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	Button,
	HStack,
	useToast,
} from "@chakra-ui/react";
import { Todo } from "@prisma/client";

export const InputArea: FC<{
	submitFlg: boolean;
	setSubmitFlg: Dispatch<SetStateAction<boolean>>;
}> = ({ submitFlg, setSubmitFlg }) => {
	const url = import.meta.env.VITE_PUBLIC_API_URL;
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<Todo>();
	const toast = useToast();

	async function onSubmit(values: Todo) {
		if (values.content === "") {
			return;
		}
		await fetch(`${url}/todo`, {
			method: "post",
			headers: {
				// "Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then(() => {
				setValue("content", "");
				setSubmitFlg(!submitFlg);
				toast({
					title: "Success",
					description: "追加に成功しました。",
					status: "success",
					isClosable: true,
				});
			})
			.catch((e) => console.log(e));
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={errors.content && true}>
				<FormLabel htmlFor="content"></FormLabel>
				<HStack>
					<Input
						id="content"
						{...register("content", {
							required: "必須項目です。",
							maxLength: { value: 190, message: "190文字までの入力です。" },
						})}
					/>
					<Button
						size="sm"
						colorScheme="teal"
						isLoading={isSubmitting}
						type="submit"
					>
						追加
					</Button>
				</HStack>
				<FormErrorMessage>
					{errors.content && errors.content.message}
				</FormErrorMessage>
			</FormControl>
		</form>
	);
};
