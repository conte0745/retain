"use client";

import { Box, Input } from "@chakra-ui/react";
import React, { useState } from "react";

interface ImageUploaderProps {
	onImageUpload: (src: string, width: number, height: number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
	const [, setImageSrc] = useState<string | null>(null);
	const [, setImageDimensions] = useState<{
		width: number;
		height: number;
	} | null>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.result) {
					const result = reader.result.toString();
					const img = new Image();
					img.src = result;
					img.onload = () => {
						const width = img.width;
						const height = img.height;
						setImageSrc(result);
						setImageDimensions({ width, height });
						onImageUpload(result, width, height);
					};
				}
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<Box>
			<Input
				type="file"
				accept="image/*"
				multiple={false}
				onChange={handleImageChange}
			/>
		</Box>
	);
};

export default ImageUploader;
