'use client'

import { PostRequestBody } from '@/app/api/v1/login/(interfaces)'
import { useLogin } from '@/app/hooks/use-login'
import { useOpenBrowser } from '@/app/hooks/use-open-browser'
import { useRedirect } from '@/app/hooks/use-redirect'
import { useSkillAction } from '@/app/hooks/use-skill-action'
import styles from '@/app/page.module.css'
import { client } from '@/lib/api/client'

export default function Home() {
  const { onOpenBrowser } = useOpenBrowser()
  const { onNavigate } = useRedirect()
  const { onFillFormLogin, onLogin } = useLogin()

  const { onSelectItemSkill, onConfirmAction } = useSkillAction()

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

  const onBattleSingleCharacter = async () => {
    const { data } = await client.post('/api/v1/actions')

    console.log('onBattleSingleCharacter.data', { data })
  }

  const onBattleMultiCharacter = async () => {
    const { data } = await client.post('/api/v1/actions/battle/multi')

    console.log('onBattleMultiCharacter.data', { data })
  }

  const onSkillMultiCharacter = async () => {
    const { data } = await client.post('/api/v1/actions/skill')

    console.log('onSkillMultiCharacter.data', { data })
  }

  return (
    <div className={styles.page}>
      {/* <button onClick={testGetAPI}>GET API</button>
      <button onClick={testPostAPI}>POST API</button>
      <div style={{ border: '1px solid white', width: '100%' }} /> */}
      <section style={{ width: '100%', display: 'flex', gap: 16 }}>
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <b>Zone: Login page</b>
          <button onClick={onOpenBrowser}>Open Browser</button>
          <button onClick={() => onNavigate('login')}>Goto Login</button>
          <button onClick={onFillFormLogin}>Fill form</button>
          <button onClick={onLogin}>Submit Login</button>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <b>Zone: Skill Activation</b>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onOpenBrowser}>Switch charactor: 1st</button>
            <button onClick={onOpenBrowser}>Switch charactor: 2nd</button>
          </div>
          <button onClick={() => onNavigate('woodcutting')}>Goto Skill: woodcutting</button>
          <button onClick={() => onSelectItemSkill(3)}>Select item skill</button>
          <button onClick={onConfirmAction}>Confirm action</button>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <b>Zone: Battle</b>
          <button onClick={onBattleSingleCharacter}>Battle single char</button>
          <button onClick={onBattleMultiCharacter}>Battle multi char</button>
          <hr style={{ marginTop: '1rem' }} />
          <b>Zone: Skills</b>
          <button onClick={onSkillMultiCharacter}>Skill multi char</button>
        </div>
      </section>
    </div>
  )
}
