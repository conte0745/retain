import { FC, useEffect, useRef, useState } from "react";
import { Vocabulary } from "@prisma/client";
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
	Textarea,
} from "@chakra-ui/react";
import { useVocabularyForm } from "@Vocabulary/hooks/useVocabularyForm";
import { TIME_ZONE } from "@/utils/constant";

interface ModalAreaProps {
	isOpen: boolean;
	onClose: () => void;
	detailVocabulary: Vocabulary;
}

export const ModalArea: FC<ModalAreaProps> = ({
	isOpen,
	onClose,
	detailVocabulary,
}) => {
	const initialRef = useRef<HTMLInputElement>(null);
	const finalRef = useRef<HTMLInputElement>(null);
	const [isHidden, setIsHidden] = useState<boolean>(false);
	const {
		initForm,
		handleSubmit,
		setValue,
		register,
		errors,
		isSubmitting,
		handleDeleteSubmit,
		deleteRegister,
		deleteIsSubmitting,
		onUpdateSubmit,
		onDeleteSubmit,
	} = useVocabularyForm(detailVocabulary, onClose);

	useEffect(() => {
		if (isOpen) {
			setIsHidden(false);
			initForm(detailVocabulary);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	return (
		<Modal
			initialFocusRef={initialRef}
			finalFocusRef={finalRef}
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Vocabulary</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<form onSubmit={handleSubmit(onUpdateSubmit)} id="update">
						<FormControl isInvalid={errors.title && true}>
							<FormLabel htmlFor="update_title">用語</FormLabel>
							<Input
								defaultValue={detailVocabulary?.title}
								id="update_title"
								{...register("title", {
									required: "必須項目です。",
									maxLength: {
										value: 190,
										message: "190文字までの入力です。",
									},
								})}
							/>
							<FormErrorMessage>
								{errors.title && errors.title.message}
							</FormErrorMessage>
							<br />
							<br />
							<Button
								onClick={() => {
									setIsHidden(true);
									setValue("description", detailVocabulary.description);
								}}
								isDisabled={isHidden}
							>
								答え
							</Button>
							<br />
							<br />
							<FormLabel htmlFor="update_description">説明</FormLabel>
							<Textarea
								size="md"
								rows={10}
								isDisabled={!isHidden}
								id="update_description"
								{...register("description", {
									maxLength: {
										value: 190,
										message: "190文字までの入力です。",
									},
								})}
							/>
							<FormErrorMessage>
								{errors.description && errors.description.message}
							</FormErrorMessage>
							<br />
							<br />
							<Input type="hidden" {...register("vocabulary_id")} />
							{detailVocabulary?.created_at && (
								<Badge>{`作成日：${detailVocabulary?.created_at.toLocaleString(
									"ja-JP",
									{ timeZone: TIME_ZONE }
								)}`}</Badge>
							)}
							<br />
							{detailVocabulary?.updated_at && (
								<Badge>{`更新日：${detailVocabulary?.updated_at.toLocaleString(
									"ja-JP",
									{ timeZone: TIME_ZONE }
								)}`}</Badge>
							)}
						</FormControl>
					</form>
				</ModalBody>
				<form onSubmit={handleDeleteSubmit(onDeleteSubmit)} id="delete">
					<Input type="hidden" {...deleteRegister("vocabulary_id")} />
				</form>
				<ModalFooter>
					<Button
						colorScheme="teal"
						mr={2}
						isLoading={isSubmitting}
						isDisabled={!isHidden}
						form="update"
						type="submit"
					>
						更新
					</Button>
					<Button
						colorScheme="red"
						mr={2}
						isLoading={deleteIsSubmitting}
						form="delete"
						type="submit"
					>
						削除
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
