// api > v1 > login > route.ts
import { PostRequestBody } from '@/app/api/v1/login/(interfaces)'
import { getBrowserPage } from '@/lib/api/browser'
import { decrypt } from '@/lib/utils/crypto'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = {
      message: 'GET call successfully!',
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error: error }, { status: 500 })
  }
}

export async function POST(_request: NextRequest) {
  // const body: PostRequestBody = await request.json()
  const username = process.env.NEXT_PUBLIC_USERNAME ?? ''
  const password = process.env.NEXT_PUBLIC_PASSWORD ?? ''

  try {
    const browserPage = await getBrowserPage()
    await browserPage.goto('https://web.idle-mmo.com/login')

    if (!username || !password) {
      return NextResponse.json({ message: 'Username or Password is not correct!' }, { status: 500 })
    }

    await browserPage.locator('#email').fill(decrypt(username))
    await browserPage.locator('#password').fill(decrypt(password))
    await browserPage.click('button[type="submit"]')

    const response = {
      message: 'Login successfully!',
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred', error: error }, { status: 400 })
  }
}
