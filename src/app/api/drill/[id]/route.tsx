import { NextRequest, NextResponse } from "next/server";
import { Params } from "react-router-dom";
import { options } from "@/app/api/utils";
import prisma from "@/app/db";

export async function OPTIONS() {
	try {
		return NextResponse.json({}, { headers: options });
	} catch (e) {
		return NextResponse.json({ message: e }, { status: 500 });
	}
}

export async function GET(_: NextRequest, { params }: { params: Params }) {
	try {
		const targetId: number = Number(params.id);
		await prisma.$connect();
		const answers = await prisma.answer.findMany({
			where: {
				question_id: targetId,
				answer_public_flag: true,
				answer_deleted_flag: false,
			},
			orderBy: {
				answer_id: "asc",
			},
		});
		const question = await prisma.question.findUnique({
			where: {
				question_id: targetId,
			},
		});
		return NextResponse.json({ answers, question }, { headers: options });
	} catch (e) {
		return NextResponse.json({ message: "Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
