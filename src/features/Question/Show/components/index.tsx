import { Dispatch, FC, SetStateAction } from "react";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Question } from "@prisma/client";
import { useEffect, useState } from "react";
import { Loading } from "@Question/components/loading";
import { fetchQuestions } from "@Question/Show/hooks/fetchQuestions";

export const Show: FC<{
	submitFlg: boolean;
	onOpen: () => void;
	setDetailQuestion: Dispatch<SetStateAction<Question | undefined>>;
}> = ({ submitFlg, onOpen, setDetailQuestion }) => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [onLoading, setOnLoading] = useState<boolean>(true);

	useEffect(() => {
		setOnLoading(true);
		(async () => {
			setQuestions(await fetchQuestions());
		})();
		setOnLoading(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submitFlg]);

	const onClickEditBtn = function (Question: Question) {
		onOpen();
		setDetailQuestion(Question);
	};

	let idx = 1;
	return (
		<>
			<Table m={"0.5rem"} variant={"simple"} width={"100%"}>
				<Thead bg={"gray.300"}>
					<Tr>
						<Th>No</Th>
						<Th>タイトル</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{onLoading ? (
						<Loading></Loading>
					) : (
						questions.map((question) => {
							return (
								!question.question_deleted_at && (
									<Tr
										key={question.question_id}
										_hover={{ background: "gray.100" }}
									>
										<Td>{!question.question_deleted_at && idx++}</Td>
										<Td wordBreak={"break-word"}>{question.question_title}</Td>
										<Td>
											<Button
												size={"xs"}
												onClick={() => onClickEditBtn(question)}
												_hover={{ background: "blue.300" }}
											>
												編集
											</Button>
										</Td>
									</Tr>
								)
							);
						})
					)}
				</Tbody>
			</Table>
		</>
	);
};
