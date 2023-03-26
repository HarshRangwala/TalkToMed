import type { NextPage } from 'next'
import { ChangeEventHandler, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { AuthError, User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { doc } from 'firebase/firestore'
import Button from '../../components/Button'
import Header from '../../components/Header'
import { centeredPage } from '../../components/styles'
import TextField from '../../components/TextField'
import { auth, db } from '../../script/firebaseConfig'
import axios, { AxiosResponse } from 'axios'

const parseError = (err: AuthError | undefined) => {
    if (!err) return undefined;
    if (err.code == 'auth/not-found') return 'The user was not found.';
    return 'There was an error. Please try again.'
}

type FormData = {
    'Cell number'?: string,
    'DOB'?: string,
    'Height'?: string,
    "Patient's Name"?: string
}

const useEnrollUser = () => {
    const [result, setResult] = useState<AxiosResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>();
    const enroll = async (formData: FormData, user: User) => {
        try {
            setResult(await axios.postForm('ENDPOINT', formData, {
                headers: {
                    'Authorization': `Bearer ${user.getIdToken()}`
                }
            }))
        } catch (e) {
            setError(e as Error)
        }
    }

    return [
        enroll, result, loading, error
    ] as const;
}

const Home: NextPage = () => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [enroll, result, enrollLoading, enrollError] = useEnrollUser();
    const [userData, dataLoading, dataError] = useDocumentData(user?.uid ? doc(db, `/UserClassification/${user?.uid}`) : undefined)
    const [formData, setFormData] = useState<FormData>({});
    const [email, setEmail] = useState('');
    const [enrollState, setEnrollState] = useState<Promise<any>>();

    useEffect(() => {
        if (!user || !userData) return;
        if (userData.type == 'patient') router.push('/patient')
    }, [user, userData]);

    const set = (key: keyof FormData): ChangeEventHandler<HTMLInputElement> => (event) => (
        setFormData(f => ({ [key]: event.target.value, ...f }))
    )

    return (
        <main css={[centeredPage, {
            gap: '0.25rem'
        }]}>
            <Header>Enroll Patient</Header>
            <TextField onChange={set("Patient's Name")} fullWidth placeholder='Full Name' />
            <TextField onChange={(e) => setEmail(e.target.value)} fullWidth type="Email" placeholder='Email' />
            <TextField onChange={set('Cell number')} fullWidth placeholder='Phone Number' />
            <TextField onChange={set('Height')} fullWidth placeholder='Height' />
            <Button error={enrollError?.message as string} loading={loading || dataLoading || enrollLoading} onClick={user ? (() => enroll(formData, user)) : undefined} fullWidth>Log In</Button>
        </main>
    )
}

export default Home