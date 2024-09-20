import { getBrowserPage } from '@/lib/api/browser'
import { NextResponse } from 'next/server'
import { Browser, chromium, Page } from 'playwright'

// var browser: Browser
// var browserPage: Page

export async function POST() {
  try {
    // browser = await chromium.launch({ headless: false })
    // browserPage = await browser.newPage()
    await getBrowserPage()

    const response = {
      message: 'Browser opened',
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to open browser', error: error }, { status: 500 })
  }
}

// export async function getBrowserPage(): Promise<Page> {
//   // console.log('getBrowserPage.trigger', !browser, !browserPage)
//   // console.log('getBrowserPage.browser', browser)
//   // console.log('getBrowserPage.browserPage', browserPage)

//   // if (!browser) {
//   //   browser = await chromium.launch({ headless: false })
//   // }

//   // if (!browserPage) {
//   //   browserPage = await browser.newPage()
//   // }

//   return browserPage
// }

// export async function closeBrowser() {
//   if (browser) {
//     await browser.close();
//     browser = undefined;
//     browserPage = undefined;
//   }
// }

// export { browserPage }
