import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });
try {
	const result = await prisma.todo.findMany();
	console.log(result);
} catch (e) {
	console.error(e);
} finally {
	await prisma.$disconnect();
}
