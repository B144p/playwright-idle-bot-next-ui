export * from '@/lib/utils/navigate'

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const calculateTime = (timeStr: string) =>
  // time-format => min:second
  timeStr
    .split(':')
    .reverse()
    .reduce((acc, cur, index) => acc + Number(cur) * 60 ** index, 1) * 1000
