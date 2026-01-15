const { test, expect } = require('@playwright/test');
const SearchPage = require('../pages/SearchPage');
const { validateCardFields } = require('../utils/CommonFunction');

test('TC_Search_and_FieldsValidation', async ({ page }) => {

  const searchPage = new SearchPage(page);
  await searchPage.performSearch();

  const listingCards = searchPage.getListingCards();
  await expect(listingCards.first()).toBeVisible({ timeout: 15000 });

  const cardCount = await listingCards.count();
  expect(cardCount).toBeGreaterThan(0);

  const cardsToCheck = Math.min(cardCount, 3);

  await validateCardFields(searchPage, listingCards, cardsToCheck);

});