"use client";
import { InputArea } from "@/features/Vocabulary/InputArea/components";
import { Show } from "@/features/Vocabulary/Show/components";
import { ModalArea } from "@/features/Vocabulary/Detail/components";
import { useState } from "react";
import { HStack, IconButton, useDisclosure } from "@chakra-ui/react";

import { VocabularyProvider } from "@Vocabulary/VocabularyContext";
import { Vocabulary } from "@prisma/client";
import { SearchArea } from "@Vocabulary/Search/components";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";

type Mode = "INPUT" | "SEARCH";

const Vocabularies = () => {
	const initVocabulary = {
		vocabulary_id: -1,
		title: "",
		description: null,
		created_at: new Date(),
		updated_at: null,
		deleted_at: null,
	};

	const [mode, setMode] = useState<Mode>("INPUT");
	const [submitId, setSubmitId] = useState<number | null>(0);
	const [detailVocabulary, setDetailVocabulary] =
		useState<Vocabulary>(initVocabulary);
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<VocabularyProvider>
			<br />
			<HStack>
				{mode === "SEARCH" ? (
					<>
						<IconButton
							aria-label="Add"
							icon={<AddIcon />}
							onClick={() => setMode("INPUT")}
						/>
						<SearchArea />
					</>
				) : (
					<>
						<IconButton
							aria-label="Search"
							icon={<SearchIcon />}
							onClick={() => setMode("SEARCH")}
						/>
						<InputArea setSubmitId={setSubmitId}></InputArea>
					</>
				)}
			</HStack>

			<Show
				submitId={submitId}
				setSubmitId={setSubmitId}
				onOpen={onOpen}
				setDetailVocabulary={setDetailVocabulary}
			></Show>

			<ModalArea
				isOpen={isOpen}
				onClose={onClose}
				setSubmitId={setSubmitId}
				detailVocabulary={detailVocabulary}
			></ModalArea>
		</VocabularyProvider>
	);
};

export default Vocabularies;
