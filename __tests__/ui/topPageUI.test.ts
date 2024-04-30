import { By, logging, ThenableWebDriver, until } from "selenium-webdriver";
import { displayLogs, getBrowserLogs, setupDriver } from "./util";

const BASE_URL = "http://localhost:3000";
const TIMEOUT = 100000;

describe("トップページのテスト", () => {
	let driver: ThenableWebDriver;
	let logs: logging.Entry[];

	beforeAll(async () => {
		driver = setupDriver();
		logs = await getBrowserLogs(driver);
	});

	afterAll(async () => {
		await driver.quit();
		displayLogs(logs);
	});

	it(
		"titleが予期されているものと一致するかどうかのテスト",
		async () => {
			await driver.get(BASE_URL);
			await driver.wait(until.titleContains("RetainTutor"), 5000);
			const title = await driver.getTitle();
			expect(title).toBe("RetainTutor");
		},
		TIMEOUT
	);

	it(
		"同一ドメインのリンクが正常に動作するかのテスト",
		async () => {
			await checkLinkNavigation(driver, BASE_URL, [
				{ text: "Question", url: "/question" },
				{ text: "Drill", url: "/drill" },
				{ text: "Vocabulary", url: "/vocabulary" },
			]);
		},
		TIMEOUT
	);

	it(
		"外部ドメインのリンクが正常に動作するかのテスト",
		async () => {
			await driver.get(BASE_URL);
			const githubUrl = "https://github.com/conte0745/retain";
			await clickLinkById(driver, "powered-by-author-link");
			const currentUrl = await checkNewTabUrl(driver);
			expect(currentUrl).toBe(githubUrl);
		},
		TIMEOUT
	);
});

async function checkLinkNavigation(
	driver: ThenableWebDriver,
	baseUrl: string,
	links: { text: string; url: string }[]
) {
	for (const link of links) {
		await driver.get(baseUrl);
		const linkElement = await driver.findElement(By.linkText(link.text));
		await linkElement.click();
		const currentUrl = await driver.getCurrentUrl();
		expect(currentUrl).toBe(baseUrl + link.url);
		await driver.navigate().back();
	}
}

async function clickLinkById(driver: ThenableWebDriver, id: string) {
	const link = await driver.wait(until.elementLocated(By.id(id)), 5000);
	await link.click();
}

async function checkNewTabUrl(driver: ThenableWebDriver) {
	await driver.wait(async () => {
		const handles = await driver.getAllWindowHandles();
		return handles.length === 2;
	}, 5000);
	const handles = await driver.getAllWindowHandles();
	await driver.switchTo().window(handles[1]);
	return await driver.getCurrentUrl();
}
