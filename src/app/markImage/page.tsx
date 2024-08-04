"use client";

import React, { useState } from "react";
import ImageUploader from "@/features/MarkImage/ImageUploader";
import ImageMarker from "@/features/MarkImage/ImageMarker";
import { Heading } from "@chakra-ui/react";

const ImageCreate: React.FC = () => {
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [imageWidth, setImageWidth] = useState<number>(400);
	const [imageHeight, setImageHeight] = useState<number>(400);

	const handleImageUpload = (src: string, width: number, height: number) => {
		setImageSrc(src);
		setImageWidth(width);
		setImageHeight(height);
	};

	return (
		<>
			<div className="main">
				<br />
				<Heading as="h1" size="xl" noOfLines={1}>
					Let's marked Image
				</Heading>
				<br />
				<ImageUploader onImageUpload={handleImageUpload} />
				<br />
				<ImageMarker
					imageSrc={imageSrc ?? ""}
					width={imageWidth}
					height={imageHeight}
					setImageSrc={setImageSrc}
				/>
			</div>
		</>
	);
};

export default ImageCreate;
