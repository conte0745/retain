import { QuestionAnswer } from "@/types/QuestionAnswer";

export const postQuestion = async (values: QuestionAnswer) => {
	const url = process.env.NEXT_PUBLIC_PUBLIC_API_URL;

	console.log(values);
	const response = await fetch(`${url}/question/update/${values.question_id}`, {
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
