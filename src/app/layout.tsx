import { AuthProvider } from "@/features/Authentication/components/AuthProvider";
import { Header } from "@/features/Header/components";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
	title: "RetainTutor",
	description: "記憶を保持するチューターとして、記憶の定着をサポートします。",
	openGraph: {
		title: "RetainTutor",
		description: "記憶を保持するチューターとして、記憶の定着をサポートします。",
		images: ["icon.jpg"],
	},
	metadataBase: new URL(process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"),
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja">
			<head>
				<link rel="apple-touch-icon" sizes="32x32" href="icon.png" />
				<link rel="icon" sizes="32x32" href="icon.png" />
			</head>
			<body>
				<main>
					<React.StrictMode>
						<AuthProvider>
							<ChakraProvider>
								<Header></Header>
								<Container>{children}</Container>
							</ChakraProvider>
						</AuthProvider>
					</React.StrictMode>
				</main>
				<SpeedInsights />
			</body>
		</html>
	);
}
