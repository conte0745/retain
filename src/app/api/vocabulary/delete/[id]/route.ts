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

export async function POST(_: NextRequest, { params }: { params: Params }) {
	try {
		const targetId: number = Number(params.id);
		await prisma.$connect();
		await prisma.vocabulary.update({
			where: {
				vocabulary_id: targetId,
			},
			data: {
				deleted_at: getNow(),
			},
		});
		console.log("del");
		return NextResponse.json({ status: 200 }, { headers: options });
	} catch (e) {
		return NextResponse.json({ message: e }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}

function getNow() {
	const date = new Date();
	return date;
}
