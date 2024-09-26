import { IQueueTask } from '@/app/api/v1/actions/battle/multi/(interfaces)'
import { getBrowserPage } from '@/lib/api/browser'
import { NextRequest, NextResponse } from 'next/server'

const queueTask: IQueueTask[] = []
let currentChar: number = 1

export async function POST(_request: NextRequest) {
  try {
    const browserPage = await getBrowserPage()

    const response = {
      message: `Action success.`,
    }
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to action!', error: error }, { status: 500 })
  }
}
