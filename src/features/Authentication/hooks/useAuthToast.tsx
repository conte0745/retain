"use client";

import { useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { getFailedMessage, getSuccessMessage } from "@Auth/hooks/getMessage";
import { AUTH_CONSTANT } from "@/utils/constant";

export const useAuthToast = () => {
	const toast = useToast();

	const showAuthToast = (response: object, page: AUTH_CONSTANT) => {
		if (response instanceof FirebaseError) {
			toast({
				title: "Failed",
				description: getFailedMessage(response),
				isClosable: true,
				status: "error",
			});
		} else {
			toast({
				title: "Success",
				description: getSuccessMessage(page),
				status: "success",
				isClosable: true,
			});
		}
	};

	return showAuthToast;
};
