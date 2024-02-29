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

export const Page = () => (
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
);

export default Page;
