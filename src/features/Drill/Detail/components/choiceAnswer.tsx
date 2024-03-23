import { Answer } from "@prisma/client";
import { Text, HStack, Button } from "@chakra-ui/react";
import { Dispatch } from "react";

type props = {
	answer: Answer;
	index: number;
	onClickAnswerIndex: number | undefined;
	setOnClickAnswerIndex: Dispatch<number | undefined>;
};

export const ChoiceAnswer: React.FC<props> = (props) => {
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	const onClickChoice = () => {
		if (props.onClickAnswerIndex === undefined) {
			props.setOnClickAnswerIndex(props.index);
		}
	};
	return (
		<>
			<HStack spacing={5} margin={"1rem"}>
				<Button colorScheme="blue" onClick={onClickChoice}>
					{alphabet.at(props.index)}
				</Button>

				<Text>{props.answer?.answer_content ?? ""}</Text>

				<Text hidden={true}>
					{props.answer?.answer_is_correct_content ? "O" : "X"}
				</Text>
			</HStack>
		</>
	);
};
