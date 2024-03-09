"use client";

import { Link } from "@chakra-ui/react";

export const Top = () => {
	return (
		<>
			<h1>Top</h1>
			<Link href="/question">Question</Link>
			<br />
			<Link href="/drill">Drill</Link>
			<br />
			<Link href="/todo">Todo</Link>
			<br />
		</>
	);
};
