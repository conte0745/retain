import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "QQQ",
		short_name: "QQQ",
		description: "QQQ",
		start_url: "/",
		display: "standalone",
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
