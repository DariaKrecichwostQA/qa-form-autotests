import { test as base } from '@playwright/test';
import {RegistrationPagePo} from "../pages";
import {ConfirmationPagePo} from "../pages/confirmationPage.po";

type pages = {
    registrationPage: RegistrationPagePo;
    confirmationPage: ConfirmationPagePo;
};

const testPages = base.extend<pages>({
    registrationPage: async ({page}, use) => {
        await use(new RegistrationPagePo(page));
    },
    confirmationPage: async ({page}, use) => {
        await use(new ConfirmationPagePo(page));
    }
});
export const test = testPages;
