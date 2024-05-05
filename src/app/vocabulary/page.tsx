"use client";

import { useState } from "react";
import { HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Vocabulary } from "@prisma/client";

import { Show } from "@Vocabulary/components/showArea";
import { InputArea } from "@Vocabulary/components/inputArea";
import { SearchArea } from "@Vocabulary/components/searchArea";
import { ModalArea } from "@Vocabulary/components/modalArea";
import { VocabularyProvider } from "@Vocabulary/components/VocabularyContext";
import { MODE } from "@/utils/constant";

const Vocabularies = () => {
	const initVocabulary = {
		vocabulary_id: -1,
		title: "",
		description: null,
		created_at: new Date(),
		updated_at: null,
		deleted_at: null,
	};

	const [mode, setMode] = useState<MODE>(MODE.INPUT);
	const [submitId, setSubmitId] = useState<number | null>(0);
	const [detailVocabulary, setDetailVocabulary] =
		useState<Vocabulary>(initVocabulary);
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<VocabularyProvider>
			<br />
			<HStack>
				{mode === MODE.SEARCH ? (
					<>
						<IconButton
							aria-label="Add"
							icon={<AddIcon />}
							onClick={() => setMode(MODE.INPUT)}
						/>
						<SearchArea />
					</>
				) : (
					<>
						<IconButton
							aria-label="Search"
							icon={<SearchIcon />}
							onClick={() => setMode(MODE.SEARCH)}
						/>
						<InputArea></InputArea>
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
				detailVocabulary={detailVocabulary}
			></ModalArea>
		</VocabularyProvider>
	);
};

export default Vocabularies;
