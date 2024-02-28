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
import { Question } from "@prisma/client";

export const InputArea: FC<{
	submitFlg: boolean;
	setSubmitFlg: Dispatch<SetStateAction<boolean>>;
}> = ({ submitFlg, setSubmitFlg }) => {
	const url = process.env.NEXT_PUBLIC_API_URL;
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<Question>();
	const toast = useToast();

	async function onSubmit(values: Question) {
		if (values.question_title === "") {
			return;
		}
		await fetch(`${url}/question`, {
			method: "post",
			headers: {},
			body: JSON.stringify(values),
		})
			.then(() => {
				setValue("question_title", "");
				setSubmitFlg(!submitFlg);
				toast({
					title: "Success",
					description: "追加に成功しました。",
					status: "success",
					isClosable: true,
				});
			})
			.catch((e) => console.error(e));
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={errors.question_title && true}>
				<FormLabel htmlFor="question_title"></FormLabel>
				<HStack>
					<Input
						id="question_title"
						placeholder="問題のタイトルを入力してください"
						{...register("question_title", {
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
					{errors.question_title && errors.question_title.message}
				</FormErrorMessage>
			</FormControl>
		</form>
	);
};
