import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Params } from "react-router-dom";
import { options } from "@/app/api/utils";

const prisma = new PrismaClient();

export async function OPTIONS() {
	return NextResponse.json({}, { headers: options });
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Params }
) {
	const { content } = await request.json();

	try {
		const targetId: number = Number(params.id);
		await prisma.$connect();
		await prisma.todo.update({
			where: {
				todo_id: targetId,
			},
			data: {
				content: content,
				updated_at: getNow(),
			},
		});

		return NextResponse.json({ status: 200 });
	} catch (e) {
		return NextResponse.json({ message: "Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}

function getNow() {
	const date = new Date();
	return date;
}
