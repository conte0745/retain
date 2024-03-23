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
	if (!isNumber(params.id)) {
		return NextResponse.json({ message: "notFound" }, { headers: options });
	}
	try {
		const targetId: number = Number(params.id);
		await prisma.$connect();
		const questions = await prisma.question.findUnique({
			where: {
				question_id: targetId,
				question_public_flag: true,
				question_deleted_at: null,
			},
			include: {
				answers: true,
			},
		});

		return NextResponse.json({ questions }, { headers: options });
	} catch (e) {
		return NextResponse.json({ message: e }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isNumber(value: any): boolean {
	return !Number.isNaN(parseInt(value));
}
