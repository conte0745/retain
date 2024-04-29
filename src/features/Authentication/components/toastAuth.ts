"use client";

import { CreateToastFnReturn } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";

export const toastAuth = (toast: CreateToastFnReturn, response: object) => {
	if (response instanceof FirebaseError) {
		toast({
			title: "Failed",
			description: `更新に失敗しました。\n
			${response.message}`,
			isClosable: true,
			status: "error",
		});

		return response.code;
	} else {
		toast({
			title: "Success",
			description: "更新に成功しました。",
			status: "success",
			isClosable: true,
		});
	}
};
