export const battleSelector = {
  emptyHunt: '//*[@id="game-container"]/div/div[2]/div[1]/div[1]/div[2]/div/div/div/div[1]/button',
  timeHunt: '//*[@id="game-container"]/div/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div/div/span',
  maxBattleBtn: '//*[@id="game-container"]/div/div[2]/div[1]/div[1]/div[2]/div/div[2]/div[1]/button',
  maxBattleCount: '//*[@id="game-container"]/div/div[2]/div[1]/div[1]/div[2]/div/div[2]/div[1]/button/div',
  huntAgain: '//*[@id="game-container"]/div/div[2]/div[1]/div[1]/div[2]/div/div[2]/div[2]/button',
  boss: {
    waitTime: '//*[@id="game-container"]/div/div[2]/div[1]/div[1]/div[4]/div/div/button/div/span',
    start: '//*[@id="game-container"]/div/div[2]/div[2]/div/div[2]/div/div[2]/form/div/button',
  },
  dungeons: {
    select: '//*[@id="game-container"]/div/div[2]/div[1]/div[1]/div[6]/div/div/button[1]',
    start: '',
  },
}
