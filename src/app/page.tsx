'use client'

import { PostRequestBody } from '@/app/api/v1/login/(interfaces)'
import styles from '@/app/page.module.css'
import { client } from '@/lib/api/client'

export default function Home() {
  const testGetAPI = async () => {
    const { data } = await client.get('/api/v1/login')
    console.log('test.GetAPI.data', { data })
  }

  const testPostAPI = async () => {
    const { data } = await client.post<PostRequestBody>('/api/v1/login', {
      title: 'My Post Title',
      content: 'This is the content of the post',
    })

    console.log('test.PostAPI.data', { data })
  }

  return (
    <div className={styles.page}>
      <button onClick={testGetAPI}>GET API</button>
      <button onClick={testPostAPI}>POST API</button>
    </div>
  )
}
