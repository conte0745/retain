import { Dispatch, FC, SetStateAction } from "react";
import {
	Button,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useColorMode,
} from "@chakra-ui/react";
import { Vocabulary } from "@prisma/client";
import { useEffect, useState } from "react";
import { Loading } from "@/features/Vocabulary/components/loading";

export const Show: FC<{
	submitFlg: boolean;
	onOpen: () => void;
	setDetailVocabulary: Dispatch<SetStateAction<Vocabulary | undefined>>;
}> = ({ submitFlg, onOpen, setDetailVocabulary }) => {
	const { colorMode } = useColorMode();
	const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
	const [onLoading, setOnLoading] = useState<boolean>(true);

	useEffect(() => {
		setOnLoading(true);
		const getVocabularies = async () => {
			const response: Vocabulary[] = await fetch(`/api/vocabulary`)
				.then((response) => response.json())
				.catch((e) => {
					console.error(e);
				})
				.finally(() => {
					setOnLoading(false);
				});

			response.forEach((e) => {
				e.created_at = new Date(e.created_at);
				e.updated_at = e.updated_at ? new Date(e.updated_at) : null;
			});
			setVocabularies(response);
		};
		getVocabularies();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submitFlg]);

	const onClickEditBtn = function (vocabulary: Vocabulary) {
		onOpen();
		setDetailVocabulary(vocabulary);
	};

	let idx = 1;
	return (
		<>
			<Table m={"0.5rem"} variant={"simple"} width={"100%"}>
				<Thead bg={colorMode === "light" ? "gray.100" : "gray.900"}>
					<Tr>
						<Th>ID</Th>
						<Th>内容</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{onLoading ? (
						<Loading></Loading>
					) : (
						vocabularies.map((vocabulary) => {
							return (
								!vocabulary.deleted_at && (
									<Tr
										key={vocabulary.vocabulary_id}
										_hover={{
											background:
												colorMode === "light" ? "gray.100" : "blackAlpha.700",
										}}
									>
										<Td>{!vocabulary.deleted_at && idx++}</Td>
										<Td wordBreak={"break-word"}>{vocabulary.title}</Td>
										<Td>
											<Button
												size={"xs"}
												onClick={() => onClickEditBtn(vocabulary)}
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
