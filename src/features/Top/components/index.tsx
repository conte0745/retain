"use client";

import { CheckIcon, StarIcon } from "@chakra-ui/icons";
import {
	Text,
	Card,
	CardBody,
	CardHeader,
	Heading,
	HStack,
	Spacer,
	CardFooter,
	Link as ChakraLink,
	Divider,
	List,
	ListIcon,
	ListItem,
} from "@chakra-ui/react";
import Link from "next/link";

type TopType = {
	head: string;
	path: string;
	labels: string[];
};

export const Top = () => {
	const topName: TopType[] = [
		{ head: "Question", path: "/question", labels: ["問題を作成する"] },
		{ head: "Drill", path: "/drill", labels: ["問題を解く"] },
		{ head: "Vocabulary", path: "/vocabulary", labels: ["単語帳を作成する"] },
	];
	return (
		<>
			<Card margin={"5rem auto auto auto"}>
				<CardHeader>
					<Heading>トップページ</Heading>
				</CardHeader>
				<Divider />
				<CardBody>
					<List spacing="10">
						{topName.map((top) => (
							<ListItem key={top.path} margin={"5px"}>
								<ChakraLink as={Link} href={top.path}>
									<Heading>
										<ListIcon as={StarIcon} />
										{top.head}
									</Heading>
								</ChakraLink>
								<List margin={"10px auto auto 20px"}>
									{top.labels.map((label) => (
										<ListItem key={label}>
											<ListIcon as={CheckIcon} />
											{label}
										</ListItem>
									))}
								</List>
								<Divider />
							</ListItem>
						))}
					</List>
				</CardBody>
				<CardFooter>
					<HStack>
						<Spacer />
						<Text>
							powered by{" "}
							<ChakraLink
								href="https://github.com/conte0745/retain"
								target="blank"
							>
								conte0745
							</ChakraLink>
						</Text>
					</HStack>
				</CardFooter>
			</Card>
		</>
	);
};
