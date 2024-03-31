"use client";

import {
	Card,
	CardBody,
	CardHeader,
	Heading,
	HStack,
	Stack,
	StackDivider,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

export const Top = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<Heading>Top page</Heading>
				</CardHeader>
				<CardBody>
					<Stack divider={<StackDivider />} spacing="4">
						<Link href="/question">
							<Heading>Question</Heading>
						</Link>
						<br />
						<Link href="/drill">
							<Heading>Drill</Heading>
						</Link>
						<br />
						<Link href="/todo">
							<Heading>Todo</Heading>
						</Link>
						<br />
					</Stack>
				</CardBody>
			</Card>
		</>
	);
};
