import { test } from '@page-object-models';
import {users} from '../test-data/users';
import { expect } from "playwright/test";

test('User registration with required fields only', async ({ page, registrationPage, confirmationPage, softAssert }) => {
  await page.goto('http://localhost:8080');

  await registrationPage.fillNameInput(users[0].name);
  await registrationPage.fillLastNameInput(users[0].lastname);
  await registrationPage.fillEmailInput(users[0].email);
  await registrationPage.fillPasswordInput(users[0].password);
  await registrationPage.fillRepeatPasswordInput(users[0].password);
  await registrationPage.fillDateOfBirthInput(users[0].date);
  await registrationPage.fillPhoneNumberInput(users[0].phone);
  await registrationPage.checkCheckbox1();
  await registrationPage.clickSubmitButton();

  await confirmationPage.confirmHeader.waitFor({ state: 'visible' });

  const errorFlag = { hasError: false };

  await softAssert(
      async () => expect(await confirmationPage.confirmHeader).toHaveText(`${users[0].name}, dziękujemy za rejestrację!`),
      'Sprawdzenie nagłówka potwierdzenia',
      errorFlag
  );

  await softAssert(
      async () => expect(await confirmationPage.confirmParagraf).toHaveText(`Na Twój adres email ${users[0].email} wysłaliśmy wiadomość z linkiem aktywującym konto`),
      'Sprawdzenie paragrafu potwierdzenia',
      errorFlag
  );

  if (errorFlag.hasError) {
    throw new Error('Test zakończony niepowodzeniem z powodu błędów walidacji.');
  }
});

test("User registration with all fields", async ({ page, registrationPage, confirmationPage, softAssert }) => {
  await page.goto("http://localhost:8080");

  await registrationPage.fillNameInput(users[1].name);
  await registrationPage.fillLastNameInput(users[1].lastname);
  await registrationPage.fillEmailInput(users[1].email);
  await registrationPage.fillPasswordInput(users[1].password);
  await registrationPage.fillRepeatPasswordInput(users[1].password);
  await registrationPage.fillDateOfBirthInput(users[1].date);
  await registrationPage.clickflagSelector();
  await registrationPage.selectFlag(users[1].diallingCodeOrderNumber)
  await registrationPage.selectLanguage(users[1].language)
  await registrationPage.fillPhoneNumberInput(users[1].phone);
  await registrationPage.checkCheckbox1();
  await registrationPage.checkCheckbox2();
  await registrationPage.clickSubmitButton();

  await confirmationPage.confirmHeader.waitFor({ state: "visible" });

  const errorFlag = { hasError: false };

  await softAssert(
      async () => expect(await confirmationPage.confirmHeader).toHaveText(`${users[1].name}, dziękujemy za rejestrację!`),
      'Sprawdzenie nagłówka potwierdzenia',
      errorFlag
  );

  await softAssert(
      async () => expect(await confirmationPage.confirmParagraf).toHaveText(`Na Twój adres email ${users[1].email} wysłaliśmy wiadomość z linkiem aktywującym konto`),
      'Sprawdzenie paragrafu potwierdzenia',
      errorFlag
  );

  if (errorFlag.hasError) {
    throw new Error('Test zakończony niepowodzeniem z powodu błędów walidacji.');
  }
});

test("Validation check for required fields", async ({ page, registrationPage, softAssert }) => {
  await page.goto("http://localhost:8080");
  await registrationPage.clickSubmitButton();

  const errors = [
    { field: registrationPage.nameInput, message: "Pole Imię jest wymagane" },
    { field: registrationPage.lastNameInput, message: "Pole Nazwisko jest wymagane" },
    { field: registrationPage.emailInput, message: "Pole E-mail jest wymagane" },
    { field: registrationPage.passwordInput, message: "Pole Hasło jest wymagane" },
    { field: registrationPage.repeatPasswordInput, message: "Pole Powtórz hasło jest wymagane" },
    { field: registrationPage.dateOfBirthInput, message: "Pole Data urodzenia jest wymagane" }
  ];

  const errorFlag = { hasError: false };

  for (const { field, message } of errors) {
    await softAssert(
        async () => {
          const errorText = await field.errorMessage.textContent();
          expect(errorText).toBe(message);
        },
        `Sprawdzenie błędu dla pola: ${message}`,
        errorFlag
    );
  }

  if (errorFlag.hasError) {
    throw new Error('Test zakończony niepowodzeniem z powodu błędów walidacji.');
  }
});

test("Validation check for email field", async ({ page, registrationPage, softAssert }) => {
  await page.goto("http://localhost:8080");

  await registrationPage.fillEmailInput(" ");
  const errorFlag1 = { hasError: false };
  await softAssert(
      async () => expect(await registrationPage.emailInput.errorMessage).toHaveText('Pole E-mail jest wymagane'),
      'Sprawdzenie błędu wymaganego pola E-mail',
      errorFlag1
  );

  await registrationPage.fillEmailInput("jan");
  const errorFlag2 = { hasError: false };
  await softAssert(
      async () => expect(await registrationPage.emailInput.errorMessage).toHaveText('Pole E-mail musi być poprawnym adresem email'),
      'Sprawdzenie błędu dla niepoprawnego E-maila',
      errorFlag2
  );

  await registrationPage.fillEmailInput("jan@$#%@!.pl");
  const errorFlag3 = { hasError: false };
  await softAssert(
      async () => expect(await registrationPage.emailInput.errorMessage).toHaveText('Pole E-mail musi być poprawnym adresem email'),
      'Sprawdzenie błędu dla niepoprawnego E-maila',
      errorFlag3
  );

  if (errorFlag1.hasError || errorFlag2.hasError || errorFlag3.hasError) {
    throw new Error('Test zakończony niepowodzeniem z powodu błędów walidacji.');
  }
});

test("Validation check for Password and Repeat Password fields", async ({ page, registrationPage, softAssert }) => {
  await page.goto('http://localhost:8080');

  const errorFlag = { hasError: false };
  await registrationPage.fillPasswordInput("Password1!");
  await softAssert(
      async () => expect(registrationPage.passwordInput.errorMessage).toHaveText(''),
      'Sprawdzenie braku komunikatu o błędzie dla poprawnego hasła',
      errorFlag
  );

  await registrationPage.fillRepeatPasswordInput("Password1!");
  await softAssert(
      async () => expect(await registrationPage.repeatPasswordInput.errorMessage).toHaveText(''),
      'Sprawdzenie zgodności hasła z powtórzeniem',
      errorFlag
  );

  await registrationPage.fillRepeatPasswordInput("Password1");
  await softAssert(
      async () => expect(await registrationPage.repeatPasswordInput.errorMessage).toHaveText('Hasła nie są jednakowe!'),
      'Sprawdzenie błędu dla rozbieżności pomiędzy powtórzonym hasłem a hasłem',
      errorFlag
  );

  await registrationPage.fillPasswordInput("1");
  await softAssert(
      async () => expect(await registrationPage.passwordInput.errorMessage).toHaveText('Hasło musi zawierać: co najmniej 8 znaków, dużą literę, znak specjalny!'),
      'Sprawdzenie błędu dla zbyt krótkiego hasła bez dużej litery i znaku specjalnego',
      errorFlag
  );

  await registrationPage.fillPasswordInput("1234567A");
  await softAssert(
      async () => expect(await registrationPage.passwordInput.errorMessage).toHaveText('Hasło musi zawierać: znak specjalny!'),
      'Sprawdzenie błędu dla hasła bez znaku specjalnego',
      errorFlag
  );

  await registrationPage.fillPasswordInput("1A!");
  await softAssert(
      async () => expect(await registrationPage.passwordInput.errorMessage).toHaveText('Hasło musi zawierać: co najmniej 8 znaków!'),
      'Sprawdzenie błędu dla hasła, które jest za krótkie',
      errorFlag
  );

  if (errorFlag.hasError) {
    throw new Error('Test zakończony niepowodzeniem z powodu błędów walidacji.');
  }
});

test("Validation check for phone number field", async ({ page, registrationPage, softAssert }) => {
  await page.goto("http://localhost:8080");

  await registrationPage.fillPhoneNumberInput("111222333");
  const errorFlag1 = { hasError: false };
  await softAssert(
      async () => expect(await registrationPage.phoneNumberInput.errorMessage).toHaveText(''),
      'Sprawdzenie, że numer telefonu jest poprawny',
      errorFlag1
  );

  await registrationPage.fillPhoneNumberInput("1");
  const errorFlag2 = { hasError: false };
  await softAssert(
      async () => expect(await registrationPage.phoneNumberInput.errorMessage).toHaveText('To pole musi zawierać co najmniej 9 cyfr'),
      'Sprawdzenie błędu dla zbyt krótkiego numeru telefonu',
      errorFlag2
  );

  await registrationPage.fillPhoneNumberInput("+112312313");
  const errorFlag3 = { hasError: false };
  await softAssert(
      async () => expect(await registrationPage.phoneNumberInput.errorMessage).toHaveText('To pole może zawierać tylko cyfry i spacje'),
      'Sprawdzenie błędu dla niepoprawnego numeru telefonu',
      errorFlag3
  );

  if (errorFlag1.hasError || errorFlag2.hasError || errorFlag3.hasError) {
    throw new Error('Test zakończony niepowodzeniem z powodu błędów walidacji.');
  }
});
test("Validation check for name field", async ({ page, registrationPage, softAssert }) => {
  await page.goto("http://localhost:8080");

  await registrationPage.fillNameInput("Jan");
  const errorFlag1 = { hasError: false };
  await softAssert(
      async () => expect(await registrationPage.nameInput.errorMessage).toHaveText(''),
      'Sprawdzenie braku wiadomości błędu dla poprawnego imienia "Jan"',
      errorFlag1
  );

  await registrationPage.fillNameInput("1");
  const errorFlag2 = { hasError: false };
  await softAssert(
      async () => expect(await registrationPage.nameInput.errorMessage).toContainText("To pole może zawierać tylko litery, spacje i \"-\""),
      'Sprawdzenie błędu dla niepoprawnego imienia "1"',
      errorFlag2
  );

  await registrationPage.fillNameInput(" ");
  const errorFlag3 = { hasError: false };
  await softAssert(
      async () => expect(await registrationPage.nameInput.errorMessage).toHaveText("Pole Imię jest wymagane"),
      'Sprawdzenie błędu wymaganego pola Imię',
      errorFlag3
  );

  await registrationPage.fillNameInput("Daria Alicja");
  const errorFlag4 = { hasError: false };
  await softAssert(
      async () => expect(await registrationPage.nameInput.errorMessage).toHaveText(''),
      'Sprawdzenie braku wiadomości błędu dla poprawnego imienia "Daria Alicja"',
      errorFlag4
  );

  if (errorFlag1.hasError || errorFlag2.hasError || errorFlag3.hasError || errorFlag4.hasError) {
    throw new Error('Test zakończony niepowodzeniem z powodu błędów walidacji w polu "Imię".');
  }
});

test("Validation check for last name field", async ({ page, registrationPage, softAssert }) => {
  await page.goto("http://localhost:8080");

  await registrationPage.fillLastNameInput("Kowalski");
  const errorFlag1 = { hasError: false };
  await softAssert(
      async () => expect(await registrationPage.lastNameInput.errorMessage).toHaveText(''),
      'Sprawdzenie braku wiadomości błędu dla poprawnego nazwiska "Kowalski"',
      errorFlag1
  );

  await registrationPage.fillLastNameInput("1");
  const errorFlag2 = { hasError: false };
  await softAssert(
      async () => expect(await registrationPage.lastNameInput.errorMessage).toContainText("To pole może zawierać tylko litery, spacje i \"-\""),
      'Sprawdzenie błędu dla niepoprawnego nazwiska "1"',
      errorFlag2
  );

  await registrationPage.fillLastNameInput(" ");
  const errorFlag3 = { hasError: false };
  await softAssert(
      async () => expect(await registrationPage.lastNameInput.errorMessage).toHaveText("Pole Nazwisko jest wymagane"),
      'Sprawdzenie błędu wymaganego pola Nazwisko',
      errorFlag3
  );

  await registrationPage.fillLastNameInput("Kowalski Nowak");
  const errorFlag4 = { hasError: false };
  await softAssert(
      async () => expect(await registrationPage.lastNameInput.errorMessage).toHaveText(''),
      'Sprawdzenie braku wiadomości błędu dla poprawnego nazwiska "Kowalski Nowak"',
      errorFlag4
  );

  if (errorFlag1.hasError || errorFlag2.hasError || errorFlag3.hasError || errorFlag4.hasError) {
    throw new Error('Test zakończony niepowodzeniem z powodu błędów walidacji w polu "Nazwisko".');
  }
});
test("Check the redirection to the regulations page", async ({page, registrationPage})=> {
  await page.goto("http://localhost:8080");
  await registrationPage.clickRegulationsLink();
  await expect(page).toHaveURL("http://localhost:8080/regulamin");
});
test("Check the redirection to the policy page", async ({page, registrationPage})=> {
  await page.goto("http://localhost:8080");
  await registrationPage.clickPolicyLink();
  await expect(page).toHaveURL("http://localhost:8080/polityka-prywatnosci");
});