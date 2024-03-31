"use client";

import { useState } from "react";
import {
	Button,
	Card,
	Box,
	CardHeader,
	Text,
	CardBody,
	CardFooter,
	Input,
	Spacer,
	Heading,
	Divider,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ChoiceAnswer } from "./choiceAnswer";
import { LoadingAnswer } from "@Drill/components/loadingAnswer";
import { useFetchAnswers } from "@Drill/Detail/hooks/useFetchAnswers";
import { postAnswerResult } from "@Drill/Detail/hooks/postAnswerResult";
import { AnswerResult } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuthContext } from "@Auth/components/AuthProvider";
import styles from "./styles.module.css";

export const DetailDrill = () => {
	const searchParams = useSearchParams();
	const question_id = searchParams.get("question_id") as unknown as number;
	const [onClickAnswerIndex, setOnClickAnswerIndex] = useState<
		number | undefined
	>(undefined);
	const [afterPost, setAfterPost] = useState<boolean>(false);
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
			setValue(
				"answer_result_is_correct",
				onClickAnswerIndex == correctAnswerIndex
			);
			if (onClickAnswerIndex !== undefined && !afterPost) {
				const uid = user?.isAnonymous ? undefined : user?.uid;
				await postAnswerResult(values, uid);
				setAfterPost(true);
			}
		} catch (e) {
			console.error(e);
		} finally {
			setOnClickAnswerIndex(undefined);
		}
	}

	const { question, correctAnswerIndex, isLoading, isError } =
		useFetchAnswers(question_id);

	if (isError) {
		return <div>Error occurred.</div>;
	}

	return (
		<>
			<Card margin={"1rem 0 0 0 "}>
				<CardHeader>
					<Heading size={"md"}>Question</Heading>
				</CardHeader>
				<Divider />
				<CardBody pb={6}>
					{isLoading ? (
						<LoadingAnswer></LoadingAnswer>
					) : (
						question && (
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
									{question.Answer &&
										question.Answer.map((item, index) => (
											<ChoiceAnswer
												key={item.answer_id}
												answer={item}
												index={index}
												setOnClickAnswerIndex={setOnClickAnswerIndex}
												onClickAnswerIndex={onClickAnswerIndex}
											/>
										))}
								</Box>
								<br />
								{onClickAnswerIndex !== undefined && (
									<>
										<Box>
											<Text>
												{onClickAnswerIndex === correctAnswerIndex
													? "正解 （☆∀☆）"
													: "不正解 (;△;)"}
											</Text>
											<Text size={"xs"} color={"gray"}>
												（あなたの回答：
												{onClickAnswerIndex !== undefined
													? String.fromCharCode(65 + onClickAnswerIndex)
													: ""}
												）
											</Text>
											<br />

											<Text>
												正解択：
												{correctAnswerIndex !== undefined
													? String.fromCharCode(65 + correctAnswerIndex)
													: ""}{" "}
											</Text>
										</Box>
										<br />
										<Box>
											<Text>よくわかりそうな解説</Text>
											<br />
											<Text>{question?.question_explanation}</Text>
										</Box>
									</>
								)}
							</>
						)
					)}
					{!question && !isLoading && <Box>問題が見つかりません。</Box>}
				</CardBody>
				<CardFooter>
					<Link
						href={{ pathname: "/drill" }}
						as="/drill"
						className={styles.link}
					>
						問題一覧に戻る
					</Link>
					<Spacer />
					<form onSubmit={handleSubmit(onSubmit)} id="next">
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
							form="next"
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
