
import BasePage from "./basePage.po";
import { Locator, Page } from "@playwright/test";

export class ConfirmationPagePo extends BasePage {

    public readonly confirmHeader: Locator
    public readonly emailSpan: Locator
    public readonly confirmParagraf: Locator
    constructor(page: Page) {
        super(page);
        this.confirmHeader = this.page.getByRole('heading', {name: /.+, dziękujemy za rejestrację!$/,})
        this.confirmParagraf = this.confirmParagraf = this.page.locator('p:has(span.email)');
        this.emailSpan = this.page.locator(".email");
    }

}
