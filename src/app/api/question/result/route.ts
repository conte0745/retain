import { NextRequest, NextResponse } from "next/server";
import { options } from "@/app/api/utils";
import prisma from "@/app/db";
import { AnswerResult } from "@prisma/client";

export async function OPTIONS() {
	try {
		return NextResponse.json({}, { headers: options });
	} catch (e) {
		return NextResponse.json({ message: e }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	const result: AnswerResult = await request.json();
	try {
		await prisma.$connect();
		await prisma.answerResult.create({
			data: {
				answer_result_id: undefined,
				answer_result_user_uuid: result.answer_result_user_uuid,
				answer_result_question_id: Number(result.answer_result_question_id),
				answer_result_is_correct: result.answer_result_is_correct,
			},
		});
		return NextResponse.json({}, { status: 200, headers: options });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ message: e }, { status: 500, headers: options });
	} finally {
		await prisma.$disconnect();
	}
}
