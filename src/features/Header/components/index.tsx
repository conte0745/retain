"use client";

import {
	Box,
	Button,
	HStack,
	Heading,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spacer,
	useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import classes from "@Header/components/index.module.scss";

import { useAuthContext } from "@Auth/components/AuthProvider";
import { SignOut } from "@Auth/components/signOut";

import { usePathname } from "next/navigation";
import Link from "next/link";

export const Header = () => {
	const { user } = useAuthContext();
	const { colorMode, toggleColorMode } = useColorMode();
	const pathname = usePathname();

	return (
		<HStack
			bg={colorMode === "light" ? "gray.100" : "gray.900"}
			data-testid="header"
		>
			<Box>
				<Link href="/">
					<Heading margin={"0.5rem"}>App</Heading>
				</Link>
			</Box>
			<Spacer />
			<Box>
				<Heading size={"lg"} id="header-center">
					{pathname.split("/")[1].toUpperCase()}
				</Heading>
			</Box>
			<Spacer />
			{user && user!.isAnonymous && (
				<Box className="user-display-name">匿名</Box>
			)}
			{user && <Box className="user-display-name">{user.displayName}</Box>}
			<IconButton
				icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
				onClick={toggleColorMode}
				aria-label={""}
			/>
			<Menu>
				<MenuButton as={Button} margin={"1.0rem 1.5rem 1.0em 0.5rem"}>
					≡
				</MenuButton>
				<MenuList>
					{!user ||
						(user!.isAnonymous && (
							<Link
								href="/signin"
								className={classes.none_border}
								id="signin-anchor"
							>
								<MenuItem id="signin-menu-item">サインイン</MenuItem>
							</Link>
						))}
					{!user ||
						(user!.isAnonymous && (
							<Link
								href="/signup"
								className={classes.none_border}
								id="signup-anchor"
							>
								<MenuItem id="signup-menu-item">サインアップ</MenuItem>
							</Link>
						))}
					{user && !user!.isAnonymous && (
						<Link
							href="/mypage"
							className={classes.none_border}
							id="mypage-anchor"
						>
							<MenuItem id="mypage-menu-item">マイページ</MenuItem>
						</Link>
					)}
					{user && !user!.isAnonymous && (
						<MenuItem id="signout-menu-item">
							<SignOut></SignOut>
						</MenuItem>
					)}
				</MenuList>
			</Menu>
		</HStack>
	);
};
