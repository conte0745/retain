"use client";

import { useEffect, useState } from "react";
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
import { fetchAnswers } from "@Drill/Detail/hooks/fetchAnswers";
import { postAnswerResult } from "@Drill/Detail/hooks/postAnswerResult";
import { Answer, AnswerResult, Question } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuthContext } from "@/features/Authentication/components/AuthProvider";

export const DetailDrill = () => {
	const searchParams = useSearchParams();
	const question_id = searchParams.get("question_id") as unknown as number;
	const [onLoading, setOnLoading] = useState<boolean>(true);
	const [afterSubmit, setAfterSubmit] = useState<boolean>(false);
	const [isCorrect, setIsCorrect] = useState<boolean>(false);
	const [isNotFoundQuestion, setIsNotFoundQuestion] = useState<boolean>(false);
	const [answers, setAnswers] = useState<Answer[] | undefined | null>();
	const [question, setQuestion] = useState<Question>();
	const isCorrectAlphabets: number[] = [];
	const { user } = useAuthContext();

	const {
		handleSubmit,
		register,
		setValue,
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
		setValue("answer_result_is_correct", isCorrect);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCorrect]);

	useEffect(() => {
		if (!question_id) return;

		setOnLoading(true);
		(async () => {
			const { answers, question } = await fetchAnswers(question_id);
			if (question == undefined || answers == undefined) {
				setIsNotFoundQuestion(true);
			}
			if (answers != undefined || answers != null) {
				answers.forEach(
					(e: { answer_is_correct_content: boolean }, idx: number) =>
						e.answer_is_correct_content ? isCorrectAlphabets.push(idx) : ""
				);
				setAnswers(answers);
				setQuestion(question);
			}
			setOnLoading(false);
		})();

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
						!isNotFoundQuestion && (
							<>
								<Box>
									<Text>{question?.question_title}</Text>
								</Box>
								<br />
								<Box>
									<Text>{question?.question_content}</Text>
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
											<Text>{isCorrect ? "正解！" : "不正解"}</Text>
											<Text></Text>
											<Text>{isCorrectAlphabets.toString()}</Text>
										</Box>
										<br />
										<Box>
											<Text>よくわかりそうな解説</Text>
											<br />
											<Text>{question?.question_explanation}</Text>
										</Box>
										<HStack>
											<Spacer />
											<Text>FB :</Text>
											<Text>{question?.question_count_incorrect_question}</Text>
										</HStack>
									</>
								)}
							</>
						)
					)}
					{isNotFoundQuestion && <Box>問題が見つかりません。</Box>}
				</CardBody>
				<CardFooter>
					<Link href={{ pathname: "/drill" }} as="/drill">
						問題一覧に戻る
					</Link>
					<Spacer />
					<form onSubmit={handleSubmit(onSubmit)} id="update">
						<Input
							type="hidden"
							defaultValue={user?.isAnonymous ? -1 : user?.uid}
							{...register("answer_result_user_uuid")}
						/>
						<Input
							type="hidden"
							defaultValue={question_id}
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
