"use client";
import { useState } from "react";
import { InputArea } from "@Question/InputArea/components";
import { Show } from "@Question/Show/components";
import { ModalArea } from "@Question/Detail/components";
import { useDisclosure } from "@chakra-ui/react";
import { Question } from "@prisma/client";

const Questions = () => {
	const [submitFlg, setSubmitFlg] = useState<boolean>(true);
	const [detailQuestion, setDetailQuestion] = useState<Question | undefined>();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<InputArea submitFlg={submitFlg} setSubmitFlg={setSubmitFlg}></InputArea>

			<Show
				submitFlg={submitFlg}
				onOpen={onOpen}
				setDetailQuestion={setDetailQuestion}
			></Show>

			<ModalArea
				isOpen={isOpen}
				onClose={onClose}
				submitFlg={submitFlg}
				setSubmitFlg={setSubmitFlg}
				detailQuestion={detailQuestion}
			></ModalArea>
		</>
	);
};

export default Questions;
