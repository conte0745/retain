import { Dispatch, FC, SetStateAction, useRef } from "react";
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
import { Loading } from "@Vocabulary/components/loading";
import { ExVocabulary, useVocabularies } from "@Vocabulary/VocabularyContext";

export const Show: FC<{
	submitId: number | null;
	setSubmitId: Dispatch<SetStateAction<number | null>>;
	onOpen: () => void;
	setDetailVocabulary: Dispatch<SetStateAction<Vocabulary>>;
}> = ({ submitId, setSubmitId, onOpen, setDetailVocabulary }) => {
	const [onLoading, setOnLoading] = useState<boolean>(true);
	const { colorMode } = useColorMode();
	const { vocabularies, setVocabularies } = useVocabularies();
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (submitId != null) {
			setOnLoading(true);
			const fetchVocabularies = async () => {
				const response: ExVocabulary[] = await fetch(`/api/vocabulary`)
					.then((response) => response.json())
					.catch((e) => {
						console.error(e);
					})
					.finally(() => {
						setOnLoading(false);
						setSubmitId(null);
					});

				response.forEach((e) => {
					e.created_at = new Date(e.created_at);
					e.updated_at = e.updated_at ? new Date(e.updated_at) : null;
					e.isDisplay = true;
				});
				setVocabularies(response);
				if (submitId === -1 && scrollRef.current) {
					scrollRef.current.scrollIntoView({ behavior: "smooth" });
				}
			};
			fetchVocabularies();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submitId]);

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
						vocabularies &&
						vocabularies.map((vocabulary) => {
							return (
								!vocabulary.deleted_at &&
								vocabulary.isDisplay && (
									<Tr
										key={vocabulary.vocabulary_id}
										_hover={{
											background:
												colorMode === "light" ? "gray.100" : "blackAlpha.700",
										}}
										className={`vocabularies[${idx}]`}
									>
										<Td className={`vocabularies[${idx}].index`}>
											{!vocabulary.deleted_at && idx++}
										</Td>
										<Td
											className={`vocabularies[${idx - 1}].title`}
											wordBreak={"break-word"}
										>
											{vocabulary.title}
										</Td>
										<Td>
											<Button
												className={`vocabularies[${idx - 1}].editBtn`}
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
			<div ref={scrollRef} className="bottom" />
		</>
	);
};
