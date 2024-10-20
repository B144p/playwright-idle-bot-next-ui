export const battleSelector = {
  enemies: {
    container: '//*[@id="game-container"]/div/div[2]/div[1]/div[1]/div[2]',
    startHunt: '//*[@id="game-container"]/div/div[2]/div[1]/div[1]/div[2]/div/div/div/div/button',
    huntMore: '//*[@id="game-container"]/div/div[2]/div[1]/div[1]/div[2]/div/div[2]/div/button',
    allMon: '//*[@id="game-container"]/div/div[2]/div[1]/div[1]/div[2]/div/div[1]',
  },
  battleModal: {
    container: '//*[@id="location"]',
    food: {
      addBtn: '//*[@id="game-container"]/div/div[2]/div[2]/div/div[2]/div/form/div[2]/div[3]/div/button',
      list: {
        select: '//*[@id="game-container"]/div/div[2]/div[3]/div[1]/div/div[2]/div[2]/div',
        max: '//*[@id="game-container"]/div/div[2]/div[3]/div[2]/div/div[2]/div/div/div[4]/form/div[1]/div/button[1]',
        add: '//*[@id="game-container"]/div/div[2]/div[3]/div[2]/div/div[2]/div/div/div[4]/form/div[2]/button',
      },
    },
    stanceSelector: '//*[@id="location"]',
    confirm: '//*[@id="game-container"]/div/div[2]/div[2]/div/div[2]/div/form/div[4]/div/button',
  },
  timeBattle: '//*[@id="game-container"]/div/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div/div/span',
}

export enum EBattleMode {
  empty,
  hunting,
  founded,
}

export enum EStance {
  all,
  str,
  def,
  agi,
  dex,
}
