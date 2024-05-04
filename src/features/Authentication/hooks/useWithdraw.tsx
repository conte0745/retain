"use client";

import { getAuth, signOut } from "firebase/auth";
import { redirect } from "next/navigation";

import { app } from "@/types/AuthUser";
import { AUTH_CONSTANT } from "@/utils/constant";
import { useAuthToast } from "@Auth/hooks/useAuthToast";

export const useWithdraw = () => {
	const auth = getAuth(app);
	const user = auth.currentUser;
	const showAuthToast = useAuthToast();

	const deleteUser = async () => {
		if (!user) {
			redirect("/signin");
		}

		if (user && confirm("ユーザを削除します。よろしいですか？")) {
			const response = await user
				.delete()
				.then((response) => {
					return response;
				})
				.catch((error) => {
					console.error(error);
					signOutRedirect(error.code);
					return error;
				});

			showAuthToast(response, AUTH_CONSTANT.WITHDRAW);
		}
	};

	const signOutRedirect = (code: string) => {
		if (code === "auth/requires-recent-login") {
			signOut(auth).then(() => {
				redirect("/signin");
			});
		}
	};

	return { deleteUser };
};
