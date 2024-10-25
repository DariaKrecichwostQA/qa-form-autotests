import { test } from '../page-object-model';

test('check', async ({ page, registrationPage }) => {
  await page.goto('http://localhost:8080');
  console.log(registrationPage.name);
});



