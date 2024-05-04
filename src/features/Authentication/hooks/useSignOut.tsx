"use client";

import { getAuth, signOut } from "firebase/auth";
import { redirect } from "next/navigation";
import { app } from "@/types/AuthUser";
import { useAuthToast } from "@Auth/hooks/useAuthToast";
import { AUTH_CONSTANT } from "@/utils/constant";

export const useSignOut = () => {
	const auth = getAuth(app);
	const showAuthToast = useAuthToast();

	const signOutUser = async () => {
		if (!auth.currentUser) {
			redirect("/signin");
		}
		const response = await signOut(auth)
			.then((response) => {
				console.info(response);
				return response;
			})
			.catch((error) => {
				console.error(error);
				return error;
			});

		showAuthToast(response, AUTH_CONSTANT.SIGNOUT);
	};

	return { signOutUser };
};
