import BasePage from "./basePage.po";
import { Locator, Page } from "@playwright/test";

export class RegistrationPagePo extends BasePage {
    public readonly name: Locator;
    public readonly lastName: Locator;
    public readonly email: Locator;
    public readonly password: Locator;
    public readonly repeatPassword: Locator;
    public readonly dateOfBirth: Locator;
    public readonly language: Locator;
    public readonly phoneNumber: Locator;
    public readonly checkbox1: Locator;
    public readonly checkbox2: Locator;
    public readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.name = page.locator("body > div > div > div > div > div > form > span:nth-child(1) > label > input");
        this.lastName = page.locator("body > div > div > div > div > div > form > span:nth-child(2) > label > input");
        this.email = page.locator("body > div > div > div > div > div > form > span:nth-child(3) > label > input");
        this.password = page.locator("body > div > div > div > div > div > form > span:nth-child(4) > label > input");
        this.repeatPassword = page.locator("body > div > div > div > div > div > form > span:nth-child(5) > label > input");
        this.dateOfBirth = page.locator("body > div > div > div > div > div > form > span:nth-child(6) > label > input");
        this.language = page.locator("body > div > div > div > div > div > form > span:nth-child(7) > label > input");
        this.phoneNumber = page.locator("body > div > div > div > div > div > form > span:nth-child(8) > label > input");
        this.checkbox1 = page.locator("body > div > div > div > div > div > form > span:nth-child(9) > label > input");
        this.checkbox2 = page.locator("body > div > div > div > div > div > form > span:nth-child(10) > label > input");
        this.submitButton = page.locator('button[type="submit"]');
    }

    async fillNameInput(value: string) {
        await this.name.waitFor({ state: 'visible' });
        await this.name.fill(value);
    }

    async fillLastNameInput(value: string) {
        await this.lastName.waitFor({ state: 'visible' });
        await this.lastName.fill(value);
    }

    async fillEmailInput(value: string) {
        await this.email.waitFor({ state: 'visible' });
        await this.email.fill(value);
    }

    async fillPasswordInput(value: string) {
        await this.password.waitFor({ state: 'visible' });
        await this.password.fill(value);
    }

    async fillRepeatPasswordInput(value: string) {
        await this.repeatPassword.waitFor({ state: 'visible' });
        await this.repeatPassword.fill(value);
    }

    // async fillDateOfBirthInput(value: string) {
    //     await this.dateOfBirth.waitFor({ state: 'visible' });
    //     await this.dateOfBirth.fill(value);
    // }

    // async selectLanguage(value: string) {
    //     await this.language.waitFor({ state: 'visible' });
    //     await this.language.selectOption(value);
    // }

    async fillPhoneNumberInput(value: string) {
        await this.phoneNumber.waitFor({ state: 'visible' });
        await this.phoneNumber.fill(value);
    }

    async checkCheckbox1() {
        await this.checkbox1.check();
    }

    async checkCheckbox2() {
        await this.checkbox2.check();
    }

    async clickSubmitButton() {
        await this.submitButton.waitFor({ state: 'visible' });
        await this.submitButton.click();
    }
}
