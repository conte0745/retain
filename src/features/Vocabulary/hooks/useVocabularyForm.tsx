import { useForm } from "react-hook-form";
import { Vocabulary } from "@prisma/client";
import { useVocabularyToast } from "./useVocabularyToast";
import { STATE, TASK } from "./getMessage";
import { useVocabularies } from "@Vocabulary/components/VocabularyContext";

export const useVocabularyForm = (
	detailVocabulary: Vocabulary | undefined,
	onClose: () => void | undefined
) => {
	const { showToast } = useVocabularyToast();
	const { setVocabularies } = useVocabularies();
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<Vocabulary>({
		defaultValues: detailVocabulary,
		reValidateMode: "onSubmit",
	});

	const {
		handleSubmit: handleDeleteSubmit,
		register: deleteRegister,
		setValue: setDeleteValue,
		formState: { errors: deleteErrors, isSubmitting: deleteIsSubmitting },
	} = useForm<Vocabulary>({
		defaultValues: detailVocabulary,
		reValidateMode: "onSubmit",
	});

	const onAddSubmit = async (values: Vocabulary) => {
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
						if (!prevItems) return [values];
						const newItem = prevItems.concat(values);
						return newItem;
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

	const onUpdateSubmit = async (values: Vocabulary) => {
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
						const updatedItems = [...prevItems];
						updatedItems[index] = { ...values, updated_at: new Date() };
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

	const onDeleteSubmit = async (values: Vocabulary) => {
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

	const initForm = (detailVocabulary: Vocabulary) => {
		setValue("vocabulary_id", detailVocabulary?.vocabulary_id);
		setDeleteValue("vocabulary_id", detailVocabulary?.vocabulary_id);
		setValue("title", detailVocabulary?.title);
		setValue("description", "...");
		setValue("updated_at", detailVocabulary?.updated_at);
		setValue("created_at", detailVocabulary?.created_at);
		setValue("deleted_at", detailVocabulary?.deleted_at);
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
