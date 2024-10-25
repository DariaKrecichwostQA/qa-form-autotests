import type { Locator, Page } from '@playwright/test';

export default class BasePage {
    protected page: Page;

    readonly sharedLocator: Locator;

    constructor(page: Page) {
        this.page = page;
    }

    protected async navigateTo(path?: string): Promise<void> {
        if (path) {
            await this.page.goto(path);
            await this.page.goto(path);
        } else {
            await this.page.goto('/');
            await this.page.goto('/');
        }
    }

    sleep(x: number) {
        return new Promise(r => setTimeout(r, x));
    }

    async clearValue(selector: string) {
        await this.page.locator(selector).click();
        await this.page.keyboard.down('Control');
        await this.page.keyboard.press('a');
        await this.page.keyboard.press('x');
        await this.page.keyboard.up('Control');
    }
}