"use client";

import { DetailDrill } from "@/features/Drill/Detail/components";
import { Show } from "@/features/Drill/Show/components";
import { Route, Routes } from "react-router-dom";

const Drill = () => {
	return (
		<>
			<Routes>
				<Route path="drill/detail" Component={DetailDrill} />
				<Route path="drill" Component={Show} />
			</Routes>
		</>
	);
};

export default Drill;
