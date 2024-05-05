import { renderHook, act } from "@testing-library/react";
import { useVocabularyShow } from "@Vocabulary/hooks/useVocabularyShow";
import * as VocabularyContext from "@Vocabulary/components/VocabularyContext";

// モックの設定
jest.mock("@/feature/Vocabulary/components/VocabularyContext", () => ({
	useVocabularies: jest.fn(),
}));
jest.mock("@/feature/Vocabulary/hooks/useVocabularyToast", () => ({
	useVocabularyToast: () => ({ showToast: jest.fn() }),
}));

describe("useVocabularyShow", () => {
	const setSubmitId = jest.fn();
	const setDetailVocabulary = jest.fn();
	const onOpen = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		VocabularyContext.useVocabularies.mockReturnValue({
			vocabularies: [],
			setVocabularies: jest.fn(),
		});
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve([
						{
							vocabulary_id: 1,
							title: "Word 1",
							created_at: new Date(),
							updated_at: new Date(),
							isDisplay: true,
						},
						{
							vocabulary_id: 2,
							title: "Word 2",
							created_at: new Date(),
							updated_at: null,
							isDisplay: true,
						},
					]),
			})
		);
	});

	test("loads and sets vocabularies on mount if submitId is not null", async () => {
		const { result, waitForNextUpdate } = renderHook(() =>
			useVocabularyShow(1, setSubmitId, setDetailVocabulary, onOpen)
		);

		await waitForNextUpdate();

		expect(result.current.vocabularies.length).toBe(2);
		expect(result.current.isLoading).toBeFalsy();
		expect(setSubmitId).toHaveBeenCalledWith(null);
	});

	test("handleEditClick should call setDetailVocabulary and onOpen", () => {
		const { result } = renderHook(() =>
			useVocabularyShow(1, setSubmitId, setDetailVocabulary, onOpen)
		);

		act(() => {
			result.current.handleEditClick(result.current.vocabularies[0]);
		});

		expect(setDetailVocabulary).toHaveBeenCalledWith(
			result.current.vocabularies[0]
		);
		expect(onOpen).toHaveBeenCalled();
	});
});
