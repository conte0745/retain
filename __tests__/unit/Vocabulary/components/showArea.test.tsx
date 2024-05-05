import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Show } from "@/features/Vocabulary/components/showArea";
import { useVocabularyShow } from "@/features/Vocabulary/hooks/useVocabularyShow";

jest.mock("@chakra-ui/react", () => ({
	...jest.requireActual("@chakra-ui/react"),
	useColorMode: jest.fn(() => ({ colorMode: "light" })),
}));

jest.mock("@/features/Vocabulary/hooks/useVocabularyShow", () => ({
	useVocabularyShow: jest.fn(() => ({
		vocabularies: [
			{ vocabulary_id: 1, title: "Word 1", isDisplay: true },
			{ vocabulary_id: 2, title: "Word 2", isDisplay: true },
		],
		isLoading: false,
		handleEditClick: jest.fn(),
	})),
}));

describe("Show Component", () => {
	beforeEach(() => {
		// モック関数のリセットが必要な場合に備えてここで行います
		jest.clearAllMocks();
	});

	test("renders the table with vocabularies", () => {
		render(
			<Show
				submitId={null}
				setSubmitId={jest.fn()}
				onOpen={jest.fn()}
				setDetailVocabulary={jest.fn()}
			/>
		);
		expect(screen.getByText("Word 1")).toBeInTheDocument();
		expect(screen.getByText("Word 2")).toBeInTheDocument();
	});

	test("renders loading when data is loading", () => {
		useVocabularyShow.mockReturnValueOnce({
			vocabularies: [],
			isLoading: true,
			handleEditClick: jest.fn(),
		});
		render(
			<Show
				submitId={null}
				setSubmitId={jest.fn()}
				onOpen={jest.fn()}
				setDetailVocabulary={jest.fn()}
			/>
		);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	test("calls handleEditClick when edit button is clicked", () => {
		const handleEditClick = jest.fn();
		useVocabularyShow.mockReturnValue({
			vocabularies: [{ vocabulary_id: 1, title: "Word 1", isDisplay: true }],
			isLoading: false,
			handleEditClick,
		});

		render(
			<Show
				submitId={null}
				setSubmitId={jest.fn()}
				onOpen={jest.fn()}
				setDetailVocabulary={jest.fn()}
			/>
		);
		fireEvent.click(screen.getByText("編集"));
		expect(handleEditClick).toHaveBeenCalledWith({
			vocabulary_id: 1,
			title: "Word 1",
			isDisplay: true,
		});
	});
});
