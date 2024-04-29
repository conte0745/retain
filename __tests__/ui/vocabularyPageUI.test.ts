import {
	Browser,
	Builder,
	logging,
	By,
	until,
	ThenableWebDriver,
} from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

describe("Vocabularyページのテスト", () => {
	let baseUrl: string;
	let driver: ThenableWebDriver;
	let logs: logging.Entry[];
	const timeout = 100000;
	const testValue = "sample test";
	const testValueEdited = "sample test 22222";

	beforeAll(async () => {
		baseUrl = "http://localhost:3000";

		driver = new Builder()
			.forBrowser(Browser.CHROME)
			.setChromeOptions(
				new Options()
					.addArguments("--disable-background-networking")
					.addArguments("--disable-extensions")
					.addArguments("--disable-features=Translate")
			)
			.build();

		logging.installConsoleHandler();
		logging.getLogger("webdriver.http").setLevel(logging.Level.INFO);
		logs = await driver.manage().logs().get(logging.Type.BROWSER);
	});

	beforeEach(async () => {
		await driver.get(`${baseUrl}/vocabulary`);
		await sleep(2000);
	}, timeout);

	afterEach(async () => {
		// ログを取得
		const logs = await driver.manage().logs().get(logging.Type.BROWSER);
		logs.forEach((log) => {
			console.info(`[${log.level.name}] ${log.message}`);
		});
	});

	afterAll(async () => {
		await driver.quit();
	});

	describe("タイトル", () => {
		it("titleが予期されているものかどうかのテスト", async () => {
			await driver.wait(until.titleContains("RetainTutor"), 5000);

			const title = await driver.getTitle();

			expect(title).toBe("RetainTutor");
		});
	});

	describe("新規入力", () => {
		it(
			"vocabularyの入力欄の必須入力チェック",
			async () => {
				const submitButton = await driver.wait(
					until.elementLocated(By.className("vocabulary-submit")),
					10000
				);
				submitButton.click();

				const errorMessage = await driver.wait(
					until.elementLocated(By.className("error")),
					20000
				);

				expect(await errorMessage.getText()).toBe("必須項目です。");
			},
			timeout
		);

		it(
			"vocabularyの入力欄の禁止ワードチェック",
			async () => {
				const NG = "殺人";

				const input = await driver.wait(
					until.elementLocated(By.id("title")),
					10000
				);
				await input.sendKeys(NG);

				const submitButton = await driver.wait(
					until.elementLocated(By.className("vocabulary-submit")),
					10000
				);
				await submitButton.click();

				const toast = await driver.wait(
					until.elementLocated(By.xpath(getToastXpath("error"))),
					30000
				);

				const vocabulariesTitles = await driver.findElements(
					By.xpath(getVocabulariesXpath("title", null))
				);

				let found = false;
				for (const titleElement of vocabulariesTitles) {
					const title = await titleElement.getText();
					if (title.includes(NG)) {
						found = true;
						break;
					}
				}
				expect(found).toBe(false);

				expect(await toast.getText()).toContain(
					"使用できない単語が含まれています"
				);
			},
			timeout
		);

		it(
			"vocabularyの入力後に反映されるかチェック",
			async () => {
				const input = await driver.wait(
					until.elementLocated(By.id("title")),
					10000
				);

				await input.sendKeys(testValue);

				const submitButton = await driver.wait(
					until.elementLocated(By.className("vocabulary-submit")),
					10000
				);
				await submitButton.click();

				const toast = await driver.wait(
					until.elementLocated(By.xpath(getToastXpath("success"))),
					30000
				);
				expect(await toast.getText()).toContain("追加に成功しました");

				// 他の要素が表示されるまで待機する
				await driver.wait(
					until.elementLocated(By.xpath(getVocabulariesXpath("title", null))),
					10000
				);

				await sleep(2000);

				const vocabulariesTitles = await driver.findElements(
					By.xpath(getVocabulariesXpath("title", null))
				);

				let found = false;
				for (const titleElement of vocabulariesTitles) {
					const title = await titleElement.getText();
					if (title.includes(testValue)) {
						found = true;
						break;
					}
				}
				expect(found).toBe(true);
			},
			timeout
		);
	});

	describe("詳細画面", () => {
		it(
			"vocabularyのモーダル画面の初期表示のチェック",
			async () => {
				// 他の要素が表示されるまで待機する
				await driver.wait(
					until.elementLocated(By.xpath(getVocabulariesXpath("title", null))),
					10000
				);

				const vocabularies = await driver.findElements(
					By.xpath(getVocabulariesXpath("title", null))
				);

				await sleep(2000);

				const tmpIndex = await Promise.all(
					vocabularies.map(async (v, i) => {
						return (await v.getText()) === testValue ? i : undefined;
					})
				);
				const index = tmpIndex.findIndex((i) => i !== undefined);

				expect(index).not.toBe(-1);

				const vocabularyEditBtn = await driver.findElement(
					By.xpath(getVocabulariesXpath("editBtn", index + 1))
				);
				await vocabularyEditBtn.click();

				// 用語の input 要素を検索
				const title = await driver.findElement(
					By.xpath(getModalItemXpath("用語"))
				);

				// 答えの button 要素を検索
				const disableDescriptionButton = await driver.findElement(
					By.xpath(getModalItemXpath("答え"))
				);

				// 説明の textarea 要素を検索
				const description = await driver.findElement(
					By.xpath(getModalItemXpath("説明"))
				);

				// 更新ボタン
				const updateButton = await driver.findElement(
					By.xpath(getModalItemXpath("更新"))
				);

				expect(await title.getAttribute("value")).toBe(testValue);
				expect(await description.getAttribute("value")).toBe("内緒");

				disableDescriptionButton.click();

				expect(await description.getAttribute("value")).toBe("未作成");
			},
			timeout
		);

		it(
			"vocabularyの更新ができるかのチェック",
			async () => {
				// 他の要素が表示されるまで待機する
				await driver.wait(
					until.elementLocated(By.xpath(getVocabulariesXpath("title", null))),
					10000
				);

				const vocabularies = await driver.findElements(
					By.xpath(getVocabulariesXpath("title", null))
				);

				const tmpIndex = await Promise.all(
					vocabularies.map(async (v, i) => {
						return (await v.getText()) === testValue ? i : undefined;
					})
				);
				const index = tmpIndex.findIndex((i) => i !== undefined);

				expect(index).not.toBe(-1);

				const vocabularyEditBtn = await driver.findElement(
					By.xpath(getVocabulariesXpath("editBtn", index + 1))
				);
				await vocabularyEditBtn.click();

				// 用語の input 要素を検索
				const title = await driver.findElement(
					By.xpath(getModalItemXpath("用語"))
				);

				// 答えの button 要素を検索
				const disableDescriptionButton = await driver.findElement(
					By.xpath(getModalItemXpath("答え"))
				);

				// 説明の textarea 要素を検索
				const description = await driver.findElement(
					By.xpath(getModalItemXpath("説明"))
				);

				// 更新ボタン
				const updateButton = await driver.findElement(
					By.xpath(getModalItemXpath("更新"))
				);

				disableDescriptionButton.click();

				title.clear();
				description.clear();
				title.sendKeys(testValueEdited);
				description.sendKeys(testValueEdited);

				await sleep(2000);
				updateButton.click();

				const tmpIndex_ = await Promise.all(
					vocabularies.map(async (v, i) => {
						return (await v.getText()) === testValue ? i : undefined;
					})
				);
				const index_ = tmpIndex_.findIndex((i) => i !== undefined);

				expect(index_).not.toBe(-1);

				const toast = await driver.wait(
					until.elementLocated(By.xpath(getToastXpath("success"))),
					30000
				);
				expect(await toast.getText()).toContain("更新に成功しました");
			},
			timeout
		);

		it(
			"vocabularyの削除ができるかのチェック",
			async () => {
				// 他の要素が表示されるまで待機する
				await driver.wait(
					until.elementLocated(By.xpath(getVocabulariesXpath("title", null))),
					10000
				);

				const vocabularies = await driver.findElements(
					By.xpath(getVocabulariesXpath("title", null))
				);

				const tmpIndex = await Promise.all(
					vocabularies.map(async (v, i) => {
						return (await v.getText()) === testValueEdited ? i : undefined;
					})
				);
				const index = tmpIndex.findIndex((i) => i !== undefined);

				expect(index).not.toBe(-1);

				const vocabularyEditBtn = await driver.findElement(
					By.xpath(getVocabulariesXpath("editBtn", index + 1))
				);
				await vocabularyEditBtn.click();

				// 用語の input 要素を検索
				const title = await driver.findElement(
					By.xpath(getModalItemXpath("用語"))
				);

				// 削除ボタン
				const deleteButton = await driver.findElement(
					By.xpath(getModalItemXpath("削除"))
				);

				expect(await title.getAttribute("value")).toBe(testValueEdited);

				deleteButton.click();
				await sleep(2000);

				const toast = await driver.wait(
					until.elementLocated(By.xpath(getToastXpath("warning"))),
					30000
				);
				expect(await toast.getText()).toContain("削除に成功しました");
			},
			timeout
		);
	});
});

function getModalItemXpath(item: string) {
	if (item === "更新") {
		return "//button[contains(text(),'更新')]";
	} else if (item === "削除") {
		return "//button[contains(text(),'削除')]";
	} else if (item === "答え") {
		return "//button[contains(text(),'答え')]";
	} else if (item === "用語") {
		return "//input[@id='update_title']";
	} else if (item === "説明") {
		return "//textarea[@id='update_description']";
	} else {
		return "";
	}
}

function getToastXpath(status: string) {
	return (
		"//div[contains(@class, 'chakra-alert') and contains(@data-status, '" +
		status +
		"')]"
	);
}

function getVocabulariesXpath(part: string, index: number | null) {
	if ((part === "index" || part === "title") && index === null)
		return (
			"//td[contains(@class, 'vocabularies') and contains(@class, '" +
			part +
			"')]"
		);
	else if ((part === "index" || part === "title") && index !== null)
		return (
			"//td[contains(@class, 'vocabularies[" +
			index.toString() +
			"]." +
			part +
			"')]"
		);
	else if (part === "editBtn" && index !== null) {
		return (
			"//button[contains(@class, 'vocabularies[" +
			index.toString() +
			"]." +
			part +
			"')]"
		);
	} else {
		return "";
	}
}

async function sleep(time: number) {
	await new Promise((resolve) => setTimeout(resolve, time));
}
