import { Builder, ThenableWebDriver, until } from "selenium-webdriver";

describe("トップページのテスト", () => {
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
		await driver.quit();
	});

	it("titleが予期されているものかどうかのテスト", async () => {
		await driver.get(baseUrl);

		// タイトルが反映されるのを待つ
		await driver.wait(until.titleContains("RetainTutor"), 5000);

		// 実際のタイトルを取得
		const title = await driver.getTitle();

		// 期待されるタイトルと実際のタイトルを比較
		expect(title).toBe("RetainTutor");
	});
});
