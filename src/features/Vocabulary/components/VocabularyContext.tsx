import { createContext, useContext, useState, ReactNode } from "react";
import { Vocabulary } from "@prisma/client";

export type ExVocabulary = Vocabulary & {
	isDisplay?: boolean;
};

interface IVocabularyContext {
	vocabularies: ExVocabulary[] | null;
	setVocabularies: React.Dispatch<React.SetStateAction<ExVocabulary[] | null>>;
}

const initialVocabularies: ExVocabulary[] = [];

export const VocabularyContext = createContext<IVocabularyContext>({
	vocabularies: initialVocabularies,
	setVocabularies: () => {},
});

export const VocabularyProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [vocabularies, setVocabularies] = useState<ExVocabulary[] | null>(
		initialVocabularies
	);
	return (
		<VocabularyContext.Provider
			value={{
				vocabularies,
				setVocabularies,
			}}
		>
			{children}
		</VocabularyContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useVocabularies = () => {
	return useContext(VocabularyContext);
};
