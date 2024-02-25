import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from "@Header/components/index";
import { Container } from "@chakra-ui/react";
import { Todos } from "@/features/Todo/todo";
import { SignUp } from "@/features/Authentication/components/signup";
import { SignIn } from "@/features/Authentication/components/signin";
import { Top } from "@/features/Top/components";
import { SignOut } from "@/features/Authentication/components/signout";
import { Questions } from "@/features/Question/question";

function App() {
	return (
		<>
			<BrowserRouter>
				<Header></Header>
				<Container>
					<Routes>
						<Route index element={<Top />} />
						<Route path="/todo/*" element={<Todos />} />
						<Route path="/question/*" element={<Questions />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/signin" element={<SignIn />} />
						<Route path="/signout" element={<SignOut />} />
					</Routes>
				</Container>
			</BrowserRouter>
		</>
	);
}

export default App;
