import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/db";

import { getNgList } from "@/app/api/utils";

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
	const ngList = getNgList().split(",");

	if (ngList.some((ng) => title === ng)) {
		return NextResponse.json({ message: "NG" }, { status: 200 });
	}

	try {
		await prisma.$connect();
		await prisma.vocabulary.create({
			data: {
				title: title,
				description: null,
				created_at: getNow(),
				updated_at: null,
				deleted_at: null,
			},
		});
		return NextResponse.json({ message: "OK" }, { status: 200 });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}

function getNow() {
	const date = new Date();
	return date;
}
