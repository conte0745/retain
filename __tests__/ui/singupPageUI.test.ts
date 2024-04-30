import { logging, By, ThenableWebDriver } from "selenium-webdriver";
import {
	getToastXpath,
	sleep,
	setupDriver,
	getBrowserLogs,
	displayLogs,
	sendKeysToElement,
	getElement,
	navigateAndPrepare,
} from "./util";

const BASE_URL = "http://localhost:3000";
const TIMEOUT = 100000;
const TEST_EMAIL = "sample@sample.com";
const TEST_WEAK_PASSWORD = "password";
const TEST_WEAK_WEAK_PASSWORD = "pass";
const TEST_STRONG_PASSWORD = "paSS&word?q=10";
const TEST_DISPLAY_NAME = "pon";

describe("認証ページのテスト(サインアップ)", () => {
	let driver: ThenableWebDriver;
	let logs: logging.Entry[];

	beforeAll(async () => {
		driver = setupDriver();
		logs = await getBrowserLogs(driver);
	});

	beforeEach(async () => {
		await navigateAndPrepare(driver, BASE_URL, "サインアップ");
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
				const header = await getElement(driver, By.id("signup-heading"));
				expect(await header.getText()).toContain("サインアップ");

				const headerCenter = await getElement(driver, By.id("header-center"));
				expect(await headerCenter.getText()).toContain("SIGNUP");

				const [emailInput, passwordInput, displayNameInput] = await Promise.all(
					[
						getElement(
							driver,
							By.xpath("//form[@id='signup-form']/div[1]/input")
						),
						getElement(
							driver,
							By.xpath("//form[@id='signup-form']/div[2]/input")
						),
						getElement(
							driver,
							By.xpath("//form[@id='signup-form']/div[3]/input")
						),
					]
				);

				await sleep(2000);

				expect(await emailInput.getAttribute("value")).toBe("");
				expect(await passwordInput.getAttribute("value")).toBe("");
				expect(await displayNameInput.getAttribute("value")).toBe("");
			},
			TIMEOUT
		);
	});

	describe("入力テスト", () => {
		it(
			"サインアップできないの時にエラーを表示するテスト",
			async () => {
				const [emailInput, passwordInput, displayNameInput, submitButton] =
					await Promise.all([
						getElement(
							driver,
							By.xpath("//form[@id='signup-form']/div[1]/input")
						),
						getElement(
							driver,
							By.xpath("//form[@id='signup-form']/div[2]/input")
						),
						getElement(
							driver,
							By.xpath("//form[@id='signup-form']/div[3]/input")
						),
						getElement(driver, By.id("signup-button")),
					]);

				await sendKeysToElement(emailInput, TEST_EMAIL);
				await sendKeysToElement(passwordInput, TEST_WEAK_PASSWORD);
				await sendKeysToElement(displayNameInput, TEST_DISPLAY_NAME);

				await submitButton.click();

				const errorMessage1 = await getElement(
					driver,
					By.className("signup-password-errors")
				);
				expect(await errorMessage1.getText()).toBe(
					"大文字・小文字・英数字・特殊文字を少なくとも1つ以上含めてください。"
				);

				passwordInput.clear();
				await sendKeysToElement(passwordInput, TEST_WEAK_WEAK_PASSWORD);
				await submitButton.click();

				const errorMessage2 = await getElement(
					driver,
					By.className("signup-password-errors")
				);
				expect(await errorMessage2.getText()).toBe(
					"少なくとも8文字以上入力してください。"
				);
			},
			TIMEOUT
		);

		it(
			"サインアップできた時のテスト",
			async () => {
				const [emailInput, passwordInput, displayNameInput, submitButton] =
					await Promise.all([
						getElement(
							driver,
							By.xpath("//form[@id='signup-form']/div[1]/input")
						),
						getElement(
							driver,
							By.xpath("//form[@id='signup-form']/div[2]/input")
						),
						getElement(
							driver,
							By.xpath("//form[@id='signup-form']/div[3]/input")
						),
						getElement(driver, By.id("signup-button")),
					]);

				// const randomString = generateRandomString(8) + "_";
				await sendKeysToElement(emailInput, TEST_EMAIL);
				await sendKeysToElement(passwordInput, TEST_STRONG_PASSWORD);
				await sendKeysToElement(displayNameInput, TEST_DISPLAY_NAME);

				await submitButton.click();

				const toast = await getElement(driver, getToastXpath("success"));
				expect(await toast.getText()).toContain("サインアップしました。");
			},
			TIMEOUT
		);
	});
});
