import { renderHook } from "@testing-library/react";
import { useVocabularyShow } from "@Vocabulary/hooks/useVocabularyShow";
import * as VocabularyContext from "@Vocabulary/components/VocabularyContext";
import { getVocabulariesXpath } from "../../../ui/util";

// モックの設定
jest.mock("@/features/Vocabulary/components/VocabularyContext", () => ({
	useVocabularies: jest.fn(),
}));
jest.mock("@/features/Vocabulary/hooks/useVocabularyToast", () => ({
	useVocabularyToast: () => ({ showToast: jest.fn() }),
}));

describe("useVocabularyShow", () => {
	const setFetchFlg = jest.fn();
	const setDetailVocabulary = jest.fn();
	const onOpen = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		(VocabularyContext.useVocabularies as jest.Mock).mockReturnValue({
			vocabularies: [],
			setVocabularies: jest.fn(),
		});
	});

	test("fetchFlg が false のときに、データフェッチを行うのかチェック", async () => {
		const { result } = renderHook(() =>
			useVocabularyShow(false, setFetchFlg, setDetailVocabulary, onOpen)
		);

		expect(result.current.vocabularies)
			.expect(result.current.isLoading)
			.toBeTruthy();
		expect(setFetchFlg).toHaveBeenCalledWith(false);
		expect(setDetailVocabulary).toHaveBeenCalledWith();
		expect(result.current.isLoading).toBeFalsy();
	});

	test("fetchFlg が true のときに、データフェッチを行わないチェック", async () => {
		const { result } = renderHook(() =>
			useVocabularyShow(true, setFetchFlg, setDetailVocabulary, onOpen)
		);

		expect(result.current.isLoading).toBeTruthy();
		expect(setFetchFlg).toHaveBeenCalledWith(0);
		expect(setDetailVocabulary).toHaveBeenCalledWith(0);
		expect(onOpen).toHaveBeenCalledWith(0);
	});

	test("編集ボタンを押下した時に、モーダルが開くかのチェック", async () => {
		const { result } = renderHook(() =>
			useVocabularyShow(true, setFetchFlg, setDetailVocabulary, onOpen)
		);

		result.current.handleEditClick(result.current.vocabularies?.at(0));
		expect(setDetailVocabulary).toHaveBeenCalledWith(
			result.current.vocabularies?.at(0)
		);
		expect(onOpen).toHaveBeenCalled();
	});
});
