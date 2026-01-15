# NHS Assignment - Playwright E2E Tests

End-to-end tests for [NewHomeSource](https://www.newhomesource.com/) using Playwright.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd NHS_Assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests (headless)
```bash
npm test
```

### Run tests with browser visible
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### View the last test report
```bash
npm run report
```

## Project Structure

```
NHS_Assignment/
├── pages/
│   └── SearchPage.js      # Page Object for search functionality
├── tests/
│   └── search.spec.js     # Test specifications
├── utils/
│   └── CommonFunction.js  # Shared utility functions
├── playwright.config.js   # Playwright configuration
└── package.json
```

## Test Cases

| Test Name | Description |
|-----------|-------------|
| `TC_Search_and_FieldsValidation` | Searches for Seattle and validates listing card fields (image, name, price, beds, address) |
| `TC_PriceFilter_and_BedroomFilter` | Applies price and bedroom filters, then validates filtered results |

## Configuration

The Playwright configuration is in `playwright.config.js`. Key settings:

- **Base URL**: `https://www.newhomesource.com/`
- **Browser**: Chromium
- **Timeout**: 30 seconds
- **Retries**: 2 on CI, 0 locally
- **Reporter**: HTML

## Troubleshooting

If tests fail due to timeouts, try:
1. Ensure you have a stable internet connection
2. Run with `--headed` to see what's happening
3. Increase timeout in `playwright.config.js`
