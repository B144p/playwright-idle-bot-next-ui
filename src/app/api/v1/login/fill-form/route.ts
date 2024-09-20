import { getBrowserPage } from '@/lib/api/browser'
import { decrypt } from '@/lib/utils/crypto'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(_request: NextRequest) {
  const username = process.env.NEXT_PUBLIC_USERNAME ?? ''
  const password = process.env.NEXT_PUBLIC_PASSWORD ?? ''

  if (!username || !password) {
    return NextResponse.json({ message: 'Username or Password is not correct!' }, { status: 500 })
  }

  try {
    const browserPage = await getBrowserPage()

    await browserPage.locator('#email').fill(decrypt(username))
    await browserPage.locator('#password').fill(decrypt(password))

    const response = {
      message: `Fill login form success.`,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fill login form!', error: error }, { status: 500 })
  }
}
