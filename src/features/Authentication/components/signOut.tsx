"use client";

import { Box } from "@chakra-ui/react";
import { useSignOut } from "@Auth/hooks/useSignOut";

export const SignOut = () => {
	const { signOutUser } = useSignOut();

	return (
		<Box id="signout" onClick={signOutUser}>
			サインアウト
		</Box>
	);
};
