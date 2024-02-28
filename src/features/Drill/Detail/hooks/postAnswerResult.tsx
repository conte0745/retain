import { AnswerResult } from "@prisma/client";

export const postAnswerResult = async (values: AnswerResult) => {
	const url = process.env.NEXT_PUBLIC_API_URL;

	const response = await fetch(`${url}/question/result`, {
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
