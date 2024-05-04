import { useState, useCallback } from "react";
import { useVocabularies } from "@Vocabulary/components/VocabularyContext";

export const useSearchVocabularies = () => {
	const [searchValue, setSearchValue] = useState("");
	const { setVocabularies } = useVocabularies();

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const onSearch = useCallback(() => {
		setVocabularies((prevItems) => {
			if (!prevItems) return null;
			return prevItems.map((item) => ({
				...item,
				isDisplay: searchValue.length === 0 || item.title.includes(searchValue),
			}));
		});
	}, [searchValue, setVocabularies]);

	return {
		searchValue,
		setSearchValue,
		onChange,
		onSearch,
	};
};
