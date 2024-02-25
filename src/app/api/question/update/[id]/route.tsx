import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Params } from "react-router-dom";
import { options } from "@/app/api/utils";
import { QuestionAnswer } from "@/types/QuestionAnswer";

const prisma = new PrismaClient();

export async function OPTIONS() {
	try {
		return NextResponse.json({}, { headers: options });
	} catch (e) {
		console.log(e);
		return NextResponse.json({ message: e }, { status: 500 });
	}
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Params }
) {
	const question: QuestionAnswer = await request.json();

	try {
		const targetId: number = Number(params.id);
		await prisma.$connect();
		await prisma.question.update({
			where: {
				question_id: targetId,
			},
			data: {
				question_title: question.question_title,
				question_content: question.question_content,
				question_explanation: question.question_explanation,
				question_public_flag: question.question_public_flag,
				question_count_incorrect_question:
					question.question_count_incorrect_question,
				question_updated_at: getNow(),
			},
		});
		question.answers.forEach(async (answer) => {
			await prisma.answer.upsert({
				create: {
					question_id: targetId,
					answer_content: answer.answer_content,
					answer_is_correct_content: answer.answer_is_correct_content,
					answer_public_flag: answer.answer_public_flag,
					answer_created_at: getNow(),
				},
				update: {
					answer_content: answer.answer_content,
					answer_is_correct_content: answer.answer_is_correct_content,
					answer_public_flag: answer.answer_public_flag,
					answer_updated_at: getNow(),
					answer_deleted_flag: answer.answer_deleted_flag,
					answer_deleted_at: answer.answer_deleted_flag ? getNow() : null,
				},
				where: {
					answer_id: answer.answer_id,
				},
			});
		});

		return NextResponse.json({}, { status: 200, headers: options });
	} catch (e) {
		return NextResponse.json(
			{ message: "Error" },
			{ status: 500, headers: options }
		);
	} finally {
		await prisma.$disconnect();
	}
}

function getNow() {
	const date = new Date();
	return date;
}
