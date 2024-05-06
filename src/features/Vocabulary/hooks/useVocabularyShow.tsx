import { useState, useEffect, SetStateAction, Dispatch } from "react";
import {
	ExVocabulary,
	useVocabularies,
} from "@Vocabulary/components/VocabularyContext";
import { Vocabulary } from "@prisma/client";
import { useVocabularyToast } from "./useVocabularyToast";
import { STATE, TASK } from "./getMessage";
import { getFormattedDate } from "@/types/getFormattedDate";

export const useVocabularyShow = (
	fetchFlg: boolean,
	setFetchFlg: Dispatch<SetStateAction<boolean>>,
	setDetailVocabulary: Dispatch<SetStateAction<Vocabulary>>,
	onOpen: { (): void }
) => {
	const [isLoading, setIsLoading] = useState(true);
	const { vocabularies, setVocabularies } = useVocabularies();
	const { showToast } = useVocabularyToast();

	useEffect(() => {
		if (!fetchFlg) {
			fetch(`/api/vocabulary`)
				.then((response) => response.json())
				.then((data) => {
					setVocabularies(
						data.map((vocabulary: ExVocabulary) => ({
							...vocabulary,
							created_at: getFormattedDate(vocabulary.created_at),
							updated_at: getFormattedDate(vocabulary.updated_at),
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
					setFetchFlg(true);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchFlg]);

	const handleEditClick = (vocabulary: ExVocabulary) => {
		setDetailVocabulary(vocabulary);
		onOpen();
	};

	return { vocabularies, isLoading, handleEditClick };
};
