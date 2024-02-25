import { NextRequest, NextResponse } from "next/server";
import { Params } from "react-router-dom";
import { PrismaClient } from "@prisma/client";
import { options } from "@/app/api/utils";

const prisma = new PrismaClient();

export async function OPTIONS() {
	try {
		return NextResponse.json({}, { headers: options });
	} catch (e) {
		console.log(e);
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
				answer_deleted_flag: false,
			},
			orderBy: {
				answer_id: "asc",
			},
		});
		return NextResponse.json(answers, { headers: options });
	} catch (e) {
		return NextResponse.json({ message: "Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
