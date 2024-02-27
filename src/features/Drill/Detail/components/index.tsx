import { FC, useEffect, useState } from "react";
import { Question, AnswerResult, Answer } from "@prisma/client";
import {
	Button,
	Card,
	Box,
	CardHeader,
	Text,
	CardBody,
	CardFooter,
	HStack,
	Input,
	Spacer,
	Heading,
	Divider,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ChoiceAnswer } from "./choiceAnswer";
import { LoadingAnswer } from "@Drill/components/loadingAnswer";
import { fetchAnswers } from "@DrillDetail/hooks/fetchAnswers";
import { postAnswerResult } from "@/features/Drill/Detail/hooks/postAnswerResult";
import { useLocation, useNavigate } from "react-router-dom";

export const DetailDrill: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [onLoading, setOnLoading] = useState<boolean>(true);
	const [afterSubmit, setAfterSubmit] = useState<boolean>(false);
	const [isCorrect, setIsCorrect] = useState<boolean>(false);
	const [answers, setAnswers] = useState<Answer[] | undefined | null>();
	const detailQuestion: Question | undefined = location.state;
	const isCorrectAlphabets: number[] = [];

	const {
		handleSubmit,
		register,
		formState: { isSubmitting },
	} = useForm<AnswerResult>({
		mode: "onSubmit",
		reValidateMode: "onSubmit",
	});

	async function onSubmit(values: AnswerResult) {
		try {
			await postAnswerResult(values);
		} catch (e) {
			console.error(e);
		} finally {
			setAfterSubmit(!afterSubmit);
		}
	}

	useEffect(() => {
		if (!detailQuestion) return;

		setOnLoading(true);
		(async () => {
			const answers = await fetchAnswers(detailQuestion!.question_id);
			answers.forEach((e, idx) =>
				e.answer_is_correct_content ? isCorrectAlphabets.push(idx) : ""
			);
			setAnswers(answers);
		})();
		setOnLoading(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Card margin={"1rem 0 0 0 "}>
				<CardHeader>
					<Heading size={"md"}>Question</Heading>
				</CardHeader>
				<Divider />
				<CardBody pb={6}>
					{onLoading ? (
						<LoadingAnswer></LoadingAnswer>
					) : (
						<>
							<Box>
								<Text>{detailQuestion?.question_title}</Text>
							</Box>
							<br />
							<Box>
								<Text>{detailQuestion?.question_content}</Text>
							</Box>
							<br />

							<Box borderWidth={"1px"} borderRadius={"md"} padding={"0.5rem"}>
								{answers &&
									answers.map((item, index) => (
										<ChoiceAnswer
											key={item.answer_id}
											answer={item}
											index={index}
											setAfterSubmit={setAfterSubmit}
											afterSubmit={afterSubmit}
											setIsCorrect={setIsCorrect}
										/>
									))}
							</Box>

							<br />

							{afterSubmit && (
								<>
									<Box>
										<Text>{isCorrect ? "大正解" : "不正解"}</Text>
										<Text></Text>
										<Text>{isCorrectAlphabets.toString()}</Text>
									</Box>
									<br />
									<Box>
										<Text>よくわかりそうな解説</Text>
										<Text>{detailQuestion?.question_explanation}</Text>
									</Box>
									<HStack>
										<Spacer />
										<Text>FB :</Text>
										<Text>
											{detailQuestion?.question_count_incorrect_question}
										</Text>
									</HStack>
								</>
							)}
						</>
					)}
				</CardBody>
				<CardFooter>
					<Button
						colorScheme="teal"
						mr={2}
						onClick={() => {
							navigate("/drill");
						}}
					>
						問題一覧に戻る
					</Button>
					<Spacer />
					<form onSubmit={handleSubmit(onSubmit)} id="update">
						<Input
							type="hidden"
							defaultValue={undefined}
							{...register("answer_result_user_uuid")}
						/>
						<Input
							type="hidden"
							defaultValue={detailQuestion?.question_id}
							{...register("answer_result_question_id")}
						/>
						<Input
							type="hidden"
							defaultValue={0}
							{...register("answer_result_is_correct")}
						/>
						<Button
							colorScheme="teal"
							mr={2}
							isLoading={isSubmitting}
							form="update"
							type="submit"
						>
							次へ
						</Button>
					</form>
				</CardFooter>
			</Card>
		</>
	);
};
