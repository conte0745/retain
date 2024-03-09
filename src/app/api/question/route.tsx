import { NextRequest, NextResponse } from "next/server";
import { Question } from "@prisma/client";
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

export async function POST(request: NextRequest) {
	const question: Question = await request.json();
	try {
		await prisma.$connect();
		await prisma.question.create({
			data: {
				question_title: question.question_title,
				question_created_at: getNow(),
				question_updated_at: null,
				question_deleted_at: null,
			},
		});
		const questions = await prisma.question.findMany();
		return NextResponse.json(questions, { headers: options });
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
