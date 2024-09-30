import { TNavigateMode } from '@/app/api/v1/navigate/[mode]/(interfaces)'

export interface IQueueTask {
  char: number
  action: () => void
  timeOut: number
}

export interface ICharacter {
  name: string
  duration: {
    maxSkill: number
    boss?: number
  }
  action: Exclude<TNavigateMode, 'login' | 'inventory' | 'market' | 'vendor' | 'battle' | 'pets' | 'guilds'>
  chainAction: string[]
}

interface IActionSkill {
  action: 'woodcutting' | 'mining' | 'fishing' | 'alchemy' | 'smelting' | 'cooking' | 'forge'
  duration: {
    maxSkill: number
    boss?: number
  }
  chainSelector: string[]
}

interface IActionBattle {
  action: 'battle'
}
