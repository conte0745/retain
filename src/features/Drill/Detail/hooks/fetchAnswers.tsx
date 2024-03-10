export const fetchAnswers = async (question_id: number) => {
	const response = await fetch(`/api/drill/${question_id}`)
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
