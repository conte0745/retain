import { Builder, By, ThenableWebDriver, until } from "selenium-webdriver";

describe("Vocabularyページのテスト", () => {
	let baseUrl: string;
	let driver: ThenableWebDriver;

	// テスト前のセットアップ
	beforeAll(async () => {
		// WebDriverのセットアップ
		driver = new Builder().forBrowser("chrome").build();
		baseUrl = "http://localhost:3000";
	});

	// テスト後のクリーンアップ
	afterAll(async () => {
		// WebDriverを終了する
		await driver.quit();
	});

	it("titleが予期されているものかどうかのテスト", async () => {
		await driver.get(`${baseUrl}/vocabulary`);

		// タイトルが反映されるのを待つ
		await driver.wait(until.titleContains("RetainTutor"), 5000);

		// 実際のタイトルを取得
		const title = await driver.getTitle();

		// 期待されるタイトルと実際のタイトルを比較
		expect(title).toBe("RetainTutor");
	});

	it("vocabularyの入力欄の必須入力チェック", async () => {
		await driver.get(`${baseUrl}/vocabulary`);

		// 追加ボタンを取得するまで待機
		const submitButton = await driver.wait(
			until.elementLocated(By.className("vocabulary-submit")),
			10000
		);
		submitButton.click();

		const errorMessage = await driver.wait(
			until.elementLocated(By.className("error")),
			20000
		);

		// 期待されるタイトルと実際のタイトルを比較
		expect(await errorMessage.getText()).toBe("必須項目です。");
	});

	it("vocabularyの入力欄の成功チェック", async () => {
		await driver.get(`${baseUrl}/vocabulary`);

		// 入力欄を取得するまで待機
		const input = await driver.wait(
			until.elementLocated(By.id("title")),
			10000
		);
		await input.sendKeys("");

		// 追加ボタンを取得するまで待機
		const submitButton = await driver.wait(
			until.elementLocated(By.className("vocabulary-submit")),
			20000
		);
		await submitButton.click();

		const toast = await driver.wait(
			until.elementLocated(By.className("chakra-toast")),
			30000
		);

		// 期待されるタイトルと実際のタイトルを比較
		expect(await toast.getText()).toBe("追加に成功しました。");
	});

	it("vocabularyの入力欄の禁止ワードチェック", async () => {
		await driver.get(`${baseUrl}/vocabulary`);

		// 入力欄を取得するまで待機
		const input = await driver.wait(
			until.elementLocated(By.id("title")),
			10000
		);
		await input.sendKeys("殺人");

		// 追加ボタンを取得するまで待機
		const submitButton = await driver.wait(
			until.elementLocated(By.className("vocabulary-submit")),
			10000
		);
		await submitButton.click();

		const toast = await driver.wait(
			until.elementLocated(By.className("chakra-toast")),
			30000
		);

		// 期待されるタイトルと実際のタイトルを比較
		expect(await toast.getText()).toBe("使用できない単語が含まれています。");
	});
});
