import BasePage from "./basePage.po";
import { Locator, Page } from "@playwright/test";
//import moment from "moment";

export class RegistrationPagePo extends BasePage {
    public readonly name: Locator;
    public readonly lastName: Locator;
    public readonly email: Locator;
    public readonly password: Locator;
    public readonly repeatPassword: Locator;
    public readonly dateOfBirth: Locator;
    public readonly flag:Locator
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
        this.dateOfBirth = page.getByPlaceholder('Data urodzenia');
        this.language = page.locator("body > div > div > div > div > div > form > span:nth-child(7) > label > input");this.flag = page.locator('.phone-input.vue-tel-input[tabindex="0"]');
        this.flag = page.locator('.phone-input.vue-tel-input[tabindex="0"]');
        this.phoneNumber = page.getByPlaceholder('Numer telefonu')
        this.checkbox1 = page.locator('form div').filter({ hasText: 'Akceptuję regulamin oraz' }).locator('div')
        this.checkbox2 = page.locator('form div').filter({ hasText: 'Wyrażam zgodę na otrzymywanie' })
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

    async fillDateOfBirthInput(value: string) {
        await this.dateOfBirth.waitFor({ state: 'visible' });
        await this.dateOfBirth.fill(value);
    }
    // async  selectDate(date: number, dateToSelect: string) {
    //
    //     await this.dateOfBirth.click()
    //
    //     const mmYY = this.page.locator("(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]");
    //     const prev = this.page.locator("(//table[@class='table-condensed']//th[@class='prev'])[1]");
    //     const next = this.page.locator("(//table[@class='table-condensed']//th[@class='next'])[1]");
    //
    //     // let dateToSelect: string = "May 2019";
    //     const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore();
    //     console.log("this month? " + thisMonth);
    //     while (await mmYY.textContent() != dateToSelect) {
    //         if (thisMonth) {
    //             await prev.click();
    //         } else {
    //             await next.click();
    //         }
    //     }
    //     await this.page.click("//td[@class='day'][text()='${date}']");
    // }


    async selectLanguage(value: string) {
        await this.language.waitFor({ state: 'visible' });
        await this.language.selectOption(value);
    }

    async selectFlag(value: string) {
        await this.flag.waitFor({ state: 'visible' });
        await this.language.selectOption(value);
    }

    async fillPhoneNumberInput(value: string) {
        await this.phoneNumber.scrollIntoViewIfNeeded();
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
        await this.submitButton.scrollIntoViewIfNeeded();
        await this.submitButton.waitFor({ state: 'visible' });
        await this.submitButton.click();
    }
}

// let errors = [
//     {
//         "text": "Pole Imię jest wymagane"
//     },
//     {
//         "text": "Pole Nazwisko jest wymagane"
//     },
//     {
//         "text": "Pole E-mail jest wymagane"
//     },
//     {"text": "Pole E-mail musi być poprawnym adresem email"},
//     {
//         "text": "Pole password jest wymagane"
//     },
//     {
//         "text": "Hasło musi zawierać: co najmniej 8 znaków, dużą literę, znak specjalny!"
//     },
//     // {
//     //     "text": "Hasło musi zawierać: co najmniej 8 znaków"
//     // },
//     // {
//     //     "text": Hasło musi zawierać: znak specjalny!"
//     // },
//     {
//         "text": "Pole Powtórz hasło jest wymagane"
//     },
//     {
//         "text": "Hasła nie są jednakowe!"
//     },
//     {
//         "text": "Pole Data urodzenia jest wymagane"
//     },
//     {
//         "text": "To pole jest wymagane"
//     },
//     {
//         "text": "To pole może zawierać tylko cyfry i spacje"
//     },
//     {
//         "text": ""
//     }
// ]