import { test as base } from '@playwright/test';
import {RegistrationPagePo} from "../pages";

type pages = {
    registrationPage: RegistrationPagePo;
};

const testPages = base.extend<pages>({
    registrationPage: async ({page}, use) => {
        await use(new RegistrationPagePo(page));
    }
});
export const test = testPages;
