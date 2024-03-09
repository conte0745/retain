import { Answer } from "@prisma/client";

export const fetchAnswers = async (question_id: number) => {
	const response: Answer[] = await fetch(`/api/drill/${question_id}`)
		.then((response) => {
			return response.json();
		})
		.catch((e) => {
			console.error(e);
		})
		.finally(() => {
			//
		});

	return response;
};
