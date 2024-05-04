import { logging, By, ThenableWebDriver } from "selenium-webdriver";
import {
	getToastXpath,
	sleep,
	setupDriver,
	getText,
	sendKeysToElement,
	getElement,
	getBrowserLogs,
	displayLogs,
	navigateAndPrepare,
	BASE_URL,
	TIMEOUT,
	TEST_EMAIL,
	TEST_WEAK_WEAK_PASSWORD,
	TEST_STRONG_PASSWORD,
} from "./util";

describe("認証ページのテスト(サインイン)", () => {
	let driver: ThenableWebDriver;
	let logs: logging.Entry[];

	beforeAll(async () => {
		driver = setupDriver();
		logs = await getBrowserLogs(driver);
	});

	beforeEach(async () => {
		await navigateAndPrepare(driver, BASE_URL, "サインイン");
	});

	afterEach(async () => {
		logs = await getBrowserLogs(driver);
		displayLogs(logs);
	});

	afterAll(async () => {
		await driver.quit();
	});

	describe("初期表示", () => {
		it(
			"ヘッダが予期されているものかどうかのテスト",
			async () => {
				const header = await getElement(driver, By.id("signin-heading"));
				expect(await getText(header)).toContain("サインイン");

				const headerCenter = await getElement(driver, By.id("header-center"));
				expect(await getText(headerCenter)).toContain("SIGNIN");

				const emailInput = await getElement(
					driver,
					By.xpath("//form[@id='signin-form']/div[1]/input")
				);
				const passwordInput = await getElement(
					driver,
					By.xpath("//form[@id='signin-form']/div[2]/input")
				);

				expect(await emailInput.getAttribute("value")).toBe("");
				expect(await passwordInput.getAttribute("value")).toBe("");
			},
			TIMEOUT
		);
	});

	describe("入力テスト", () => {
		it(
			"サインインできないの時にエラーを表示するテスト",
			async () => {
				const emailInput = await getElement(
					driver,
					By.xpath("//form[@id='signin-form']/div[1]/input")
				);
				const passwordInput = await getElement(
					driver,
					By.xpath("//form[@id='signin-form']/div[2]/input")
				);
				const submitButton = await getElement(driver, By.id("signin-button"));

				await sendKeysToElement(emailInput, TEST_EMAIL);
				await sendKeysToElement(passwordInput, TEST_WEAK_WEAK_PASSWORD);
				await submitButton.click();

				const toast = await getElement(driver, getToastXpath("error"));
				expect(await getText(toast)).toContain("ユーザが見つかりません。");

				await sleep(5000);
			},
			TIMEOUT
		);

		it(
			"サインインできた時のテスト",
			async () => {
				const emailInput = await getElement(
					driver,
					By.xpath("//form[@id='signin-form']/div[1]/input")
				);
				const passwordInput = await getElement(
					driver,
					By.xpath("//form[@id='signin-form']/div[2]/input")
				);
				const submitButton = await getElement(driver, By.id("signin-button"));

				await sendKeysToElement(emailInput, TEST_EMAIL);
				await sendKeysToElement(passwordInput, TEST_STRONG_PASSWORD);
				await submitButton.click();

				const toast = await getElement(driver, getToastXpath("success"));
				expect(await getText(toast)).toContain("サインインしました。");

				await sleep(5000);
			},
			TIMEOUT
		);
	});
});
