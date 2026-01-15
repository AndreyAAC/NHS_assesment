const { expect } = require('@playwright/test');

/**
 * Page Object for the NewHomeSource search and listing pages.
 * Encapsulates all locators and actions for search functionality.
 */
class SearchPage {
  /**
   * Creates a new SearchPage instance.
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Performs a search for the specified location.
   * @param {string} [searchTerm='Seattle'] - The location to search for
   */
  async performSearch(searchTerm = 'Seattle') {
    // Uses baseURL from playwright.config.js
    await this.page.goto('/');

    const searchBarContainer = this.page.locator('.nhs-n1-mq-search-bar--large-height');
    await expect(searchBarContainer).toBeVisible();
    await searchBarContainer.click();
    await this.page.locator('[data-qa="typeahead-search-input"]').first().fill(searchTerm);

    const resultsContainer = this.page.locator('[data-search-result-container]').first();
    await expect(resultsContainer).toBeVisible();

    const dropdownItems = resultsContainer.locator('[data-search-bar-result-item]');
    await expect(dropdownItems.nth(1)).toBeVisible();
    await dropdownItems.nth(1).click();
  }

  /**
   * Gets all listing cards on the search results page.
   * @returns {import('@playwright/test').Locator} Locator for listing cards
   */
  getListingCards() {
    return this.page.locator('[data-qa="paid-card"]');
  }

  /** Gets the price filter toggle button. */
  getPriceFilter() {
    return this.page.locator('[data-panel-option="price-toggle"]');
  }

  /** Gets the minimum price slider. */
  getMinPriceSlider() {
    return this.page.locator('[data-qa="Minimum_price_slider"]');
  }

  /** Gets the maximum price slider. */
  getMaxPriceSlider() {
    return this.page.locator('[data-qa="Maximum_price_slider"]');
  }

  getMinPriceLabel() {
    return this.page.locator('[data-minimum-slider-label=""]');
  }

  getMaxPriceLabel() {
    return this.page.locator('[data-maximum-slider-label=""]');
  }

  getApplyPriceFilter() {
    return this.page.locator('[data-qa="price_filter_apply"]');
  }

  getBedroomFilter() {
    return this.page.locator('[data-qa="bedbath-toggle"]');
  }

  getBedroomAmount() {
    return this.page.locator('[data-qa="Beds3"]');
  }

  getApplyBedroomFilter() {
    return this.page.locator('[data-qa="Beds/Baths_ApplyFilters"]');
  }

  getCardImage(card) {
    return card.locator('.nhs-n1-c-card__image');
  }

  getCardName(card) {
    return card.locator('[data-qa="listing_name"]');
  }

  getCardPrice(card) {
    return card.locator('[data-card-element="price"] [data-qa="price_label"]');
  }

  getCardBedsStat(card) {
    return card.locator('[data-qa="card_specs"] .nhs-n1-c-card__stats-stat').filter({ hasText: 'Beds' });
  }

  getCardBedsCount(card) {
    return this.getCardBedsStat(card).locator('.nhs-n1-c-card__stats-stat-count');
  }

  getCardAddress(card) {
    return card.locator('[data-qa="tooltip-address"]');
  }
}

module.exports = SearchPage;