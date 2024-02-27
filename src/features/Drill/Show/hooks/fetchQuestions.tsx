import { Question } from "@prisma/client";

export const fetchQuestions = async () => {
	const url = import.meta.env.VITE_PUBLIC_API_URL;

	const response: Question[] = await fetch(`${url}/question`)
		.then((response) => {
			return response.json();
		})
		.catch((e) => {
			console.error(e);
		})
		.finally(() => {
			//
		});
	console.log(response);
	response.forEach((e) => {
		e.question_created_at = new Date(e.question_created_at);
		e.question_updated_at = e.question_updated_at
			? new Date(e.question_updated_at)
			: null;
	});
	return response;
};
