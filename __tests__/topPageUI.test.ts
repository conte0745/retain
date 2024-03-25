import { Builder, ThenableWebDriver, until } from "selenium-webdriver";

describe("Page Title Test", () => {
	it("should display the expected title", async () => {
		const driver: ThenableWebDriver = new Builder()
			.forBrowser("chrome")
			.build();
		try {
			await driver.get("http://localhost:3000"); // Next.jsアプリのURLに置き換える

			// タイトルが反映されるのを待つ
			await driver.wait(until.titleContains("QQQ"), 5000);

			// 実際のタイトルを取得
			const title = await driver.getTitle();

			// 期待されるタイトルと実際のタイトルを比較
			expect(title.includes("QQQ")).toBe(true);
		} finally {
			await driver.quit();
		}
	});
});
