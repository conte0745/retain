import { getAuth, signOut } from "firebase/auth";
import { useToastAuth } from "./toastAuth";
import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { redirect } from "next/navigation";

export const Withdraw = () => {
	const auth = getAuth();
	const user = auth.currentUser;
	const toast = useToast();

	const [code, setCode] = useState<string | undefined | null>();

	if (code == "auth/requires-recent-login") {
		signOut(auth).then(() => {
			redirect("/signin");
		});
	}

	if (!user) {
		return;
	}

	const deleteUser = async () => {
		if (confirm("ユーザを削除します。よろしいですか？")) {
			const response = await user
				.delete()
				.then((response) => {
					return response;
				})
				.catch((error) => {
					console.error(error);
					return error;
				});
			setCode(useToastAuth(toast, response, "withdraw"));
		}
	};

	return (
		<Button id="withdraw-button" onClick={deleteUser} margin={"2rem"}>
			退会
		</Button>
	);
};
