import { battleSelector, EBattleMode, EStance } from '@/app/api/test/actions/(constances)'
import { getBrowserPage } from '@/lib/api/browser'
import { calculateTime, navigateMode } from '@/lib/utils'
import moment from 'moment'
import { NextRequest, NextResponse } from 'next/server'
import { Page } from 'playwright'
import { addQueue, executeQueue, getAllTask } from '../../../../lib/api/queue/queue'

export interface IPostRequest {
  action:
    | 'check-hunt'
    | 'hunt'
    | 'select-enemy'
    | 'add-food'
    | 'select-food'
    | 'select-stance'
    | 'battle'
    | 'chain-battle'
    | 'get-queue'
    | 'exec-queue'
    | 'get-all-task'
}

export async function POST(request: NextRequest) {
  const { action }: IPostRequest = await request.json()

  try {
    const page = await getBrowserPage()
    switch (action) {
      case 'select-enemy':
        await selectEnemy(page)
        break
      case 'add-food':
        await page.locator(battleSelector.battleModal.food.addBtn).click()
        break
      case 'select-food':
        await onSelectFoodBattle(page)
        break
      case 'select-stance':
        await page.selectOption(battleSelector.battleModal.stanceSelector, { index: EStance.str })
        break
      case 'battle':
        await page.locator(battleSelector.battleModal.confirm).click()
        break
      case 'chain-battle':
        await onChainBattle(page)
        break
      case 'get-queue':
        await getAllTasks(page)
        break
      case 'exec-queue':
        await executeQueue()
        break
      case 'get-all-task':
        await getAllTask()
        break
      default:
        break
    }

    const response = {
      message: `Action success.` + action,
    }
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to action!', error: error }, { status: 500 })
  }
}

const getAllTasks = async (page: Page) => {
  await onChainBattle(page)
}

const getCurrentChar = () => {
  return 4 // fixed char for now
}

const onChainBattle = async (page: Page) => {
  console.log('onChainBattle.trigger')
  const battleMode = await getBattleMode(page)
  if (battleMode === EBattleMode.founded) {
    await onBattleEnemy(page, EStance.agi)
    await addQueue({
      char: getCurrentChar(),
      action: onChainBattle,
      triggerDate: moment().add(await getTimeBattle(page), 'milliseconds'),
    })
  } else if (battleMode === EBattleMode.empty) {
    console.log('onChainBattle: case => battleMode === EBattleMode.empty')
  } else {
    console.log('onChainBattle: case => else')
  }
}

const getBattleMode = async (page: Page) => {
  return await Promise.race([
    page.waitForSelector(battleSelector.enemies.startHunt).then(() => EBattleMode.empty),
    page.waitForSelector(battleSelector.enemies.huntMore).then(() => EBattleMode.founded),
  ])
}

const onBattleEnemy = async (page: Page, stance: EStance) => {
  await page.goto(navigateMode('battle'))
  await selectEnemy(page)
  await page.locator(battleSelector.battleModal.food.addBtn).click()
  await onSelectFoodBattle(page)
  await page.selectOption(battleSelector.battleModal.stanceSelector, { index: stance })
  await page.locator(battleSelector.battleModal.confirm).click()
}

const selectEnemy = async (page: Page) => {
  await page.locator(`xpath=${battleSelector.enemies.allMon}//button`).first().click()
}

const onSelectFoodBattle = async (page: Page) => {
  await page.locator(`xpath=${battleSelector.battleModal.food.list.select}//button`).last().click()
  await page.waitForTimeout(2000)
  await page.locator(battleSelector.battleModal.food.list.max).click()
  await page.waitForTimeout(2000)
  await page.locator(battleSelector.battleModal.food.list.add).click()
}

const getTimeBattle = async (page: Page) => {
  await page.waitForSelector(battleSelector.timeBattle)
  const timeString = await page.locator(battleSelector.timeBattle).innerText()
  return calculateTime(timeString)
}

const skillModalConfirm = async (page: Page) => {
  await page
    .locator(selectorTextWithScope('//*[@id="game-container"]/div[2]/div[1]/div/div[2]/div', 'crystal selected'))
    .click()
}

const selectorTextWithScope = (scope: string, search: string) => {
  return `
    xpath=${scope}//*[
      contains(
        translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),
        '${search}'
      )
    ]
  `
}
