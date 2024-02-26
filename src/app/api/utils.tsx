import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const options = {
	"Access-Control-Allow-Origin": "http://localhost:5173",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};
