import { client } from '@/lib/api/client'

interface IBasicPostResponse {
  message: string
}

export function useSkillAction() {
  const onSelectItemSkill = async (item: number) => {
    // const onSelectSkilPath = (index: number) =>
    //   `//*[@id="game-container"]/div[1]/div[1]/div[3]/div[2]/ul/button[${index}]/li`

    const { data } = await client.post<IBasicPostResponse>(`/api/v1/${item}`)

    console.log('onSelectItemSkill.data', { data })
  }

  const onConfirmAction = async () => {
    // const skillDialogSubmitSelector = '//*[@id="game-container"]/div[2]/div[1]/div/div[2]/div/div[3]/form/div/button'
    const { data } = await client.post<IBasicPostResponse>('/api/v1/')

    console.log('onConfirmAction.data', { data })
  }

  return { onSelectItemSkill, onConfirmAction }
}
