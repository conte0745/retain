import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src/"),
			"@App": resolve(__dirname, "./src/features/App/"),
			"@Auth": resolve(__dirname, "./src/features/Authentication/"),
			"@Top": resolve(__dirname, "./src/features/Top/"),
			"@Todo": resolve(__dirname, "./src/features/Todo/"),
			"@TodoShow": resolve(__dirname, "./src/features/Todo/Show/"),
			"@TodoCreate": resolve(__dirname, "./src/features/Todo/InputArea/"),
			"@TodoDetail": resolve(__dirname, "./src/features/Todo/Detail/"),
			"@Question": resolve(__dirname, "./src/features/Question/"),
			"@QuestionShow": resolve(__dirname, "./src/features/Question/Show/"),
			"@QuestionCreate": resolve(
				__dirname,
				"./src/features/Question/InputArea/"
			),
			"@QuestionDetail": resolve(__dirname, "./src/features/Question/Detail/"),
			"@Header": resolve(__dirname, "./src/features/Header"),
			"~": resolve(__dirname, "./public/"),
		},
	},
});
