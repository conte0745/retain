import { Vocabulary } from "@prisma/client";

export type Fetch<T> = (url: string) => Promise<{ message: string; data: T }>;

export type VocabularyResponse = {
	headers: string;
	status: string;
	data: {
		message: string;
		data: Vocabulary[];
	};
};
