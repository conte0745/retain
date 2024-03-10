"use client";

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
import classes from "@Header/components/index.module.scss";

import { useAuthContext } from "@Auth/components/AuthProvider";
import Link from "next/link";

export const Header = () => {
	const { user } = useAuthContext();
	return (
		<HStack bg={"gray.200"}>
			<Box>
				<Link href="/">
					<Heading margin={"0.5rem"}>App</Heading>
				</Link>
			</Box>
			<Spacer />
			{user && user!.isAnonymous && <Box>匿名</Box>}
			{user && <Box>{user.displayName}</Box>}
			<Menu>
				<MenuButton as={Button} margin={"1.0rem 1.5rem 1.0em 0.5rem"}>
					≡
				</MenuButton>
				<MenuList>
					{!user ||
						(user!.isAnonymous && (
							<Link href="/signin" className={classes.none_border}>
								<MenuItem>サインイン</MenuItem>
							</Link>
						))}
					{!user ||
						(user!.isAnonymous && (
							<Link href="/signup" className={classes.none_border}>
								<MenuItem>サインアップ</MenuItem>
							</Link>
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
