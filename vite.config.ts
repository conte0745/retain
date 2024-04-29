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
			"@Vocabulary": resolve(__dirname, "./src/features/Vocabulary/"),
			"@VocabularyShow": resolve(__dirname, "./src/features/Vocabulary/Show/"),
			"@VocabularyCreate": resolve(
				__dirname,
				"./src/features/Vocabulary/InputArea/"
			),
			"@VocabularyDetail": resolve(
				__dirname,
				"./src/features/Vocabulary/Detail/"
			),
			"@Question": resolve(__dirname, "./src/features/Question/"),
			"@QuestionShow": resolve(__dirname, "./src/features/Question/Show/"),
			"@QuestionCreate": resolve(
				__dirname,
				"./src/features/Question/InputArea/"
			),
			"@QuestionDetail": resolve(__dirname, "./src/features/Question/Detail/"),
			"@Drill": resolve(__dirname, "./src/features/Drill/"),
			"@DrillShow": resolve(__dirname, "./src/features/Drill/Show/"),
			"@DrillDetail": resolve(__dirname, "./src/features/Drill/Detail/"),
			"@Header": resolve(__dirname, "./src/features/Header"),
			"@Mypage": resolve(__dirname, "./src/features/Mypage"),
			"~": resolve(__dirname, "./public/"),
		},
	},
});
