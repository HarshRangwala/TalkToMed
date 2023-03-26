import type { NextPage } from 'next'
import { ChangeEventHandler, Dispatch, SetStateAction, useEffect, useState } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import { centeredPage } from '../components/styles'
import TextField from '../components/TextField'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../script/firebaseConfig'
import { AuthError  } from 'firebase/auth'
import { useRouter } from 'next/router'

const parseError = (err: AuthError | undefined) => {
  if (!err) return undefined;
  if (err.code == 'auth/not-found') return 'The user was not found.';
  return 'There was an error. Please try again.'
}

const Home: NextPage = () => {
  const router = useRouter();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      router.push('/redirect')
    }
  }, [user])

  const signIn = () => signInWithEmailAndPassword(email, password)


  const set = (setter: Dispatch<SetStateAction<string>>): ChangeEventHandler<HTMLInputElement> => (event) => (
    setter(event.target.value)
  )

  return (
    <main css={[centeredPage, {
      gap: '0.25rem'
    }]}>
      <Header>Log In</Header>
      <TextField onChange={set(setEmail)} fullWidth type='email' placeholder='Email Address' />
      <TextField onChange={set(setPassword)} fullWidth type='password' placeholder='Password' />
      <Button loading={loading} error={parseError(error)} onClick={signIn} fullWidth>Log In</Button>
    </main>
  )
}

export default Home
 