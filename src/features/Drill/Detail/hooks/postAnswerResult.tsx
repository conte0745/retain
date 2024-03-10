import { AnswerResult } from "@prisma/client";

export const postAnswerResult = async (
	values: AnswerResult,
	id: string | undefined
) => {
	if (id != undefined || id != null) {
		values.answer_result_user_uuid = id;
	} else {
		values.answer_result_user_uuid = "-1";
	}
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
