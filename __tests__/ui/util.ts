import {
	Browser,
	Builder,
	By,
	Locator,
	logging,
	ThenableWebDriver,
	until,
	WebElement,
} from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

/** 共通定数 */
export const BASE_URL = "http://localhost:3000";
export const TIMEOUT = 100000;

/** Authenticate定数 */
export const TEST_EMAIL = "sample@sample.com";
export const TEST_WEAK_WEAK_PASSWORD = "pass";
export const TEST_WEAK_PASSWORD = "passWord";
export const TEST_STRONG_PASSWORD = "paSS&word?q=10";
export const TEST_DISPLAY_NAME = "con";

/** Vocabulary定数 */
export const SAMPLE_VOCABULARY = "sample test";
export const SAMPLE_VOCABULARY_EDIT = "sample test 123";

/**
 * Vocabulary | Modal の 要素 を取得する
 * @param item
 * @returns
 */
export function getModalItemXpath(
	item: "update" | "delete" | "answer" | "title" | "description"
) {
	switch (item) {
		case "update":
			return By.xpath("//button[contains(text(),'更新')]");
		case "delete":
			return By.xpath("//button[contains(text(),'削除')]");
		case "answer":
			return By.xpath("//button[contains(text(),'答え')]");
		case "title":
			return By.xpath("//input[@id='update_title']");
		case "description":
			return By.xpath("//textarea[@id='update_description']");
		default:
			return By.xpath("");
	}
}

/**
 *  toast の要素を取得する
 * @param status
 * @returns
 */
export function getToastXpath(
	status: "success" | "warning" | "error" | "info"
) {
	return By.xpath(
		"//div[contains(@class, 'chakra-alert') and contains(@data-status, '" +
			status +
			"')]"
	);
}

/**
 * Vocabulary | 要素の Xpath を取得する
 * @param part
 * @param index number
 * @returns
 */
export function getVocabulariesXpath(
	part: "index" | "title" | "editBtn",
	index: number | null
) {
	if ((part === "index" || part === "title") && index === null)
		return By.xpath(
			"//td[contains(@class, 'vocabularies') and contains(@class, '" +
				part +
				"')]"
		);
	else if ((part === "index" || part === "title") && index !== null)
		return By.xpath(
			"//td[contains(@class, 'vocabularies[" +
				index.toString() +
				"]." +
				part +
				"')]"
		);
	else if (part === "editBtn" && index !== null) {
		return By.xpath(
			"//button[contains(@class, 'vocabularies[" +
				index.toString() +
				"]." +
				part +
				"')]"
		);
	} else {
		return By.xpath("");
	}
}

export async function sleep(time: number) {
	await new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * Selenium Driver の作成とオプションの設定を行う。
 * @returns
 */
export function setupDriver() {
	const driver = new Builder()
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
	return driver;
}

/**
 * 要素中のテキストを取得する
 * @param element
 * @returns
 */
export async function getText(element: WebElement) {
	return await element.getText();
}

/**
 * 要素に文字列を入力する
 * @param element
 * @param keys
 */
export async function sendKeysToElement(element: WebElement, keys: string) {
	await element.sendKeys(keys);
}

/**
 * 要素を取得する
 * @param driver
 * @param locator
 * @returns
 */
export function getElement(driver: ThenableWebDriver, locator: Locator) {
	return driver.wait(until.elementLocated(locator), 10000);
}

/**
 * ログを取得する
 * @param driver
 * @returns
 */
export function getBrowserLogs(driver: ThenableWebDriver) {
	return driver.manage().logs().get(logging.Type.BROWSER);
}

/**
 * ログを表示する
 * @param logs
 */
export function displayLogs(logs: logging.Entry[]) {
	logs.forEach((log) => console.info(`[${log.level.name}] ${log.message}`));
}

/**
 * ハンバーガーメニューから画面遷移を行う。
 * @param driver
 * @param BASE_URL
 * @param linkText
 */
export async function navigateAndPrepare(
	driver: ThenableWebDriver,
	BASE_URL: string,
	linkText: string
) {
	await sleep(2000);
	await driver.get(`${BASE_URL}/`);
	await sleep(2000);
	await clickElement(
		driver,
		By.xpath("//button[contains(@class, 'chakra-menu')]")
	);
	await clickElement(driver, By.linkText(linkText));
}

/**
 * ランダムな文字列の作成を行う
 * @param length
 * @returns
 */
export function generateRandomString(length: number): string {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

/**
 * ページの一番下までスクロールする
 * @param driver
 */
export async function scrollToBottom(driver: ThenableWebDriver) {
	await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
}

/**
 * 要素を取得後、クリックする
 * @param driver
 * @param locator
 */
export async function clickElement(
	driver: ThenableWebDriver,
	locator: Locator
) {
	const element = await driver.wait(until.elementLocated(locator), 10000);
	await element.click();
}
