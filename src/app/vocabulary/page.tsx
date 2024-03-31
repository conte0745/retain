"use client";
import { InputArea } from "@/features/Vocabulary/InputArea/components";
import { Show } from "@/features/Vocabulary/Show/components";
import { ModalArea } from "@/features/Vocabulary/Detail/components";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Vocabulary } from "@prisma/client";

const Vocabularies = () => {
	const [submitFlg, setSubmitFlg] = useState<boolean>(true);
	const [detailVocabulary, setDetailVocabulary] = useState<
		Vocabulary | undefined
	>();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<InputArea submitFlg={submitFlg} setSubmitFlg={setSubmitFlg}></InputArea>

			<Show
				submitFlg={submitFlg}
				onOpen={onOpen}
				setDetailVocabulary={setDetailVocabulary}
			></Show>

			<ModalArea
				isOpen={isOpen}
				onClose={onClose}
				submitFlg={submitFlg}
				setSubmitFlg={setSubmitFlg}
				detailVocabulary={detailVocabulary}
			></ModalArea>
		</>
	);
};

export default Vocabularies;
