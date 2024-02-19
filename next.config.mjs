export async function headers() {
	return [
		{
			source: "/api/todo/:path*",
			headers: [
				{
					key: "Access-Control-Allow-Origin",
					value: "*", // 許可するオリジンを適切に指定する
				},
				{
					key: "Access-Control-Allow-Methods",
					value: "GET POST PUT DELETE OPTIONS",
				},
				{
					key: "Access-Control-Allow-Headers",
					value: "Content-Type, Authorization",
				},
			],
		},
	];
}
