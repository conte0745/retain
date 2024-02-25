import {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { Answer, Question } from "@prisma/client";
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

	const url = import.meta.env.VITE_PUBLIC_API_URL;
	const {
		handleSubmit,
		register,
		setValue,
		watch,
		control,
		formState: { errors, isSubmitting },
	} = useForm<QuestionAnswer>({
		reValidateMode: "onBlur",
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
		if (values.question_title === "") {
			return;
		}

		await fetch(`${url}/question/update/${values.question_id}`, {
			method: "post",
			headers: {},
			body: JSON.stringify(values),
		})
			.then((response) => {
				if (response.ok) {
					setSubmitFlg(!submitFlg);
					onClose();
					response.json();
					toast({
						title: "Success",
						description: "更新に成功しました。",
						status: "success",
						isClosable: true,
					});
				}
			})
			.catch((e) => console.error(e));
	}

	async function onDeleteSubmit(values: Question) {
		await fetch(`${url}/question/delete/${values.question_id}`, {
			method: "post",
			headers: {},
		})
			.then((response) => {
				if (response.ok) {
					setSubmitFlg(!submitFlg);
					onClose();
					response.json();
					toast({
						title: "Success",
						description: "削除に成功しました。",
						status: "warning",
						isClosable: true,
					});
				}
			})
			.catch((e) => console.error(e));
	}

	useEffect(() => {
		if (isOpen) {
			setOnLoading(true);
			setValue("question_id", Number(detailQuestion?.question_id) ?? "");
			setValue("question_title", detailQuestion?.question_title ?? "");
			setValue("question_content", detailQuestion?.question_content ?? "");
			setValue(
				"question_count_incorrect_question",
				detailQuestion?.question_count_incorrect_question ?? 0
			);
			setValue(
				"question_public_flag",
				detailQuestion?.question_public_flag ?? false
			);
			setDelValue("question_id", Number(detailQuestion?.question_id) ?? "");

			const getAnswers = async () => {
				if (!detailQuestion) {
					return;
				}
				const response: Answer[] = await fetch(
					`${url}/answer/${detailQuestion.question_id}`
				)
					.then((response) => {
						return response.json();
					})
					.catch((e) => {
						console.error(e);
					})
					.finally(() => {
						//
					});

				response.forEach((e) => {
					e.answer_created_at = new Date(e.answer_created_at);
					e.answer_updated_at = e.answer_updated_at
						? new Date(e.answer_updated_at)
						: null;
				});
				setValue("answers", response);
				setOnLoading(false);
			};
			getAnswers();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [detailQuestion?.question_id, isOpen]);

	return (
		<>
			{" "}
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
						{onLoading ? (
							<LoadingAnswer></LoadingAnswer>
						) : (
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
											{errors.question_content &&
												errors.question_content.message}
										</FormErrorMessage>
									</FormControl>
									<br />

									<Box
										borderWidth={"1px"}
										borderRadius={"md"}
										padding={"0.5rem"}
									>
										<Button
											size={"sm"}
											type="button"
											onClick={() => append(initAnswers)}
										>
											<AddIcon margin={"0 0.5rem 0 0"} />
											行を追加する
										</Button>
										<br />
										{fields.map((item, index) => (
											<InputChoice
												key={item.id}
												answer={item}
												errors={errors}
												control={control}
												index={index}
												register={register}
												remove={remove}
											/>
										))}
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
						)}
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="teal"
							mr={2}
							isLoading={isSubmitting}
							form="update"
							type="submit"
						>
							更新
						</Button>
						<Button
							colorScheme="red"
							mr={2}
							isLoading={isDelSubmitting}
							form="delete"
							type="submit"
						>
							削除
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
