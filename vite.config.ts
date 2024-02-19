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
			"@Top": resolve(__dirname, "./src/features/Top/"),
			"@Todo": resolve(__dirname, "./src/features/Todo/"),
			"@Show": resolve(__dirname, "./src/features/Todo/Show/"),
			"@InputArea": resolve(__dirname, "./src/features/Todo/InputArea/"),
			"@Detail": resolve(__dirname, "./src/features/Todo/Detail/"),
			"@Header": resolve(__dirname, "./src/features/Header"),
			"~": resolve(__dirname, "./public/"),
		},
	},
});
