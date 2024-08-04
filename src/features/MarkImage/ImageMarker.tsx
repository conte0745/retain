import React, { useState, MouseEvent } from "react";
import Image from "next/image";
import { Box, Button, ButtonGroup, Heading } from "@chakra-ui/react";
import Marker from "./Marker";

interface Marker {
	x: number;
	y: number;
	index: number;
}

interface ImageMarkerProps {
	imageSrc: string;
	width: number;
	height: number;
	setImageSrc: React.Dispatch<React.SetStateAction<string | null>>;
}
const ImageMarker: React.FC<ImageMarkerProps> = ({
	imageSrc,
	width,
	height,
	setImageSrc,
}) => {
	const [markers, setMarkers] = useState<Marker[]>([]);

	const handleImageClick = (e: MouseEvent<HTMLImageElement>) => {
		if (imageSrc.length > 0) {
			const rect = e.currentTarget.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top + e.currentTarget.offsetTop;
			console.log(y, rect.top);
			setMarkers([...markers, { x, y, index: markers.length + 1 }]);
		}
	};

	const handleDeleteMarker = (index: number) => {
		setMarkers(markers.filter((marker) => marker.index !== index));
	};
	const handleRenumberClick = () => {
		const sortedMarkers = [...markers].sort((a, b) => a.y - b.y);
		sortedMarkers.forEach((marker, newIndex) => {
			marker.index = newIndex + 1;
		});
		setMarkers(sortedMarkers);
	};
	const handleResetClick = () => {
		setMarkers([]);
	};
	const handleDeleteClick = () => {
		setMarkers([]);
		setImageSrc(null);
	};
	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			<Heading as="h2" size="xl" noOfLines={1}>
				Preview
			</Heading>
			<br />
			{imageSrc ? (
				<Image
					src={imageSrc}
					alt="Image to mark"
					onClick={handleImageClick}
					layout="responsive"
					width={width}
					height={height}
					style={{ cursor: "crosshair", maxWidth: "100%", maxHeight: "100%" }}
				/>
			) : (
				<Box
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "lightgray",
						width: "400px",
						height: "400px",
					}}
				>
					Please upload image
				</Box>
			)}

			{markers.map((marker, index) => (
				<Marker
					key={index}
					x={marker.x}
					y={marker.y}
					index={marker.index}
					onDelete={handleDeleteMarker}
				/>
			))}
			<br />

			<ButtonGroup>
				<Button
					onClick={handleRenumberClick}
					colorScheme="blue"
					disabled={!!imageSrc}
				>
					RENUMBER
				</Button>
				<Button
					onClick={handleResetClick}
					colorScheme="green"
					disabled={!!imageSrc}
				>
					RESET
				</Button>
				<Button
					onClick={handleDeleteClick}
					colorScheme="red"
					disabled={!!imageSrc}
				>
					DELETE
				</Button>
			</ButtonGroup>
		</div>
	);
};

export default ImageMarker;
