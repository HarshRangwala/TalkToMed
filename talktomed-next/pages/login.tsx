import type { NextPage } from 'next'
import Button from '../components/Button'
import Header from '../components/Header'
import { centeredPage } from '../components/styles'
import TextField from '../components/TextField'

const Home: NextPage = () => {
  return (
    <main css={[centeredPage, {
      gap: '0.25rem'
    }]}>
      <Header>Log In</Header>
      <TextField fullWidth type='email' placeholder='Email Address' />
      <TextField fullWidth type='password' placeholder='Password' />
      <Button fullWidth>Log In</Button>
    </main>
  )
}

export default Home
