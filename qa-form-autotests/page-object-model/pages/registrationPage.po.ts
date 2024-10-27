import BasePage from "./basePage.po";
import { Locator, Page } from "@playwright/test";

function getFormInput(selector: string, page: Page) {
    return {
        input: page.locator(selector),
        errorMessage: page.locator(selector + ' + .errors')
    }
}

export class RegistrationPagePo extends BasePage {
    public readonly nameInput: { readonly input: Locator, readonly errorMessage: Locator };
    public readonly lastNameInput: { readonly input: Locator, readonly errorMessage: Locator };
    public readonly emailInput: { readonly input: Locator, readonly errorMessage: Locator };
    public readonly passwordInput: { readonly input: Locator, readonly errorMessage: Locator };
    public readonly repeatPasswordInput: { readonly input: Locator, readonly errorMessage: Locator };
    public readonly dateOfBirthInput: { readonly input: Locator, readonly errorMessage: Locator };
    public readonly flag: Locator;
    public readonly language: Locator;
    public readonly phoneNumberInput: { readonly input: Locator, readonly errorMessage: Locator };
    public readonly checkbox1: Locator;
    public readonly checkbox2: Locator;
    public readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.nameInput = getFormInput("body > div > div > div > div > div > form > span:nth-child(1) > label > input", page);
        this.lastNameInput = getFormInput("body > div > div > div > div > div > form > span:nth-child(2) > label > input", page);
        this.emailInput = getFormInput("input[type='email']", page);
        this.passwordInput= getFormInput("body > div > div > div > div > div > form > span:nth-child(4) > label > input", page);
        this.repeatPasswordInput= getFormInput("body > div > div > div > div > div > form > span:nth-child(5) > label > input", page);
        this.dateOfBirthInput= {
            input: page.locator("input[name='date']"),
            errorMessage: page.locator('html > body > div > div > div > div > div > form > span:nth-of-type(6) > label > span')
        };
        this.language = page.locator("body > div > div > div > div > div > form > span:nth-child(7) > label > input");
        this.flag = page.locator('.phone-input.vue-tel-input[tabindex="0"]');
        this.flag = page.locator('.phone-input.vue-tel-input input');
        this.phoneNumberInput= {
            input: page.locator(".phone-input.vue-tel-input input"),
            errorMessage: page.locator(".phone-input.vue-tel-input + span.errors")
        };
        this.checkbox1 = page.locator('form div').filter({ hasText: 'Akceptuję regulamin oraz' }).locator('div')
        this.checkbox2 = page.locator('form div').filter({ hasText: 'Wyrażam zgodę na otrzymywanie' })
        this.submitButton = page.locator('button[type="submit"]');
    }

    async fillNameInput(value: string) {
        await this.nameInput.input.waitFor({ state: 'visible' });
        await this.nameInput.input.fill(value);
    }

    async fillLastNameInput(value: string) {
        await this.lastNameInput.input.waitFor({ state: 'visible' });
        await this.lastNameInput.input.fill(value);
    }

    async fillEmailInput(value: string) {
        await this.emailInput.input.waitFor({ state: 'visible' });
        await this.emailInput.input.fill(value);
    }

    async fillPasswordInput(value: string) {
        await this.passwordInput.input.waitFor({ state: 'visible' });
        await this.passwordInput.input.fill(value);
    }

    async fillRepeatPasswordInput(value: string) {
        await this.repeatPasswordInput.input.waitFor({ state: 'visible' });
        await this.repeatPasswordInput.input.fill(value);
    }

    async fillDateOfBirthInput(value: string) {
        await this.dateOfBirthInput.input.waitFor({ state: 'visible' });
        await this.dateOfBirthInput.input.fill(value);
    }

    async selectLanguage(value: string) {
        await this.language.waitFor({ state: 'visible' });
        await this.language.selectOption(value);
    }

    async selectFlag(value: string) {
        await this.flag.waitFor({ state: 'visible' });
        await this.flag.selectOption(value);
    }

    async fillPhoneNumberInput(value: string) {
        await this.phoneNumberInput.input.scrollIntoViewIfNeeded();
        await this.phoneNumberInput.input.waitFor({ state: 'visible' });
        await this.phoneNumberInput.input.fill(value);
    }

    async checkCheckbox1() {
        await this.checkbox1.check();
    }

    async checkCheckbox2() {
        await this.checkbox2.check();
    }

    async clickSubmitButton() {
        await this.submitButton.scrollIntoViewIfNeeded();
        await this.submitButton.waitFor({ state: 'visible' });
        await this.submitButton.click();
    }
}