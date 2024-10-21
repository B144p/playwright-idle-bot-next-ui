import { ICharacter } from '@/app/api/v1/actions/battle/multi/(interfaces)'
import { getBrowserPage } from '@/lib/api/browser'
import { IQueueTask } from '@/lib/api/queue/interfaces'
import { calculateTime, navigateMode, onSwitchCharacter } from '@/lib/utils'
import moment from 'moment'
import { getActiveChar } from '../character/character'
import { Page } from 'playwright'
import { skillSelector } from '@/app/api/test/actions/(constances)'

let queueTasks: IQueueTask[] = []

export const addQueue = async (task: IQueueTask) => {
  queueTasks = sortQueue([...queueTasks, task])
}

export const executeQueue = async () => {
  const page = await getBrowserPage()
  if (queueTasks.length > 0) {
    const currentTask = queueTasks.shift()
    await currentTask!.action(page)

    if (queueTasks.length > 0) {
      const timeSecond = queueTasks[0].triggerDate.diff(moment())
      console.log('waitForTimeout.timeSecond', timeSecond)
      timeSecond > 0 && (await page.waitForTimeout(timeSecond))
      await executeQueue()
    }
  }
}

const sortQueue = (queue: IQueueTask[]) => {
  return queue.sort((a, b) => moment(a.triggerDate).diff(b.triggerDate))
}

const getAllQueue = async () => {
  return queueTasks
}

export const getAllTask = async () => {
  const page = await getBrowserPage()

  const { characters } = await getActiveChar()

  for await (const [_i, data] of characters.entries()) {
    const {
      charIndex,
      skill: { mode },
    } = data
    await onSwitchCharacter(page, charIndex)
    await page.waitForTimeout(2000)
    await page.goto(navigateMode(mode))
    await page.waitForTimeout(2000)

    await addQueue({
      char: charIndex,
      action: async () => {},
      triggerDate: moment().add(await getTimeBattle(page), 'milliseconds'),
    })
  }

  await page.waitForTimeout(2000)
  console.log('getAllTask.allQueue', getAllQueue())
}

const getTimeBattle = async (page: Page) => {
  await page.waitForSelector(skillSelector.timeSkill)
  const timeString = await page.locator(skillSelector.timeSkill).innerText()
  return calculateTime(timeString)
}

const getHuntingTask = async (characters: ICharacter[]) => {
  const page = await getBrowserPage()
  for (const [i, data] of characters.entries()) {
    const { chainAction, action, charIndex } = data
    await onSwitchCharacter(page, charIndex)
  }
}
