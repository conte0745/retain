import { FC } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Question } from "@prisma/client";
import { useEffect, useState } from "react";
import { Loading } from "@/features/Drill/components/loading";
import { fetchQuestions } from "@/features/Drill/Show/hooks/fetchQuestions";
import Link from "next/link";

export const Show: FC = () => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [onLoading, setOnLoading] = useState<boolean>(true);

	useEffect(() => {
		setOnLoading(true);
		(async () => {
			const response = await fetchQuestions();
			if (response != undefined || response != null) {
				setQuestions(response);
			}
			setOnLoading(false);
		})();
	}, []);

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
											<Link
												href={{
													pathname: "drill/detail",
													query: {
														question_id: question.question_id,
													},
												}}
											>
												詳細
											</Link>
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
