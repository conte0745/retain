import { Box, HStack, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Header = () => {
	return (
		<HStack bg={"gray.200"}>
			<Box>
				<Link to="/">
					<Heading margin={"0.5rem"}>App</Heading>
				</Link>
			</Box>
			<Box>
				<Heading></Heading>
			</Box>
		</HStack>
	);
};
