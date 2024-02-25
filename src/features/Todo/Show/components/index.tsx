import { Dispatch, FC, SetStateAction } from "react";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Todo } from "@prisma/client";
import { useEffect, useState } from "react";
import { Loading } from "@Todo/components/loading";

export const Show: FC<{
	submitFlg: boolean;
	onOpen: () => void;
	setDetailTodo: Dispatch<SetStateAction<Todo | undefined>>;
}> = ({ submitFlg, onOpen, setDetailTodo }) => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [onLoading, setOnLoading] = useState<boolean>(true);

	useEffect(() => {
		const url = import.meta.env.VITE_PUBLIC_API_URL;
		setOnLoading(true);
		const getTodos = async () => {
			const response: Todo[] = await fetch(`${url}/todo`)
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
			setTodos(response);
		};
		getTodos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submitFlg]);

	const onClickEditBtn = function (todo: Todo) {
		onOpen();
		setDetailTodo(todo);
	};

	let idx = 1;
	return (
		<>
			<Table m={"0.5rem"} variant={"simple"} width={"100%"}>
				<Thead bg={"gray.300"}>
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
						todos.map((todo) => {
							return (
								!todo.deleted_at && (
									<Tr key={todo.todo_id} _hover={{ background: "gray.100" }}>
										<Td>{!todo.deleted_at && idx++}</Td>
										<Td wordBreak={"break-word"}>{todo.content}</Td>
										<Td>
											<Button
												size={"xs"}
												onClick={() => onClickEditBtn(todo)}
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
