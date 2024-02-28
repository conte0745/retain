import { Answer } from "@prisma/client";

export const fetchAnswers = async (question_id: number) => {
	const url = process.env.NEXT_PUBLIC_API_URL;

	const response: Answer[] = await fetch(`${url}/drill/${question_id}`)
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
