import { TNavigateMode } from '@/app/api/v1/navigate/[mode]/(interfaces)'
import { client } from '@/lib/api/client'

interface IBasicPostResponse {
  message: string
}

export function useRedirect() {
  const onNavigate = async (mode: TNavigateMode) => {
    // const { data } = await client.post<IBasicPostResponse>(`/api/v1/navigate/${mode}`)
    await client.post<IBasicPostResponse>(`/api/v1/navigate/${mode}`)

    // console.log('onNavigate.data', { data })
  }
  return { onNavigate }
}
