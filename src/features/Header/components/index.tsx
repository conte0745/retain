import {
	Box,
	Button,
	HStack,
	Heading,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spacer,
} from "@chakra-ui/react";
import { SignOut } from "@Auth/components/signout";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/features/Authentication/components/AuthProvider";

export const Header = () => {
	const { user } = useAuthContext();
	console.log(user);
	return (
		<HStack bg={"gray.200"}>
			<Box>
				<Link to="/">
					<Heading margin={"0.5rem"}>App</Heading>
				</Link>
			</Box>
			<Spacer />
			{!user || (user!.isAnonymous && <Box>匿名</Box>)}
			{!user || (!user!.isAnonymous && <Box>{user.displayName}</Box>)}
			<Menu>
				<MenuButton as={Button} margin={"1.0rem 1.5rem 1.0em 0.5rem"}>
					≡
				</MenuButton>
				<MenuList>
					{!user ||
						(user!.isAnonymous && (
							<MenuItem>
								<Link to="/signin">
									<Box>サインイン</Box>
								</Link>
							</MenuItem>
						))}
					{!user ||
						(user!.isAnonymous && (
							<MenuItem>
								<Link to="/signup">
									<Box>サインアップ</Box>
								</Link>
							</MenuItem>
						))}
					{user && !user!.isAnonymous && (
						<MenuItem>
							<SignOut></SignOut>
						</MenuItem>
					)}
				</MenuList>
			</Menu>
		</HStack>
	);
};
