import { client } from '@/lib/api/client'

interface IBasicPostResponse {
  message: string
}

export function useLogin() {
  const onFillFormLogin = async () => {
    const { data } = await client.post<IBasicPostResponse>('/api/v1/login/fill-form')

    console.log('onFillFormLog.data', { data })
  }

  const onLogin = async () => {
    const { data } = await client.post<IBasicPostResponse>('/api/v1/login/submit')

    console.log('onLogin.data', { data })
  }

  return { onFillFormLogin, onLogin }
}
