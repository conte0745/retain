"use client";

import React, { useState } from "react";

interface MarkerProps {
	x: number;
	y: number;
	index: number;
	onDelete: (index: number) => void;
}

const Marker: React.FC<MarkerProps> = ({ x, y, index, onDelete }) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);
	const handleDelete = () => onDelete(index);
	return (
		<div
			style={{
				position: "absolute",
				borderRadius: "5px",
				left: `${x}px`,
				top: `${y}px`,
				backgroundColor: "#00CCFF",
				width: "20px",
				height: "20px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				transform: "translate(-50%, -50%)",
				zIndex: 10,
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="marker"
		>
			{index}
			<div
				style={{
					content: "",
					position: "absolute",
					left: "-7.5px",
					top: "5px",
					borderTop: "5px solid transparent",
					borderRight: "7.5px solid #00CCFF",
					borderBottom: "5px solid transparent",
				}}
			/>
			{isHovered && (
				<button
					onClick={handleDelete}
					style={{
						position: "absolute",
						bottom: "-10px",
						right: "-10px",
						backgroundColor: "red",
						color: "white",
						border: "none",
						borderRadius: "50%",
						width: "20px",
						height: "20px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						cursor: "pointer",
					}}
				>
					X
				</button>
			)}
		</div>
	);
};

export default Marker;
