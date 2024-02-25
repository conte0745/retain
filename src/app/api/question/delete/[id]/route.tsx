import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Params } from "react-router-dom";
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

export async function POST(_: NextRequest, { params }: { params: Params }) {
	try {
		const targetId: number = Number(params.id);
		await prisma.$connect();
		await prisma.question.update({
			where: {
				question_id: targetId,
			},
			data: {
				question_deleted_at: getNow(),
			},
		});
		return NextResponse.json({}, { status: 200, headers: options });
	} catch (e) {
		console.log(e);
		return NextResponse.json({ message: e }, { status: 500, headers: options });
	} finally {
		await prisma.$disconnect();
	}
}

function getNow() {
	const date = new Date();
	return date;
}
