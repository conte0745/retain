import { Change } from "@Auth/components/change";
import { Withdraw } from "@Auth/components/withdraw";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	HStack,
	Spacer,
} from "@chakra-ui/react";

export const Mypage = () => {
	return (
		<>
			<Heading margin={"2rem"}>マイページ</Heading>
			<Card margin={"1rem"}>
				<CardHeader>ユーザ情報の編集</CardHeader>
				<CardBody>
					<Change />
				</CardBody>
				<CardFooter></CardFooter>
			</Card>
			<br />

			<Card margin={"1rem"}>
				<CardHeader>問題の一括登録</CardHeader>
				<CardBody>---作成中---</CardBody>
				<CardFooter></CardFooter>
			</Card>
			<br />

			<Card margin={"1rem"}>
				<CardHeader>問題の一括登ダウンロード</CardHeader>
				<CardBody>---作成中---</CardBody>
				<CardFooter></CardFooter>
			</Card>
			<br />

			<Card margin={"1rem"}>
				<CardHeader>PDF出力</CardHeader>
				<CardBody>---作成中---</CardBody>
				<CardFooter></CardFooter>
			</Card>
			<br />

			<HStack>
				<Spacer />
				<Withdraw />
			</HStack>
		</>
	);
};
