import { Answer } from "@prisma/client";

export const fetchAnswers = async (question_id: number) => {
	const url = process.env.NEXT_PUBLIC_PUBLIC_API_URL;

	const response: Answer[] = await fetch(`${url}/answer/${question_id}`)
		.then((response) => {
			return response.json();
		})
		.catch((e) => {
			console.error(e);
		})
		.finally(() => {
			//
		});

	response.forEach((e) => {
		e.answer_created_at = new Date(e.answer_created_at);
		e.answer_updated_at = e.answer_updated_at
			? new Date(e.answer_updated_at)
			: null;
	});

	return response;
};
