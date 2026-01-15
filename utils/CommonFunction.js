const { expect } = require('@playwright/test');

async function validateCardFields(searchPage, listingCards, cardsToCheck) {
  for (let i = 0; i < cardsToCheck; i++) {
    const card = listingCards.nth(i);

    const image = searchPage.getCardImage(card);
    await expect(image, `Card ${i + 1}: image should be visible`).toBeVisible();

    const name = searchPage.getCardName(card);
    await expect(name, `Card ${i + 1}: name/title should be visible`).toBeVisible();

    const price = searchPage.getCardPrice(card);
    await expect(price, `Card ${i + 1}: price should be visible`).toBeVisible();
    await expect(price, `Card ${i + 1}: price text should not be empty`).not.toHaveText('');

    const bedsStat = searchPage.getCardBedsStat(card);
    await expect(bedsStat, `Card ${i + 1}: bedrooms stat should be visible`).toBeVisible();

    const bedsCount = searchPage.getCardBedsCount(card);
    await expect(bedsCount, `Card ${i + 1}: bedrooms count should not be empty`).not.toHaveText('');

    const address = searchPage.getCardAddress(card);
    await expect(address, `Card ${i + 1}: address should be visible`).toBeVisible();
  }
}

/**
 * Parses a price string and converts K/M suffixes to actual numbers
 * e.g., "$1.3M" -> 1300000, "$500K" -> 500000, "From $649,950" -> 649950
 */
function parsePrice(priceString) {
  // Check for M/K suffixes at the end of the price (after number)
  // Pattern: number followed by K/M (with optional spaces)
  const hasMillionSuffix = /\d\s*[Mm](?:\b|$)/.test(priceString);
  const hasThousandSuffix = /\d\s*[Kk](?:\b|$)/.test(priceString) && !hasMillionSuffix;
  
  // Remove commas first, then remove all non-numeric characters except decimal point
  const withoutCommas = priceString.replace(/,/g, '');
  const numericPart = parseFloat(withoutCommas.replace(/[^0-9.]/g, ''));
  
  if (hasMillionSuffix) {
    return numericPart * 1000000;
  } else if (hasThousandSuffix) {
    return numericPart * 1000;
  }
  return numericPart;
}

async function validateFilteredCards(searchPage, listingCards, cardsToCheck, minValue, maxValue, bedroomNum) {
  for (let i = 0; i < cardsToCheck; i++) {
    const card = listingCards.nth(i);
    const price = searchPage.getCardPrice(card);
    await expect(price, `Card ${i + 1}: price should be visible`).toBeVisible();
    const priceText = await price.innerText();
    const priceNum = parsePrice(priceText);
    const minNum = parsePrice(minValue);
    const maxNum = parsePrice(maxValue);

    expect(priceNum).toBeGreaterThanOrEqual(minNum);
    expect(priceNum).toBeLessThanOrEqual(maxNum);

    const bedsStat = searchPage.getCardBedsStat(card);
    const bedsCount = searchPage.getCardBedsCount(card);
    await expect(bedsCount, `Card ${i + 1}: bedrooms count should not be empty`).not.toHaveText('');

    const bedsText = await bedsCount.innerText();
    const firstMatch = bedsText.match(/\d+/);
    const bedsFirstNum = firstMatch ? Number(firstMatch[0]) : null;
    expect(bedsFirstNum).not.toBeNull();
    expect(bedsFirstNum).toBeGreaterThanOrEqual(bedroomNum);
  }
}

async function ArrowRightClick(locator, times = 2) {
  for (let i = 0; i < times; i++) {
    await locator.press('ArrowRight');
  }
}

async function ArrowLeftClick(locator, times = 2) {
  for (let i = 0; i < times; i++) {
    await locator.press('ArrowLeft');
  }
}

module.exports = {
  validateCardFields,
  validateFilteredCards,
  ArrowRightClick,
  ArrowLeftClick,
  parsePrice
};