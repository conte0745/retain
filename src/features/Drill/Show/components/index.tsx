"use client";

import { FC } from "react";
import {
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useColorMode,
} from "@chakra-ui/react";
import { Loading } from "@/features/Drill/components/loading";
import { useFetchDrill } from "@/features/Drill/Show/hooks/useFetchDrill";
import Link from "next/link";

export const Show: FC = () => {
	const { colorMode } = useColorMode();
	const { questions, isLoading, isError } = useFetchDrill();

	if (isError) {
		return <div>Error occurred.</div>;
	}

	let idx = 1;
	return (
		<>
			<Table m={"0.5rem"} variant={"simple"} width={"100%"}>
				<Thead bg={colorMode === "light" ? "gray.100" : "gray.700"}>
					<Tr>
						<Th>No</Th>
						<Th>タイトル</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{isLoading ? (
						<Loading></Loading>
					) : (
						questions &&
						questions.map((question) => (
							<Tr
								key={question.question_id}
								_hover={{
									background:
										colorMode === "light" ? "gray.100" : "blackAlpha.700",
								}}
							>
								<Td>{idx++}</Td>
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
						))
					)}
				</Tbody>
			</Table>
		</>
	);
};
