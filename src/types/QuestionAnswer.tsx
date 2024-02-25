import { Answer, Question } from "@prisma/client";

export type QuestionAnswer = Question & {
	answers: Answer[];
};

export const initAnswers: Answer = {
	answer_id: -1,
	question_id: -1,
	answer_content: "",
	answer_is_correct_content: false,
	answer_public_flag: false,
	answer_created_at: new Date(),
	answer_updated_at: null,
	answer_deleted_at: null,
	answer_deleted_flag: false,
};
