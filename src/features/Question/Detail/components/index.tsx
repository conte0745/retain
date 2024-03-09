"use client";
import {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { Question } from "@prisma/client";
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	FormControl,
	ModalHeader,
	FormLabel,
	Input,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	Badge,
	FormErrorMessage,
	useToast,
	Switch,
	HStack,
	Textarea,
	Text,
	Box,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useFieldArray, useForm } from "react-hook-form";
import { InputChoice } from "./inputChoice";
import { QuestionAnswer, initAnswers } from "@/types/QuestionAnswer";
import { LoadingAnswer } from "@/features/Question/components/loadingAnswer";
import { fetchAnswers } from "@/features/Question/Detail/hooks/fetchAnswers";
import { postQuestion } from "@/features/Question/Detail/hooks/postQuestion";
import { deleteQuestionWithAnswer } from "@/features/Question/Detail/hooks/deleteQuestionWithAnswer";

export const ModalArea: FC<{
	isOpen: boolean;
	onClose: () => void;
	submitFlg: boolean;
	setSubmitFlg: Dispatch<SetStateAction<boolean>>;
	detailQuestion: Question | undefined;
}> = ({ isOpen, onClose, submitFlg, setSubmitFlg, detailQuestion }) => {
	const initialRef = useRef(null);
	const finalRef = useRef(null);
	const toast = useToast();
	const options = { timeZone: "Asia/Tokyo" };
	const [onLoading, setOnLoading] = useState<boolean>(true);

	const {
		handleSubmit,
		register,
		setValue,
		watch,
		control,
		formState: { errors, isSubmitting },
	} = useForm<QuestionAnswer>({
		mode: "onSubmit",
		reValidateMode: "onSubmit",
		defaultValues: {
			answers: [{}],
		},
	});
	const questionPublicFlag = watch("question_public_flag");

	const { fields, append, remove } = useFieldArray<QuestionAnswer>({
		name: "answers",
		control: control,
	});

	const {
		handleSubmit: handleDelSubmit,
		register: delRegister,
		setValue: setDelValue,
		formState: { isSubmitting: isDelSubmitting },
	} = useForm<QuestionAnswer>();

	async function onUpdateSubmit(values: QuestionAnswer) {
		const response = await postQuestion(values);
		if (response === 200) {
			setSubmitFlg(!submitFlg);
			onClose();
			toast({
				title: "Success",
				description: "更新に成功しました。",
				status: "success",
				isClosable: true,
			});
		} else {
			toast({
				title: "Failed",
				description: "更新に失敗しました。",
				status: "error",
				isClosable: true,
			});
		}
	}

	async function onDeleteSubmit(values: Question) {
		const response = await deleteQuestionWithAnswer(values.question_id);
		if (response === 200) {
			setSubmitFlg(!submitFlg);
			onClose();
			toast({
				title: "Success",
				description: "削除に成功しました。",
				status: "warning",
				isClosable: true,
			});
		} else {
			toast({
				title: "Failed",
				description: "削除に失敗しました。",
				status: "error",
				isClosable: true,
			});
		}
	}

	useEffect(() => {
		if (!isOpen || !detailQuestion) return;
		setOnLoading(true);
		setValue("question_id", Number(detailQuestion?.question_id) ?? "");
		setValue("question_title", detailQuestion?.question_title ?? "");
		setValue("question_content", detailQuestion?.question_content ?? "");
		setValue(
			"question_explanation",
			detailQuestion?.question_explanation ?? ""
		);
		setValue(
			"question_count_incorrect_question",
			detailQuestion?.question_count_incorrect_question ?? 0
		);
		setValue(
			"question_public_flag",
			detailQuestion?.question_public_flag ?? false
		);
		setDelValue("question_id", Number(detailQuestion?.question_id) ?? "");

		(async () => {
			const response = fetchAnswers(detailQuestion!.question_id);
			setValue("answers", await response);
			setOnLoading(false);
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	return (
		<>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
				size={"5xl"}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Question</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<>
							<form onSubmit={handleSubmit(onUpdateSubmit)} id="update">
								<FormControl isInvalid={errors.question_title && true}>
									<FormLabel htmlFor="question_title">タイトル</FormLabel>
									<Input
										defaultValue={detailQuestion?.question_title}
										id="question_title"
										{...register("question_title", {
											required: "必須項目です。",
											maxLength: {
												value: 190,
												message: "190文字までの入力です。",
											},
										})}
									/>
									<FormErrorMessage>
										{errors.question_title && errors.question_title.message}
									</FormErrorMessage>
								</FormControl>
								<br />

								<FormControl isInvalid={errors.question_content && true}>
									<FormLabel htmlFor="question_content">本文</FormLabel>
									<Textarea
										defaultValue={detailQuestion?.question_content}
										id="question_content"
										{...register("question_content", {
											required: "必須項目です。",
											maxLength: {
												value: 190,
												message: "190文字までの入力です。",
											},
										})}
									/>
									<FormErrorMessage>
										{errors.question_content && errors.question_content.message}
									</FormErrorMessage>
								</FormControl>
								<br />

								<Box borderWidth={"1px"} borderRadius={"md"} padding={"0.5rem"}>
									<Button
										size={"sm"}
										type="button"
										onClick={() => append(initAnswers)}
									>
										<AddIcon margin={"0 0.5rem 0 0"} />
										行を追加する
									</Button>
									<br />

									{onLoading ? (
										<LoadingAnswer></LoadingAnswer>
									) : (
										fields.map((item, index) => (
											<InputChoice
												key={item.id}
												answer={item}
												errors={errors}
												control={control}
												index={index}
												register={register}
												remove={remove}
											/>
										))
									)}
								</Box>
								<br />
								<FormControl isInvalid={errors.question_explanation && true}>
									<FormLabel htmlFor="question_explanation">
										よくわかって欲しい解説
									</FormLabel>
									<Textarea
										defaultValue={detailQuestion?.question_explanation}
										id="question_explanation"
										{...register("question_explanation", {
											required: "必須項目です。",
											maxLength: {
												value: 190,
												message: "190文字までの入力です。",
											},
										})}
									/>
									<FormErrorMessage>
										{errors.question_explanation &&
											errors.question_explanation.message}
									</FormErrorMessage>
								</FormControl>

								{detailQuestion &&
									detailQuestion?.question_count_incorrect_question > 0 && (
										<HStack>
											<Text>FBの数 :</Text>
											<Text>
												{detailQuestion?.question_count_incorrect_question}
											</Text>
										</HStack>
									)}
								<Input
									type="hidden"
									id="question_count_incorrect_question"
									defaultValue={
										detailQuestion?.question_count_incorrect_question ?? 0
									}
									{...register("question_count_incorrect_question")}
								/>
								<br />

								<HStack>
									<Switch
										defaultChecked={
											detailQuestion?.question_public_flag ?? false
										}
										id="question_public_flag"
										{...register("question_public_flag")}
									/>
									<FormLabel htmlFor="question_public_flag" mb="0">
										{questionPublicFlag ? "公開中" : "非公開"}
									</FormLabel>
								</HStack>
								<br />
								<br />
								<Input
									type="hidden"
									defaultValue={detailQuestion?.question_id}
									{...register("question_id")}
								/>
							</form>
							<Badge>{`作成日：${detailQuestion?.question_created_at.toLocaleString(
								"ja-JP",
								options
							)}`}</Badge>
							<br />
							{!detailQuestion?.question_updated_at ? (
								""
							) : (
								<Badge>{`更新日：${detailQuestion?.question_updated_at.toLocaleString(
									"ja-JP",
									options
								)}`}</Badge>
							)}
							<form onSubmit={handleDelSubmit(onDeleteSubmit)} id="delete">
								<Input
									type="hidden"
									defaultValue={detailQuestion?.question_id}
									{...delRegister("question_id")}
								/>
							</form>
						</>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="teal"
							mr={2}
							isLoading={isSubmitting}
							form="update"
							type="submit"
						>
							問題の更新
						</Button>
						<Button
							colorScheme="red"
							mr={2}
							isLoading={isDelSubmitting}
							form="delete"
							type="submit"
						>
							問題の削除
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
