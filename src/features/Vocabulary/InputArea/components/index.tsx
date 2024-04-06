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
import { Vocabulary } from "@prisma/client";

export const InputArea: FC<{
	submitFlg: boolean;
	setSubmitFlg: Dispatch<SetStateAction<boolean>>;
}> = ({ submitFlg, setSubmitFlg }) => {
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<Vocabulary>({ reValidateMode: "onSubmit" });
	const toast = useToast();

	async function onSubmit(values: Vocabulary) {
		if (values.title === "") {
			return;
		}
		await fetch(`api/vocabulary`, {
			method: "post",
			headers: {
				// "Content-Type": "application/json",
			},
			body: JSON.stringify(values),
		})
			.then(async (response) => {
				setValue("title", "");
				const { message } = await response.json();
				if (message === "OK") {
					setSubmitFlg(!submitFlg);
					toast({
						title: "Success",
						description: "追加に成功しました。",
						status: "success",
						isClosable: true,
					});
				} else {
					toast({
						title: "エラー",
						description: "使用できない単語が含まれています。",
						status: "error",
						isClosable: true,
					});
				}
			})
			.catch((e) => console.error(e));
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={errors.title && true}>
				<FormLabel htmlFor="title"></FormLabel>
				<HStack>
					<Input
						id="title"
						{...register("title", {
							required: "必須項目です。",
							maxLength: { value: 190, message: "190文字までの入力です。" },
						})}
					/>
					<Button
						size="sm"
						colorScheme="teal"
						isLoading={isSubmitting}
						type="submit"
						className="vocabulary-submit"
					>
						追加
					</Button>
				</HStack>
				<FormErrorMessage className="error">
					{errors.title && errors.title.message}
				</FormErrorMessage>
			</FormControl>
		</form>
	);
};
