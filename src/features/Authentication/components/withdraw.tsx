"use client";

import { Button } from "@chakra-ui/react";
import { useWithdraw } from "@Auth/hooks/useWithdraw";

export const Withdraw = () => {
	const { deleteUser } = useWithdraw();

	return (
		<Button id="withdraw-button" onClick={deleteUser} margin={"2rem"}>
			退会
		</Button>
	);
};
