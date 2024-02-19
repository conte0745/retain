import { Routes, Route, Link } from "react-router-dom";
import { Home, Top } from "@Top/components/index";
import { Header } from "@Header/components/index";
import { Container, Heading } from "@chakra-ui/react";
import { Todos } from "@/features/Todo/todo";

function App() {
	return (
		<>
			<Header></Header>
			<Container>
				<Heading>Todo Page</Heading>
				<Todos></Todos>
				<Link to="/top">Top</Link>
				<br />
				<Link to="/home">Home</Link>
				<br />
				<Routes>
					<Route path="/top" element={<Top />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</Container>
		</>
	);
}

export default App;
