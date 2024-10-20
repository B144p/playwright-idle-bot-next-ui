import { ICharacter } from '@/app/api/v1/actions/battle/multi/(interfaces)'
import { getBrowserPage } from '@/lib/api/browser'
import { IQueueTask } from '@/lib/api/queue/interfaces'
import { onSwitchCharacter } from '@/lib/utils'
import moment from 'moment'

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

const getAllQueue = async () => {}

const getHuntingTask = async (characters: ICharacter[]) => {
  const page = await getBrowserPage()
  for (const [i, data] of characters.entries()) {
    const { chainAction, action, charIndex } = data
    await onSwitchCharacter(page, charIndex)
  }
}
