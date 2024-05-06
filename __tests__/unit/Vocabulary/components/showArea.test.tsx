import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Show } from "@Vocabulary/components/showArea";
import { useVocabularyShow } from "@Vocabulary/hooks/useVocabularyShow";

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

describe("Show Component の単体テスト", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("一覧表示ができるかのテスト", () => {
		render(
			<Show
				fetchFlg={false}
				setFetchFlg={jest.fn()}
				onOpen={jest.fn()}
				setDetailVocabulary={jest.fn()}
			/>
		);
		expect(screen.getByText("Word 1")).toBeInTheDocument();
		expect(screen.getByText("Word 2")).toBeInTheDocument();
	});

	test("読み込み中にLoading画面が表示されるかのテスト", () => {
		(useVocabularyShow as jest.Mock).mockReturnValueOnce({
			vocabularies: [],
			isLoading: true,
			handleEditClick: jest.fn(),
		});
		render(
			<Show
				fetchFlg={false}
				setFetchFlg={jest.fn()}
				onOpen={jest.fn()}
				setDetailVocabulary={jest.fn()}
			/>
		);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	test("編集ボタンが反応するかのテスト", () => {
		const handleEditClick = jest.fn();
		(useVocabularyShow as jest.Mock).mockReturnValue({
			vocabularies: [{ vocabulary_id: 1, title: "Word 1", isDisplay: true }],
			isLoading: false,
			handleEditClick,
		});

		render(
			<Show
				fetchFlg={true}
				setFetchFlg={jest.fn()}
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
