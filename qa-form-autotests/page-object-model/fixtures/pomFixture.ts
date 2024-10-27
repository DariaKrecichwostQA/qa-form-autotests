import { test as base } from '@playwright/test';
import { RegistrationPagePo } from '../pages';
import { ConfirmationPagePo } from '../pages/confirmationPage.po';

type Pages = {
    registrationPage: RegistrationPagePo;
    confirmationPage: ConfirmationPagePo;
    softAssert: (assertion: () => Promise<void>, message: string, errorFlag: { hasError: boolean }) => Promise<void>;
};

const testPages = base.extend<Pages>({
    registrationPage: async ({ page }, use) => {
        await use(new RegistrationPagePo(page));
    },
    confirmationPage: async ({ page }, use) => {
        await use(new ConfirmationPagePo(page));
    },
    softAssert: async ({}, use) => {
        const softAssert = async (assertion: () => Promise<void>, message: string, errorFlag: { hasError: boolean }): Promise<void> => {
            try {
                await assertion();
            } catch (error) {
                console.log(`Błąd: ${message} - ${error instanceof Error ? error.message : error}`);
                errorFlag.hasError = true;
            }
        };
        await use(softAssert);
    }
});

export const test = testPages;
