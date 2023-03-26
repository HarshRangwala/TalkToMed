import type { NextPage } from 'next'
import { ChangeEventHandler, Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import { centeredPage } from '../components/styles'
import TextField from '../components/TextField'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { auth, db } from '../script/firebaseConfig'
import { AuthError, UserCredential  } from 'firebase/auth'
import { useRouter } from 'next/router'
import { doc } from 'firebase/firestore'

const parseError = (err: AuthError | undefined) => {
  if (!err) return undefined;
  if (err.code == 'auth/not-found') return 'The user was not found.';
  return 'There was an error. Please try again.'
}

const Home: NextPage = () => {
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const [userData, dataLoading, dataError] = useDocumentData(user?.user?.uid ? doc(db, `/UserClassification/${user?.user?.uid}`) : undefined)
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!userData) return;
    if (userData?.type == 'provider') {
      router.push('/provider')
    } else {
      router.push('/patient')
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
      <Button loading={loading || dataLoading} error={parseError(error)} onClick={signIn} fullWidth>Log In</Button>
    </main>
  )
}

export default Home
 