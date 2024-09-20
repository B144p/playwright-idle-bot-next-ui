import { TNavigateMode } from '@/app/api/v1/navigate/[mode]/(interfaces)'
import { getBrowserPage } from '@/lib/api/browser'
// import { browserPage } from '@/app/api/v1/open-browser/route'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(_request: NextRequest, { params }: { params: { mode: TNavigateMode } }) {
  const { mode } = params

  try {
    const browserPage = await getBrowserPage()
    await browserPage.goto('https://web.idle-mmo.com/login')

    const response = {
      message: `Redirect to ${mode}`,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Failed to redirect', error: error }, { status: 500 })
  }
}

const navigateMode = (mode: TNavigateMode) => {
  switch (mode) {
    case 'woodcutting':
    case 'mining':
    case 'fishing':
    case 'alchemy':
    case 'smelting':
    case 'cooking':
    case 'forge':
      return `https://web.idle-mmo.com/skills/view/${mode}`
    case 'inventory':
    case 'battle':
    case 'pets':
    case 'guilds':
      return `https://web.idle-mmo.com/${mode}`
    case 'market':
      return 'https://web.idle-mmo.com/market/listings'
    case 'vendor':
      return 'https://web.idle-mmo.com/vendor/shop'
    case 'login':
      return 'https://web.idle-mmo.com/login'
    default:
      return '#'
  }
}
