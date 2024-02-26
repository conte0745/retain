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

export const initQuestions: Question = {
	question_id: -1,
	question_title: "",
	question_content: "",
	question_explanation: "",
	question_public_flag: false,
	question_correct_rate: 0,
	question_count_incorrect_question: 0,
	question_created_at: new Date(),
	question_updated_at: null,
	question_deleted_at: null,
};
