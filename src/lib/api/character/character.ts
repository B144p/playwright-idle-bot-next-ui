import { skillSelector } from '@/app/api/test/actions/(constances)'
import { ICharacter } from '@/lib/api/character/interfaces'

const onSelectSkilPath = (index: number) =>
  `//*[@id="game-container"]/div[1]/div[1]/div[2]/div[2]/ul/button[${index}]/li`

const activaeCharacters: ICharacter[] = [
  {
    name: 'bTset',
    charIndex: 1,
    skill: {
      mode: 'shadow-mastery',
      chainAction: [onSelectSkilPath(3), skillSelector.dialogSubmit],
    },
  },
  {
    name: 'bTsetRo',
    charIndex: 2,
    skill: {
      mode: 'shadow-mastery',
      chainAction: [
        onSelectSkilPath(3),
        '//*[@id="game-container"]/div[2]/div[1]/div/div[2]/div/div[2]/form/div/button',
      ],
    },
  },
  // {
  //   name: 'bTsetLum',
  //   charIndex: 3,
  //   action: 'woodcutting',
  // },
  {
    name: 'bTsetCurse',
    charIndex: 4,
    skill: {
      mode: 'shadow-mastery',
      chainAction: [
        onSelectSkilPath(3),
        '//*[@id="game-container"]/div[2]/div[1]/div/div[2]/div/div[2]/form/div/button',
      ],
    },
  },
]

export const getActiveChar = async () => {
  return {
    characters: activaeCharacters,
  }
}
