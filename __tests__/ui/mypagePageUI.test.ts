import { By, until, ThenableWebDriver, logging } from "selenium-webdriver";

import {
	setupDriver,
	getElement,
	navigateAndPrepare,
	sendKeysToElement,
	getToastXpath,
	getText,
	sleep,
	scrollToBottom,
	displayLogs,
	BASE_URL,
	TIMEOUT,
	TEST_EMAIL,
	TEST_STRONG_PASSWORD,
} from "./util";

describe("マイページのテスト", () => {
	let driver: ThenableWebDriver;
	let logs: logging.Entry[];

	beforeAll(async () => {
		driver = setupDriver();
	});

	beforeEach(async () => {
		// テスト用のユーザーでログインする
		await navigateAndPrepare(driver, BASE_URL, "サインイン");
		await signin(driver);
		await navigateAndPrepare(driver, BASE_URL, "マイページ");
		await sleep(2000);
	}, TIMEOUT);

	afterAll(async () => {
		await driver.quit();
		displayLogs(logs);
	});

	describe("ユーザー退会のテスト", () => {
		it(
			"退会処理が正常に動作するかのテスト",
			async () => {
				// ページの最下部までスクロールする
				await scrollToBottom(driver);

				// 退会ボタンをクリック
				const withdrawButton = await getElement(
					driver,
					By.id("withdraw-button")
				);
				await withdrawButton.click();

				// ダイアログに対する操作を待機
				await driver.wait(until.alertIsPresent(), 5000);

				// アラートを取得して操作
				const alert = await driver.switchTo().alert();
				expect(await alert.getText()).toBe(
					"ユーザを削除します。よろしいですか？"
				);

				await alert.accept();

				// 退会成功メッセージを検証
				const toast = await getElement(driver, getToastXpath("success"));
				expect(await getText(toast)).toContain("退会処理が完了しました。");

				await sleep(2000);

				// リダイレクトされることを検証
				const currentUrl = await driver.getCurrentUrl();
				expect(currentUrl).toContain("/");
			},
			TIMEOUT
		);
	});
});

/**
 * サインインを行う。
 * @param driver
 */
async function signin(driver: ThenableWebDriver) {
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
}
