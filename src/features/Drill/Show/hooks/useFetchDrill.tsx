import { QuestionAnswer } from "@/types/QuestionAnswer";
import useSWR from "swr";

type Response = {
	questions: QuestionAnswer[];
};

const fetcher = async (url: string) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("API request failed");
	}
	return response.json();
};

export const useFetchDrill = () => {
	const url = `/api/drill`;
	const { data, error } = useSWR<Response>(url, fetcher);

	return {
		questions: data?.questions,
		isLoading: !error && !data,
		isError: error,
	};
};
