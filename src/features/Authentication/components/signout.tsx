"use client";

import { Box, useToast } from "@chakra-ui/react";
import { FirebaseError, initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { firebaseconfig } from "@/types/AuthUser";

export const SignOut = () => {
	const toast = useToast();
	const app = initializeApp(firebaseconfig);
	const auth = getAuth(app);

	const onSubmit = async () => {
		const response = signOut(auth)
			.then((response) => {
				return response;
			})
			.catch((error) => {
				return error;
			});

		if (response instanceof FirebaseError) {
			toast({
				title: "Failed",
				description: "サインアウトに失敗しました。",
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "サインアウトに成功しました。",
				status: "success",
				isClosable: true,
			});
		}
	};

	return (
		<>
			<Box onClick={onSubmit}>サインアウト</Box>
		</>
	);
};
