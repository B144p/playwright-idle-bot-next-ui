import { Moment } from 'moment'
import { Page } from 'playwright'

export interface IQueueTask {
  char: number
  action: (page: Page) => Promise<void>
  triggerDate: Moment
}
