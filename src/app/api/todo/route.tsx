import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils";

export async function GET() {
	try {
		await prisma.$connect();
		const todos = await prisma.todo.findMany({
			orderBy: {
				todo_id: "asc",
			},
		});
		return NextResponse.json(todos);
	} catch (e) {
		console.error(e);
		return NextResponse.json({ message: e }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}

export async function POST(request: NextRequest) {
	const { content } = await request.json();
	try {
		await prisma.$connect();
		await prisma.todo.create({
			data: {
				content: content,
				created_at: getNow(),
				updated_at: null,
				deleted_at: null,
			},
		});
		const todos = await prisma.todo.findMany();
		return NextResponse.json(todos);
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
