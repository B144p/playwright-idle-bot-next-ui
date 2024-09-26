import { getBrowserPage } from '@/lib/api/browser'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(_request: NextRequest) {
  try {
    const browserPage = await getBrowserPage()
    await browserPage.click('button[type="submit"]')

    const response = {
      message: `Submit login form success.`,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to submit login form!', error: error }, { status: 500 })
  }
}
