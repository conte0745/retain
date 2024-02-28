export const deleteQuestionWithAnswer = async (question_id: number) => {
	const url = process.env.NEXT_PUBLIC_API_URL;

	const response = await fetch(`${url}/question/delete/${question_id}`, {
		method: "post",
		headers: {},
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
