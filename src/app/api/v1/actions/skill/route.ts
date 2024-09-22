import { skillSelector } from '@/app/api/v1/actions/battle/constant'
import { ICharacter } from '@/app/api/v1/actions/battle/multi/(interfaces)'
import { TNavigateMode } from '@/app/api/v1/navigate/[mode]/(interfaces)'
import { getBrowserPage } from '@/lib/api/browser'
import { navigateMode, onSwitchCharacter } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'
import { Page } from 'playwright'

export async function POST(_request: NextRequest) {
  try {
    const browserPage = await getBrowserPage()
    onSkillActivate(browserPage, 'woodcutting', 80 * 60 * 1000)

    const response = {
      message: `Action success.`,
    }
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to action!', error: error }, { status: 500 })
  }
}

const onSelectSkilPath = (index: number) =>
  `//*[@id="game-container"]/div[1]/div[1]/div[3]/div[2]/ul/button[${index}]/li`

const characters: ICharacter[] = [
  {
    name: 'bTset',
    duration: { maxSkill: 100 * 60 * 1000 },
    // chainAction: [onSelectSkilPath(3), skillDialogSubmitSelector],
    chainAction: onSelectSkilPath(3),
  },
  {
    name: 'bTsetRo',
    duration: { maxSkill: 80 * 60 * 1000 },
    // chainAction: [
    //   onSelectSkilPath(3),
    // '//*[@id="menu-button"]',
    // '//*[@id="game-container"]/div[2]/div[2]/div/div[2]/button[2]',
    //   skillDialogSubmitSelector,
    // ],
    chainAction: onSelectSkilPath(3),
  },
]

async function onSkillActivate(page: Page, skill: TNavigateMode, time: number) {
  try {
    for (const [i, data] of characters.entries()) {
      await onSwitchCharacter(page, i + 1)
      await page.waitForTimeout(2000)
      await page.goto(navigateMode(skill))
      await page.waitForTimeout(2000)
      // data.chainAction.map(async (action) => {
      //   await page.locator(action).click()
      //   await sleep(2000)
      // })
      await page.locator(data.chainAction).click()
      await page.waitForTimeout(2000)
      await page.locator(skillSelector.dialogSubmit).click()
    }

    // Waiting for next loop with (time + 2.5 min) that +- 2.5 min
    await page.waitForTimeout(time + Math.random() * (5 * 60 * 1000))
  } catch (error) {
    console.error('Error in activeOnChange:', error)
  }

  await onSkillActivate(page, skill, time)
}
