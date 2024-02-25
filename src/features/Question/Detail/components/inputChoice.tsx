import { Answer } from "@prisma/client";
import {
	Button,
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Spacer,
	Textarea,
} from "@chakra-ui/react";
import {
	Control,
	FieldErrors,
	UseFieldArrayRemove,
	UseFormRegister,
} from "react-hook-form";
import { QuestionAnswer } from "@/types/QuestionAnswer";
import { useState } from "react";

type props = {
	answer: Answer;
	control: Control<QuestionAnswer, QuestionAnswer, QuestionAnswer>;
	errors: FieldErrors<QuestionAnswer>;
	index: number;
	register: UseFormRegister<QuestionAnswer>;
	remove: UseFieldArrayRemove;
};
export const InputChoice: React.FC<props> = (props) => {
	const [isCorrect, setIsCorrect] = useState<boolean>(
		props.answer?.answer_is_correct_content
	);
	const [isPublic, setIsPublic] = useState<boolean>(
		props.answer?.answer_public_flag
	);
	return (
		<>
			<br />
			<HStack spacing={10}>
				<FormLabel htmlFor={`answer_${props.index}`}>
					選択肢 {props.index + 1}
				</FormLabel>
				<Checkbox
					colorScheme="blue"
					defaultChecked={props.answer?.answer_public_flag}
					{...props.register(
						`answers.${props.index}.answer_public_flag` as const
					)}
					onChange={() => setIsPublic(!isPublic)}
				>
					{isPublic ? "公開中" : "非公開"}
				</Checkbox>
				<Checkbox
					colorScheme="green"
					defaultChecked={props.answer?.answer_is_correct_content}
					{...props.register(
						`answers.${props.index}.answer_is_correct_content` as const
					)}
					onChange={() => setIsCorrect(!isCorrect)}
				>
					{isCorrect ? "大正解" : "不正解"}
				</Checkbox>
				<Spacer />
				{props.answer.answer_id === -1 ? (
					<Button
						size="sm"
						margin="0 0.5rem 0 0"
						onClick={() => props.remove(props.index)}
					>
						削除
					</Button>
				) : (
					<Checkbox
						colorScheme="red"
						defaultChecked={props.answer?.answer_deleted_flag}
						{...props.register(
							`answers.${props.index}.answer_deleted_flag` as const
						)}
					>
						削除
					</Checkbox>
				)}
			</HStack>
			<FormControl
				isInvalid={props.errors.answers?.[props.index]?.answer_content && true}
			>
				<Textarea
					defaultValue={props.answer?.answer_content ?? ""}
					id={`answer_${props.index}`}
					{...props.register(`answers.${props.index}.answer_content` as const, {
						required: "必須項目です。",
						maxLength: {
							value: 190,
							message: "190文字までの入力です。",
						},
					})}
				/>
				<Input
					type="hidden"
					defaultValue={props.answer?.answer_id ?? -1}
					id={`answer_id_${props.index}`}
					{...props.register(`answers.${props.index}.answer_id` as const)}
				/>

				<FormErrorMessage>
					{props.errors.answers?.[props.index]?.answer_content?.message}
				</FormErrorMessage>
			</FormControl>
		</>
	);
};
