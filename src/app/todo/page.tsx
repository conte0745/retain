"use client";
import { InputArea } from "@/features/Todo/InputArea/components";
import { Show } from "@/features/Todo/Show/components";
import { ModalArea } from "@/features/Todo/Detail/components";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Todo } from "@prisma/client";

const Todos = () => {
	const [submitFlg, setSubmitFlg] = useState<boolean>(true);
	const [detailTodo, setDetailTodo] = useState<Todo | undefined>();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<InputArea submitFlg={submitFlg} setSubmitFlg={setSubmitFlg}></InputArea>

			<Show
				submitFlg={submitFlg}
				onOpen={onOpen}
				setDetailTodo={setDetailTodo}
			></Show>

			<ModalArea
				isOpen={isOpen}
				onClose={onClose}
				submitFlg={submitFlg}
				setSubmitFlg={setSubmitFlg}
				detailTodo={detailTodo}
			></ModalArea>
		</>
	);
};

export default Todos;
