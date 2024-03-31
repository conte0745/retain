import { NextResponse } from "next/server";
import { options } from "@/app/api/utils";
import prisma from "@/app/db";

export async function OPTIONS() {
	try {
		return NextResponse.json({}, { headers: options });
	} catch (e) {
		return NextResponse.json({ message: e }, { status: 500 });
	}
}

export async function GET() {
	try {
		await prisma.$connect();
		const questions = await prisma.question.findMany({
			where: {
				question_public_flag: false,
				question_deleted_at: null,
			},
			orderBy: {
				question_id: "asc",
			},
		});
		return NextResponse.json(questions, { headers: options });
	} catch (e) {
		return NextResponse.json({ message: "Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
