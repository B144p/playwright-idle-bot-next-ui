import { TNavigateMode } from '@/app/api/v1/navigate/[mode]/(interfaces)'
import { Page } from 'playwright'

export const navigateMode = (mode: TNavigateMode) => {
  switch (mode) {
    case 'woodcutting':
    case 'mining':
    case 'fishing':
    case 'alchemy':
    case 'smelting':
    case 'cooking':
    case 'forge':
    case 'shadow-mastery':
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

export const onSwitchCharacter = async (page: Page, index: number) => {
  await page.keyboard.press(`Alt+${index}`)
  await page.waitForURL('**', { waitUntil: 'networkidle' })
}
