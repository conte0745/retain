import { Builder, By, ThenableWebDriver, until } from "selenium-webdriver";

describe("Vocabularyページのテスト", () => {
	let baseUrl: string;
	let driver: ThenableWebDriver;

	beforeAll(async () => {
		driver = new Builder().forBrowser("chrome").build();
		baseUrl = "http://localhost:3000";
	});

	afterAll(async () => {
		await driver.quit();
	});

	it("titleが予期されているものかどうかのテスト", async () => {
		await driver.get(`${baseUrl}/vocabulary`);

		await driver.wait(until.titleContains("RetainTutor"), 5000);

		const title = await driver.getTitle();

		expect(title).toBe("RetainTutor");
	});

	it("vocabularyの入力欄の必須入力チェック", async () => {
		await driver.get(`${baseUrl}/vocabulary`);

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
	});

	it("vocabularyの入力欄の禁止ワードチェック", async () => {
		await driver.get(`${baseUrl}/vocabulary`);

		const input = await driver.wait(
			until.elementLocated(By.id("title")),
			10000
		);
		await input.sendKeys("殺人");

		const submitButton = await driver.wait(
			until.elementLocated(By.className("vocabulary-submit")),
			10000
		);
		await submitButton.click();

		const toast = await driver.wait(
			until.elementLocated(By.className("chakra-toast")),
			30000
		);

		// expect(await toast.getText()).toBe("使用できない単語が含まれています。");
	});

	it("vocabularyの入力後に反映されるかチェック", async () => {
		await driver.get(`${baseUrl}/vocabulary`);

		const input = await driver.wait(
			until.elementLocated(By.id("title")),
			10000
		);

		await input.sendKeys("sampleTest");

		const submitButton = await driver.wait(
			until.elementLocated(By.className("vocabulary-submit")),
			10000
		);
		await submitButton.click();

		const toast = await driver.wait(
			until.elementLocated(By.className("chakra-toast")),
			30000
		);

		// expect(await toast.getText()).toBe("追加に成功しました。");

		const vocabulariesTitles = await driver.findElements(
			By.className("vocabularies.title")
		);

		let found = false;
		for (const titleElement of vocabulariesTitles) {
			const title = await titleElement.getText();
			if (title === "sampleTest") {
				found = true;
				break;
			}
		}
		expect(found).toBe(true);
	});
});
