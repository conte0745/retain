import { Dispatch, FC, SetStateAction, useRef } from "react";
import {
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Button,
	useColorMode,
} from "@chakra-ui/react";
import { Loading } from "@Vocabulary/components/loading";
import { useVocabularyShow } from "@Vocabulary/hooks/useVocabularyShow";
import { ExVocabulary } from "@Vocabulary/components/VocabularyContext";

export const Show: FC<{
	submitId: number | null;
	setSubmitId: Dispatch<SetStateAction<number | null>>;
	onOpen: () => void;
	setDetailVocabulary: Dispatch<SetStateAction<ExVocabulary>>;
}> = ({ submitId, setSubmitId, onOpen, setDetailVocabulary }) => {
	const { colorMode } = useColorMode();
	const scrollRef = useRef<HTMLDivElement>(null);
	const { vocabularies, isLoading, handleEditClick } = useVocabularyShow(
		submitId,
		setSubmitId,
		setDetailVocabulary,
		onOpen
	);

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
					{isLoading ? (
						<Loading />
					) : (
						vocabularies &&
						vocabularies.map(
							(vocabulary) =>
								vocabulary.isDisplay && (
									<Tr
										key={vocabulary.vocabulary_id}
										_hover={{
											background:
												colorMode === "light" ? "gray.100" : "blackAlpha.700",
										}}
									>
										<Td>{idx++}</Td>
										<Td wordBreak={"break-word"}>{vocabulary.title}</Td>
										<Td>
											<Button
												size={"xs"}
												onClick={() => handleEditClick(vocabulary)}
												_hover={{ background: "blue.300" }}
											>
												編集
											</Button>
										</Td>
									</Tr>
								)
						)
					)}
				</Tbody>
			</Table>
			<div ref={scrollRef} className="bottom" />
		</>
	);
};
