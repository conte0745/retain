import { Tr, Td, Spinner } from "@chakra-ui/react";

export const Loading = () => {
	return (
		<Tr>
			<Td></Td>
			<Td>
				<Spinner size={"lg"}>Loading...</Spinner>
			</Td>
			<Td></Td>
		</Tr>
	);
};
