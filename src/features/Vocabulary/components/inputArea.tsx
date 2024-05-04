import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	Button,
	HStack,
} from "@chakra-ui/react";
import { useVocabularyForm } from "@Vocabulary/hooks/useVocabularyForm";

export const InputArea = () => {
	const { handleSubmit, onAddSubmit, register, errors, isSubmitting } =
		useVocabularyForm(undefined, () => {});

	return (
		<form onSubmit={handleSubmit(onAddSubmit)} id="vocabulary-add-form">
			<FormControl isInvalid={errors.title && true}>
				<FormLabel htmlFor="title"></FormLabel>
				<HStack>
					<Input
						id="title"
						width={"25em"}
						{...register("title", {
							required: "必須項目です。",
							maxLength: { value: 190, message: "190文字までの入力です。" },
						})}
						placeholder="追加する内容を入力してください"
					/>
					<Button
						size="sm"
						colorScheme="teal"
						isLoading={isSubmitting}
						type="submit"
						id="vocabulary-submit-button"
					>
						追加
					</Button>
				</HStack>
				<FormErrorMessage>
					{errors.title && errors.title.message}
				</FormErrorMessage>
			</FormControl>
		</form>
	);
};
