import { QuestionAnswer } from "@/types/QuestionAnswer";
import useSWR from "swr";

type Response = {
	questions: QuestionAnswer;
	message: string;
};

const fetcher = async (url: string) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("API request failed");
	}
	return response.json();
};

export const useFetchAnswers = (question_id: number) => {
	const url = `/api/drill/${question_id}`;
	const { data, error } = useSWR<Response>(url, fetcher);

	if (data?.message) {
		return {
			question: undefined,
			correctAnswerIndex: undefined,
			isLoading: !error && !data,
			isError: error,
		};
	}

	const correctAnswerIndex = data?.questions.answers.findIndex(
		(e) => e.answer_is_correct_content
	);

	return {
		question: data?.questions,
		correctAnswerIndex: correctAnswerIndex,
		isLoading: !error && !data,
		isError: error,
	};
};
