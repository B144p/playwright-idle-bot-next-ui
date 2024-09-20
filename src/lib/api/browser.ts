import { Browser, Page, chromium } from 'playwright'

// Store browser and page in the global object to ensure persistence
declare global {
  // Extending the global object to include browser and browserPage
  var _browser: Browser | null
  var _browserPage: Page | null
}

// Ensure the global object properties are initialized (to avoid undefined issues)
globalThis._browser = globalThis._browser || null
globalThis._browserPage = globalThis._browserPage || null

export async function getBrowserPage(): Promise<Page> {
  // If the browser instance doesn't exist, launch it

  if (!globalThis._browser) {
    globalThis._browser = await chromium.launch({ headless: false })
  }

  // If the page instance doesn't exist, create it
  if (!globalThis._browserPage) {
    globalThis._browserPage = await globalThis._browser.newPage()
  }

  return globalThis._browserPage
}

export async function closeBrowser() {
  if (globalThis._browser) {
    await globalThis._browser.close()
    globalThis._browser = null
    globalThis._browserPage = null
  }
}
