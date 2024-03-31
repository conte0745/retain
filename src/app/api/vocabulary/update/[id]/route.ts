import { NextRequest, NextResponse } from "next/server";
import { Params } from "react-router-dom";
import { getNgList, options } from "@/app/api/utils";
import prisma from "@/app/db";

export async function OPTIONS() {
	try {
		return NextResponse.json({}, { headers: options });
	} catch (e) {
		return NextResponse.json({ message: e }, { status: 500 });
	}
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Params }
) {
	const { title, description } = await request.json();
	const ngList = getNgList().split(",");
	const isNgTitle = ngList.some((ng) => title.includes(ng));
	const isNgDescription = ngList.some((ng) => description.includes(ng));

	if (isNgTitle || isNgDescription) {
		return NextResponse.json({ message: "NG" }, { status: 200 });
	}

	try {
		const targetId: number = Number(params.id);
		await prisma.$connect();
		await prisma.vocabulary.update({
			where: {
				vocabulary_id: targetId,
			},
			data: {
				title: title,
				description: description,
				updated_at: getNow(),
			},
		});

		return NextResponse.json({ message: "OK" }, { status: 200 });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ message: "Error" + e }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}

function getNow() {
	const date = new Date();
	return date;
}
