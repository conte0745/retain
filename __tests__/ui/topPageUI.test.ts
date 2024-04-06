import { Builder, By, ThenableWebDriver, until } from "selenium-webdriver";

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

	it("titleが予期されているものと一致するかどうかのテスト", async () => {
		await driver.get(baseUrl);

		// タイトルが反映されるのを待つ
		await driver.wait(until.titleContains("RetainTutor"), 5000);

		// 実際のタイトルを取得
		const title = await driver.getTitle();

		// 期待されるタイトルと実際のタイトルを比較
		expect(title).toBe("RetainTutor");
	});

	it("同一ドメインのリンクが正常に動作するかのテスト", async () => {
		await driver.get(baseUrl);

		const linkInfo = [
			{ text: "Question", url: "/question" },
			{ text: "Drill", url: "/drill" },
			{ text: "Vocabulary", url: "/vocabulary" },
		];

		const linkItems = await driver.findElements(
			By.className("top-page-link-list-item")
		);

		// リンクを順番に検証する
		for (let idx = 0; idx < linkItems.length; idx++) {
			const linkItem = linkItems[idx];
			const linkInfoItem = linkInfo[idx];

			await linkItem.click();

			// URLが正しいかどうかを検証
			let currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe(baseUrl + linkInfoItem.url);

			// 戻るボタンをクリックして元のページに戻る
			await driver.navigate().back();

			// 再度URLが正しいかどうかを検証
			currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe(baseUrl);
		}
	});

	it("外部ドメインのリンクが正常に動作するかのテスト", async () => {
		await driver.get(baseUrl);

		const githubUrl = "https://github.com/conte0745/retain";

		// powered by テキストが含まれることを確認
		const linkTextItem = await driver.wait(
			until.elementLocated(By.id("powered-by-author"))
		);
		const linkText = await linkTextItem.getText();
		expect(linkText).toContain("powered by");

		// リンクを検証する
		const linkItem = await driver.wait(
			until.elementLocated(By.id("powered-by-author-link"))
		);
		await linkItem.click();

		// 新しいタブが開かれるのを待つ
		await driver.wait(async () => {
			const handles = await driver.getAllWindowHandles();
			return handles.length === 2;
		}, 5000);

		// 新しいタブに切り替える
		const handles = await driver.getAllWindowHandles();
		const newTabHandle = handles[1];
		await driver.switchTo().window(newTabHandle);

		// URLが正しいかどうかを検証
		const currentUrl = await driver.getCurrentUrl();
		expect(currentUrl).toBe(githubUrl);
	});
});
