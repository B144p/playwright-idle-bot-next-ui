import { battleSelector } from '@/app/api/v1/actions/battle/constant'
import { getBrowserPage } from '@/lib/api/browser'
import { NextRequest, NextResponse } from 'next/server'
import { Page } from 'playwright'

export async function POST(_request: NextRequest) {
  try {
    const browserPage = await getBrowserPage()

    // await onSwitchCharacter(browserPage, 2)
    // await sleep(1000)
    // await browserPage.goto(navigateMode('battle'))
    // await sleep(1000)

    activeOnChange(browserPage)

    const response = {
      message: `Action success.`,
    }
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to action!', error: error }, { status: 500 })
  }
}

async function activeOnChange(page: Page) {
  try {
    console.log('activeOnChange.start')
    const emptyHuntBtn = page.locator(battleSelector.emptyHunt)
    const huntAgainBtn = page.locator(battleSelector.huntAgain)
    const isEmptyHuntBtnVisible = await emptyHuntBtn.isVisible()

    if (isEmptyHuntBtnVisible) {
      await emptyHuntBtn.click()
    } else {
      await huntAgainBtn.click()
    }

    await page.waitForSelector(battleSelector.timeHunt)
    const huntTime = await page.locator(battleSelector.timeHunt).innerText()
    console.log('huntTime', huntTime)
    const calTime = huntTime.split(':').reduceRight((acc, cur, index) => acc + Number(cur) * 60 ** index, 1) * 1000
    console.log('calTime', calTime)
    await page.waitForTimeout(calTime)

    const maxBattleBtn = page.locator(battleSelector.maxBattleBtn)
    await page.waitForSelector(battleSelector.maxBattleBtn)
    await maxBattleBtn.click()
    await page.waitForTimeout(1000 * 50)
    await maxBattleBtn.click()
    await page.waitForTimeout(1000 * 50)

    console.log('activeOnChange.end')
  } catch (error) {
    console.error('Error in activeOnChange:', error)
  }
  activeOnChange(page)
}
