"use client";

import { useAuthContext } from "@Auth/components/AuthProvider";
import { SignIn } from "@Auth/components/signin";
import { redirect } from "next/navigation";

const Signin = () => {
	const { user } = useAuthContext();
	if (!user?.isAnonymous) {
		redirect("drill");
	}
	return (
		<>
			<SignIn />
		</>
	);
};

export default Signin;
