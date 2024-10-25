
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
    async checkHeader(name: string): Promise<boolean> {
        await this.confirmHeader.waitFor({ state: 'visible' });
        const text = await this.confirmHeader.textContent();
        console.log(text);
        if (text === `${name}, dziękujemy za rejestrację!`) {
            return true;
        } else {
            return false;
        }
    }
    async checkParagraph(email: string): Promise<boolean> {
        await this.confirmParagraf.waitFor({ state: 'visible' });
        const text = await this.confirmParagraf.textContent();
        console.log(text);

        if (text === `Na Twój adres email ${email} wysłaliśmy wiadomość z linkiem aktywującym konto`) {
            return true;
        } else {
            return false;
        }
    }

}
