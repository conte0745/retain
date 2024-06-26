import { Change } from "@Auth/components/changeProfile";
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
				<CardHeader id="user-info">ユーザ情報の編集</CardHeader>
				<CardBody>
					<Change />
				</CardBody>
				<CardFooter></CardFooter>
			</Card>
			<br />

			<Card margin={"1rem"}>
				<CardHeader id="question-register">問題の一括登録</CardHeader>
				<CardBody>---作成中---</CardBody>
				<CardFooter></CardFooter>
			</Card>
			<br />

			<Card margin={"1rem"}>
				<CardHeader id="question-download">問題のCSVダウンロード</CardHeader>
				<CardBody>---作成中---</CardBody>
				<CardFooter></CardFooter>
			</Card>
			<br />

			<Card margin={"1rem"}>
				<CardHeader id="output-pdf">PDF出力</CardHeader>
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
