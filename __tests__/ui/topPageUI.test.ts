import { Builder, By, ThenableWebDriver, until } from "selenium-webdriver";

describe("トップページのテスト", () => {
	let baseUrl: string;
	let driver: ThenableWebDriver;

	beforeAll(async () => {
		driver = new Builder().forBrowser("chrome").build();
		baseUrl = "http://localhost:3000";
	});

	afterAll(async () => {
		await driver.quit();
	});

	it("titleが予期されているものと一致するかどうかのテスト", async () => {
		await driver.get(baseUrl);
		await driver.wait(until.titleContains("RetainTutor"), 5000);

		const title = await driver.getTitle();

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
		for (let idx = 0; idx < linkItems.length; idx++) {
			const linkItem = linkItems[idx];
			const linkInfoItem = linkInfo[idx];

			await linkItem.click();

			let currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe(baseUrl + linkInfoItem.url);

			await driver.navigate().back();

			currentUrl = await driver.getCurrentUrl();
			expect(currentUrl).toBe(baseUrl);
		}
	});

	it("外部ドメインのリンクが正常に動作するかのテスト", async () => {
		await driver.get(baseUrl);

		const githubUrl = "https://github.com/conte0745/retain";

		const linkTextItem = await driver.wait(
			until.elementLocated(By.id("powered-by-author"))
		);
		const linkText = await linkTextItem.getText();
		expect(linkText).toContain("powered by");

		const linkItem = await driver.wait(
			until.elementLocated(By.id("powered-by-author-link"))
		);
		await linkItem.click();

		await driver.wait(async () => {
			const handles = await driver.getAllWindowHandles();
			return handles.length === 2;
		}, 5000);
		const handles = await driver.getAllWindowHandles();
		const newTabHandle = handles[1];
		await driver.switchTo().window(newTabHandle);

		const currentUrl = await driver.getCurrentUrl();
		expect(currentUrl).toBe(githubUrl);
	});
});
