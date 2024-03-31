import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";

export async function GET() {
	try {
		await prisma.$connect();
		const vocabularies = await prisma.vocabulary.findMany({
			orderBy: {
				vocabulary_id: "asc",
			},
		});
		return NextResponse.json(vocabularies);
	} catch (e) {
		console.error(e);
		return NextResponse.json({ message: e }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}

export async function POST(request: NextRequest) {
	const { title } = await request.json();
	try {
		await prisma.$connect();
		await prisma.vocabulary.create({
			data: {
				title: title,
				created_at: getNow(),
				updated_at: null,
				deleted_at: null,
			},
		});
		const vocabularies = await prisma.vocabulary.findMany();
		return NextResponse.json(vocabularies);
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
