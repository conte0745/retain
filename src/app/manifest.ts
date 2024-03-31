import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "RetainTutor",
		short_name: "RetainTutor",
		description: "RetainTutor",
		start_url: "/",
		display: "browser",
		background_color: "#fff",
		theme_color: "#fff",
		icons: [
			{
				src: "/icon.png",
				sizes: "any",
				type: "image/x-icon",
			},
		],
	};
}
