import { FC } from "react";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Question } from "@prisma/client";
import { useEffect, useState } from "react";
import { Loading } from "@Drill/components/loading";
import { fetchQuestions } from "@Drill/Show/hooks/fetchQuestions";
import { useNavigate } from "react-router-dom";

export const Show: FC = () => {
	const navigate = useNavigate();
	const [questions, setQuestions] = useState<Question[]>([]);
	const [onLoading, setOnLoading] = useState<boolean>(true);

	useEffect(() => {
		setOnLoading(true);
		(async () => {
			setQuestions(await fetchQuestions());
		})();
		setOnLoading(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onClickDetailBtn = function (question: Question) {
		navigate(`./detail`, {
			state: question,
		});
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
												onClick={() => onClickDetailBtn(question)}
												_hover={{ background: "blue.300" }}
											>
												詳細
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
