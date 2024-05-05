import { useState, useEffect, SetStateAction, Dispatch } from "react";
import {
	ExVocabulary,
	useVocabularies,
} from "@Vocabulary/components/VocabularyContext";
import { Vocabulary } from "@prisma/client";
import { useVocabularyToast } from "./useVocabularyToast";
import { STATE, TASK } from "./getMessage";

export const useVocabularyShow = (
	submitId: number | null,
	setSubmitId: Dispatch<SetStateAction<number | null>>,
	setDetailVocabulary: Dispatch<SetStateAction<Vocabulary>>,
	onOpen: { (): void }
) => {
	const [isLoading, setIsLoading] = useState(true);
	const { vocabularies, setVocabularies } = useVocabularies();
	const { showToast } = useVocabularyToast();

	useEffect(() => {
		if (submitId != null) {
			fetch(`/api/vocabulary`)
				.then((response) => response.json())
				.then((data) => {
					setVocabularies(
						data.map((vocabulary: ExVocabulary) => ({
							...vocabulary,
							created_at: new Date(vocabulary.created_at),
							updated_at: vocabulary.updated_at
								? new Date(vocabulary.updated_at)
								: null,
							isDisplay: true,
						}))
					);
				})
				.catch((error) => {
					console.error(error);
					showToast(TASK.SHOW, STATE.ERROR);
				})
				.finally(() => {
					setIsLoading(false);
					setSubmitId(null);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submitId]);

	const handleEditClick = (vocabulary: ExVocabulary) => {
		setDetailVocabulary(vocabulary);
		onOpen();
	};

	return { vocabularies, isLoading, handleEditClick };
};
