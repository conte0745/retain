import { AnswerResult } from "@prisma/client";

export const postAnswerResult = async (values: AnswerResult) => {
	const response = await fetch(`/api/question/result`, {
		method: "post",
		headers: {},
		body: JSON.stringify(values),
	})
		.then((response) => {
			return response.status;
		})
		.catch((e) => {
			console.error(e);
			return null;
		});
	return response;
};
