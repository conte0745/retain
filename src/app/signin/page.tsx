"use client";

import { useAuthContext } from "@Auth/components/AuthProvider";
import { SignIn } from "@Auth/components/signIn";
import { redirect } from "next/navigation";

const Signin = () => {
	const { user } = useAuthContext();

	if (!user?.isAnonymous) {
		redirect("/");
	}
	return (
		<>
			<SignIn />
		</>
	);
};

export default Signin;
