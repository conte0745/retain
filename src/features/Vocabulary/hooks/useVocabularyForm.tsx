import { useForm } from "react-hook-form";
import { useVocabularyToast } from "./useVocabularyToast";
import { STATE, TASK } from "./getMessage";
import {
	ExVocabulary,
	useVocabularies,
} from "@Vocabulary/components/VocabularyContext";
import { getFormattedDate } from "@/types/getFormattedDate";

export const useVocabularyForm = (
	detailVocabulary: ExVocabulary | undefined,
	onClose: () => void | undefined
) => {
	const { showToast } = useVocabularyToast();
	const { setVocabularies } = useVocabularies();
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<ExVocabulary>({
		defaultValues: detailVocabulary,
		reValidateMode: "onSubmit",
	});

	const {
		handleSubmit: handleDeleteSubmit,
		register: deleteRegister,
		setValue: setDeleteValue,
		formState: { errors: deleteErrors, isSubmitting: deleteIsSubmitting },
	} = useForm<ExVocabulary>({
		defaultValues: detailVocabulary,
		reValidateMode: "onSubmit",
	});

	const onAddSubmit = async (values: ExVocabulary) => {
		if (!values.title) {
			return;
		}
		await fetch(`api/vocabulary`, {
			method: "post",
			body: JSON.stringify(values),
		})
			.then(async (response) => {
				const data = await response.json();
				if (response.ok && data.message === "OK") {
					showToast(TASK.ADD, STATE.SUCCESS);
					setValue("title", "");
					setVocabularies((prevItems) => {
						return [
							...(prevItems || []),
							{
								...data.data,
								created_at: getFormattedDate(data.data.created_at),
								updated_at: getFormattedDate(data.data.updated_at),
								isDisplay: true,
							},
						];
					});
				} else {
					showToast(TASK.ADD, STATE.FORBIDDEN);
				}
			})
			.catch((e) => {
				console.error(e);
				showToast(TASK.ADD, STATE.ERROR);
			});
	};

	const onUpdateSubmit = async (values: ExVocabulary) => {
		await fetch(`/api/vocabulary/update/${values.vocabulary_id}`, {
			method: "post",
			body: JSON.stringify(values),
		})
			.then(async (response) => {
				const data = await response.json();
				if (response.ok && data.message === "OK") {
					showToast(TASK.UPDATE, STATE.SUCCESS);
					setVocabularies((prevItems) => {
						if (!prevItems) return [];
						const index = prevItems.findIndex(
							(v) => v.vocabulary_id === values.vocabulary_id
						);
						if (index === -1) return prevItems;
						const updatedItems = [...prevItems];
						updatedItems[index] = {
							...data.data,
							created_at: getFormattedDate(data.data.created_at),
							updated_at: getFormattedDate(data.data.updated_at),
							isDisplay: true,
						};
						return updatedItems;
					});
				} else {
					showToast(TASK.UPDATE, STATE.FORBIDDEN);
				}
			})
			.catch((e) => {
				console.error(e);
				showToast(TASK.UPDATE, STATE.ERROR);
			});
	};

	const onDeleteSubmit = async (values: ExVocabulary) => {
		await fetch(`/api/vocabulary/delete/${values.vocabulary_id}`, {
			method: "post",
		})
			.then(async (response) => {
				if (response.ok) {
					showToast(TASK.DELETE, STATE.INFO);
					setVocabularies((prevItems) => {
						if (!prevItems) return [];
						return prevItems.filter(
							(v) => v.vocabulary_id !== values.vocabulary_id
						);
					});
					onClose();
				}
			})
			.catch((e) => {
				console.error(e);
				showToast(TASK.DELETE, STATE.ERROR);
			});
	};

	const initForm = (detailVocabulary: ExVocabulary) => {
		setValue("vocabulary_id", detailVocabulary?.vocabulary_id);
		setDeleteValue("vocabulary_id", detailVocabulary?.vocabulary_id);
		setValue("title", detailVocabulary?.title);
		setValue("description", "...");
		setValue("updated_at", detailVocabulary?.updated_at);
		setValue("created_at", detailVocabulary?.created_at);
		setValue("deleted_at", detailVocabulary?.deleted_at);
		setValue("isDisplay", true);
	};

	return {
		initForm,
		handleSubmit,
		register,
		setValue,
		errors,
		isSubmitting,
		handleDeleteSubmit,
		deleteRegister,
		setDeleteValue,
		deleteErrors,
		deleteIsSubmitting,
		onAddSubmit,
		onUpdateSubmit,
		onDeleteSubmit,
	};
};
