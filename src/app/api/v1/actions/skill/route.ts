import { skillSelector } from '@/app/api/v1/actions/battle/constant'
import { ICharacter } from '@/app/api/v1/actions/battle/multi/(interfaces)'
import { getBrowserPage } from '@/lib/api/browser'
import { navigateMode, onSwitchCharacter } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'
import { Page } from 'playwright'

export async function POST(_request: NextRequest) {
  try {
    const browserPage = await getBrowserPage()
    onTop(browserPage)

    const response = {
      message: `Action success.`,
    }
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to action!', error: error }, { status: 500 })
  }
}

const onTop = async (browserPage: Page) => {
  // await sleep(45 * 1000)
  await onSkillActivateChain(browserPage, 80 * 60 * 1000)
}

const onSelectSkilPath = (index: number) =>
  `//*[@id="game-container"]/div[1]/div[1]/div[3]/div[2]/ul/button[${index}]/li`

const onSelectCrystalPath = (index: number) => [
  '//*[@id="menu-button"]',
  `//*[@id="game-container"]/div[2]/div[2]/div/div[2]/button[${index + 1}]`,
]

const characters: ICharacter[] = [
  {
    name: 'bTset',
    duration: { maxSkill: 100 * 60 * 1000 },
    action: 'woodcutting',
    chainAction: [onSelectSkilPath(3), ...onSelectCrystalPath(1), skillSelector.dialogSubmit],
  },
  {
    name: 'bTsetRo',
    duration: { maxSkill: 80 * 60 * 1000 },
    action: 'woodcutting',
    chainAction: [onSelectSkilPath(3), ...onSelectCrystalPath(1), skillSelector.dialogSubmit],
  },
]

async function onSkillActivateChain(page: Page, time: number) {
  try {
    for (const [i, data] of characters.entries()) {
      const { chainAction, action } = data

      await onSwitchCharacter(page, i + 1)
      await page.waitForTimeout(2000)
      await page.goto(navigateMode(action))
      await page.waitForTimeout(2000)

      for (let i = 0; i < chainAction.length; i++) {
        await page.waitForSelector(chainAction[i])
        await page.locator(chainAction[i]).click()
        await page.waitForTimeout(2000)
      }
    }

    // Waiting for next loop with (time + 2.5 min) that +- 2.5 min
    await page.waitForTimeout(time + Math.random() * (5 * 60 * 1000))
  } catch (error) {
    console.error('Error in activeOnChange:', error)
  }

  await onSkillActivateChain(page, time)
}
