import { InputArea } from "@QuestionCreate/components";
import { Show } from "@QuestionShow/components";
import { ModalArea } from "@QuestionDetail/components";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Question } from "@prisma/client";

export const Questions = () => {
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
