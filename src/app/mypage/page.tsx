"use client";

import { useAuthContext } from "@Auth/components/AuthProvider";
import { Mypage } from "@Mypage/components";
import { redirect } from "next/navigation";

const MyPage = () => {
	const { user } = useAuthContext();

	if (!user || user.isAnonymous) {
		redirect("/");
	}

	return (
		<>
			<Mypage />
		</>
	);
};

export default MyPage;
