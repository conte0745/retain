import { By, ThenableWebDriver } from "selenium-webdriver";
import {
	sleep,
	setupDriver,
	getElement,
	clickElement,
	getToastXpath,
	getModalItemXpath,
	getVocabulariesXpath,
	scrollToBottom,
	BASE_URL,
	TIMEOUT,
	SAMPLE_VOCABULARY,
	SAMPLE_VOCABULARY_EDIT,
} from "./util";

describe("Vocabularyページのテスト", () => {
	let driver: ThenableWebDriver;

	beforeAll(async () => {
		driver = setupDriver();
	});

	beforeEach(async () => {
		await driver.get(BASE_URL + "/vocabulary");
		await sleep(2000);
	});

	afterAll(async () => {
		await driver.quit();
	});

	describe("タイトルの検証", () => {
		it("titleが予期されているものかどうかのテスト", async () => {
			expect(await driver.getTitle()).toBe("RetainTutor");
		});
	});

	describe("新規入力の検証", () => {
		it(
			"必須入力チェック",
			async () => {
				await checkRequiredFields(driver);
			},
			TIMEOUT
		);

		it(
			"禁止ワードチェック",
			async () => {
				await checkForbiddenWords(driver, "殺人");
			},
			TIMEOUT
		);

		it(
			"入力後の反映チェック",
			async () => {
				await checkInputReflection(driver, SAMPLE_VOCABULARY);
			},
			TIMEOUT
		);
	});

	describe("詳細画面の検証", () => {
		it(
			"モーダル画面の初期表示のチェック",
			async () => {
				await checkModalInitialDisplay(driver, SAMPLE_VOCABULARY);
			},
			TIMEOUT
		);

		it(
			"内容の更新チェック",
			async () => {
				await updateContent(driver, SAMPLE_VOCABULARY, SAMPLE_VOCABULARY_EDIT);
			},
			TIMEOUT
		);

		it(
			"内容の削除チェック",
			async () => {
				await deleteContent(driver, SAMPLE_VOCABULARY_EDIT);
			},
			TIMEOUT
		);
	});
});

// 必須項目
async function checkRequiredFields(driver: ThenableWebDriver): Promise<void> {
	const submitButton = await getElement(
		driver,
		By.id("vocabulary-submit-button")
	);
	await submitButton.click();
	const errorMessage = await getElement(driver, By.className("error"));
	expect(await errorMessage.getText()).toBe("必須項目です。");
}

// 入力フィールドにテキストを入力する関数
export async function setInputField(
	driver: ThenableWebDriver,
	locator: By,
	text: string
) {
	const element = await getElement(driver, locator);
	await element.clear();
	await element.sendKeys(text);
}

// 禁止ワードチェック関数
export async function checkForbiddenWords(
	driver: ThenableWebDriver,
	forbiddenWord: string
) {
	await setInputField(driver, By.id("title"), forbiddenWord);
	await clickElement(driver, By.id("vocabulary-submit-button"));
	const errorToast = await getElement(driver, getToastXpath("error"));
	expect(await errorToast.getText()).toContain(
		"使用できない単語が含まれています。"
	);
}

// 入力内容が反映されるかのチェック
export async function checkInputReflection(
	driver: ThenableWebDriver,
	inputValue: string
) {
	await setInputField(driver, By.id("title"), inputValue);
	await clickElement(driver, By.id("vocabulary-submit-button"));

	await sleep(3000);

	const titles = await driver.findElements(getVocabulariesXpath("title", null));
	let index = -1;
	for (let i = titles.length; i > 0; i--) {
		const titleText = await titles[i - 1].getText();
		if (titleText == inputValue) {
			index = i;
			break;
		}
	}
	expect(index > -1).toBe(true);
}

// モーダル画面の初期表示内容をチェックする関数
export async function checkModalInitialDisplay(
	driver: ThenableWebDriver,
	expectedText: string
) {
	await sleep(3000);

	const titles = await driver.findElements(getVocabulariesXpath("title", null));
	let index = -1;
	for (let i = titles.length; i > 0; i--) {
		const titleText = await titles[i - 1].getText();
		if (titleText == expectedText) {
			index = i;
			break;
		}
	}
	expect(index > -1).toBe(true);
	await scrollToBottom(driver);

	await clickElement(driver, getVocabulariesXpath("editBtn", index));
	const titleInput = await getElement(driver, getModalItemXpath("title"));
	const updateButton = await getElement(driver, getModalItemXpath("update"));
	expect(await titleInput.getAttribute("value")).toBe(expectedText);
	expect(await updateButton.isEnabled()).toBe(false);
}

// 内容の更新をチェックする関数
export async function updateContent(
	driver: ThenableWebDriver,
	originalText: string,
	newText: string
) {
	await checkModalInitialDisplay(driver, originalText);
	await clickElement(driver, getModalItemXpath("answer"));
	await setInputField(driver, By.id("update_title"), newText);
	await setInputField(
		driver,
		By.id("update_description"),
		newText + "textarea"
	);
	await clickElement(driver, getModalItemXpath("update"));
	// 成功の確認
	const successToast = await getElement(driver, getToastXpath("success"));
	expect(await successToast.getText()).toContain("更新に成功しました。");
}

// 内容の削除をチェックする関数
export async function deleteContent(
	driver: ThenableWebDriver,
	textToDelete: string
) {
	await checkModalInitialDisplay(driver, textToDelete);
	await clickElement(driver, getModalItemXpath("delete"));
	// 成功の確認
	const successToast = await getElement(driver, getToastXpath("warning"));
	expect(await successToast.getText()).toContain("削除に成功しました。");
}
