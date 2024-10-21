import { TNavigateMode } from '@/app/api/v1/navigate/[mode]/(interfaces)'

export interface ICharacter {
  name: string
  charIndex: number
  skill: {
    mode: Exclude<TNavigateMode, 'login' | 'inventory' | 'market' | 'vendor' | 'battle' | 'pets' | 'guilds'>
    // itemIndex: number
    chainAction: string[]
  }
}
