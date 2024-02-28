"use client";
import { AuthProvider } from "@/features/Authentication/components/AuthProvider";
import { SignIn } from "@/features/Authentication/components/signin";
import { SignOut } from "@/features/Authentication/components/signout";
import { SignUp } from "@/features/Authentication/components/signup";
import { DetailDrill } from "@/features/Drill/Detail/components";
import { Drill } from "@/features/Drill/drill";
import { Header } from "@/features/Header/components";
import { Questions } from "@/features/Question/question";
import { Todos } from "@/features/Todo/todo";
import { Top } from "@/features/Top/components";
import { ChakraProvider, Container } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RootLayout = ({ children }: { children: React.ReactNode }) => (
	<html lang="ja">
		<head>
			<meta charSet="UTF-8" />
			<link rel="icon" type="image/svg+xml" href="/icon.png" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>問題集</title>
		</head>
		<body className="app">
			<React.StrictMode>
				<AuthProvider>
					<ChakraProvider>
						<BrowserRouter>
							<Header></Header>
							<Container>
								<Routes>
									<Route index element={<Top />} />
									<Route path="/todo/*" element={<Todos />} />
									<Route path="/question/*" element={<Questions />} />
									<Route path="/drill" element={<Drill />} />
									<Route path="/drill/Detail" element={<DetailDrill />} />
									<Route path="/signup" element={<SignUp />} />
									<Route path="/signin" element={<SignIn />} />
									<Route path="/signout" element={<SignOut />} />
								</Routes>
							</Container>
						</BrowserRouter>
					</ChakraProvider>
				</AuthProvider>
			</React.StrictMode>
		</body>
	</html>
);
export default RootLayout;
