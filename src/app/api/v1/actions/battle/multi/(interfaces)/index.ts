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
  // chainAction: string[]
  chainAction: string
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
