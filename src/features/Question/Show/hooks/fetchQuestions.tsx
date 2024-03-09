import { Question } from "@prisma/client";

export const fetchQuestions = async () => {
	const response: Question[] | undefined = await fetch(`/api/question`)
		.then((response) => {
			return response.json();
		})
		.catch((e) => {
			console.error(e);
		})
		.finally(() => {
			//
		});

	if (response != undefined || response != null) {
		response.forEach((e) => {
			e.question_created_at = new Date(e.question_created_at);
			e.question_updated_at = e.question_updated_at
				? new Date(e.question_updated_at)
				: null;
		});
	}
	return response;
};
