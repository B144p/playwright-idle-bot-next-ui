import { client } from '@/lib/api/client'

interface IBasicPostResponse {
  message: string
}

export function useOpenBrowser() {
  const onOpenBrowser = async () => {
    const { data } = await client.post<IBasicPostResponse>('/api/v1/open-browser')

    console.log('onOpenBrowser.data', { data })
  }
  return { onOpenBrowser }
}
