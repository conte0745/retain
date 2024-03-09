export const deleteQuestionWithAnswer = async (question_id: number) => {
	const response = await fetch(`/api/question/delete/${question_id}`, {
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
