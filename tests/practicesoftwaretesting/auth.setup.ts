import { test as setup, expect } from "@playwright/test"
import dotenv from "dotenv"

setup("auth setup", async ({ page, context }) => {
    dotenv.config();
    const email = "customer@practicesoftwaretesting.com";
    const password = "welcome01";
    const customer01AuthFile = ".auth/customer1.json";

    await page.goto(String(process.env.AUTH_BASE_URL));
    await page.locator('[data-test="email"]').fill(email);
    await page.locator('[data-test="password"]').fill(password);
    await page.locator('[data-test="login-submit"]').click();

    await expect(page.locator('[data-test="nav-menu"]')).toContainText("Jane Doe");
    await context.storageState({path: customer01AuthFile});
});
