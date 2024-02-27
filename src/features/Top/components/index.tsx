import { Link } from "react-router-dom";

export const Top = () => {
	return (
		<>
			<h1>Top</h1>
			<Link to="./todo">TODO ページへ</Link>
			<br />
			<Link to="./question">Question ページへ</Link>
			<br />
			<Link to="./drill">Drill ページへ</Link>
		</>
	);
};
