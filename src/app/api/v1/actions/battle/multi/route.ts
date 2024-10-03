import { battleSelector } from '@/app/api/v1/actions/battle/constant'
import { IQueueTask } from '@/app/api/v1/actions/battle/multi/(interfaces)'
import { getBrowserPage } from '@/lib/api/browser'
import { navigateMode, onSwitchCharacter } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'
import { Page } from 'playwright'

const queueTask: IQueueTask[] = []
let currentChar: number = 1

const characters = [{ name: 'bTset' }, { name: 'bTsetRo' }]

const WAIT_TIMEOUT = 1000
const BATTLE_TIMEOUT = 1000 * 35

export async function POST(_request: NextRequest) {
  try {
    const browserPage = await getBrowserPage()
    onStartBattle(browserPage)

    const response = {
      message: `Action success.`,
    }
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to action!', error: error }, { status: 500 })
  }
}

const onStartBattle = async (page: Page) => {
  while (true) {
    try {
      let waitHuntingTime = 0
      for (const [i] of characters.entries()) {
        await switchCharacterAndNavigate(page, i + 1, navigateMode('battle'))
        waitHuntingTime = await onHunt(page)
        await page.waitForTimeout(WAIT_TIMEOUT)
      }
      await page.waitForTimeout(waitHuntingTime - 3000)

      await processCharacters(page, onBattleAction)
      await page.waitForTimeout(BATTLE_TIMEOUT)

      await processCharacters(page, onBattleAction)
      await page.waitForTimeout(BATTLE_TIMEOUT)
    } catch (error) {
      console.error('Error in activeOnChange:', error)
      await page.waitForTimeout(WAIT_TIMEOUT)
    }
  }
}

const processCharacters = async (page: Page, action: (page: Page) => Promise<void>) => {
  for (const [i] of characters.entries()) {
    await switchCharacterAndNavigate(page, i + 1, navigateMode('battle'))
    await action(page)
  }
}

const switchCharacterAndNavigate = async (page: Page, characterIndex: number, mode: string) => {
  await onSwitchCharacter(page, characterIndex)
  await page.waitForTimeout(WAIT_TIMEOUT)
  await page.goto(mode)
  await page.waitForTimeout(WAIT_TIMEOUT) // Wait for navigation completion
}

const onHunt = async (page: Page) => {
  const emptyHuntBtn = page.locator(battleSelector.emptyHunt)
  const huntAgainBtn = page.locator(battleSelector.huntAgain)

  const isEmptyHuntBtnVisible = await emptyHuntBtn.isVisible()
  await (isEmptyHuntBtnVisible ? emptyHuntBtn.click() : huntAgainBtn.click())

  // wait for hunting
  await page.waitForSelector(battleSelector.timeHunt)
  const huntTime = await page.locator(battleSelector.timeHunt).innerText()
  return calculateTime(huntTime)
}

const calculateTime = (timeStr: string) => {
  return (
    timeStr
      .split(':')
      .reverse()
      .reduce((acc, cur, index) => acc + Number(cur) * 60 ** index, 1) * 1000
  )
}

const onBattleAction = async (page: Page) => {
  const maxBattleBtn = page.locator(battleSelector.maxBattleBtn)
  await page.waitForSelector(battleSelector.maxBattleBtn)
  await maxBattleBtn.click()
}
