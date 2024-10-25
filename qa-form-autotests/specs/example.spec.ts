import { test } from '../page-object-model';
import {users} from '../test-data/users'
import {expect} from "playwright/test";
test('User registration with required fields only', async ({ page, registrationPage,confirmationPage }) => {
  await page.goto('http://localhost:8080');
  await registrationPage.fillNameInput(users[0].name)
  await registrationPage.fillLastNameInput(users[0].lastname)
  await registrationPage.fillEmailInput(users[0].email)
  await registrationPage.fillPasswordInput(users[0].password)
  await registrationPage.fillRepeatPasswordInput(users[0].password)
  await registrationPage.fillDateOfBirthInput(users[0].date)
  //await registrationPage.selectFlag(users[0].date)
  await registrationPage.fillPhoneNumberInput(users[0].phone)
  await registrationPage.checkCheckbox1()
  await registrationPage.clickSubmitButton()
await confirmationPage.confirmHeader.waitFor({ state: 'visible' });
  await expect(confirmationPage.checkHeader(users[0].name)).toBeTruthy()
  await expect(confirmationPage.checkParagraph(users[0].email)).toBeTruthy()
});




