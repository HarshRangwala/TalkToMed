import type { NextPage } from 'next'
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { AuthError, createUserWithEmailAndPassword, User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { collection, doc, setDoc } from 'firebase/firestore'
import Button from '../../components/Button'
import Header from '../../components/Header'
import { centeredPage } from '../../components/styles'
import TextField from '../../components/TextField'
import { auth, db } from '../../script/firebaseConfig'
import axios, { AxiosError, AxiosResponse } from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const parseError = (err: AuthError | undefined) => {
    if (!err) return undefined;
    if (err.code == 'auth/not-found') return 'The user was not found.';
    return 'There was an error. Please try again.'
}

type EnrollFormData = {
    'Cell number'?: string,
    'DOB'?: string,
    'Height'?: string,
    "Patient's Name"?: string
}

const useEnrollUser = () => {
    const router = useRouter();
    const [result, setResult] = useState<AxiosResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>();
    const enroll = async (formData: EnrollFormData, email: string, user: User) => {
        setLoading(true);
        try {
            await axios.post('/api/createuser', {
                email, formData
            }, {
                headers: {
                    'Authorization': `Bearer ${await user.getIdToken(true)}`
                }
            })
            setLoading(false)
            router.push('/provider')
        } catch (e) {
            setLoading(false);
            console.error(e)
            setError((e as AxiosError)?.response?.data as Error ?? 'error')
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
    const [userData, dataLoading, dataError] = useDocumentData(user?.uid ? doc(db, `/Patients/${user?.uid}`) : undefined)
    const [formData, setFormData] = useState<EnrollFormData>({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [enrollState, setEnrollState] = useState<Promise<any>>();

    useEffect(() => {
        if (!user || !userData) return;
        if (userData) router.push('/patient')
    }, [user, userData]);

    const set = (key: keyof EnrollFormData): ChangeEventHandler<HTMLInputElement> => (event) => (
        setFormData(f => ({ [key]: event.target.value, ...f }))
    )

    return (
        <main css={[centeredPage, {
            gap: '0.25rem'
        }]}>
            <Header closeToPath='/provider'>Enroll Patient</Header>
            <TextField onChange={set("Patient's Name")} fullWidth placeholder='Full Name' />
            <TextField error={enrollError?.error == 'Email'} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} fullWidth type="Email" placeholder='Email' />
            <TextField onChange={set('Cell number')} fullWidth placeholder='Phone Number' />
            <TextField onChange={set('Height')} fullWidth placeholder='Height' />
            <Button error={enrollError?.message as string} loading={loading || dataLoading || enrollLoading} onClick={user ? (() => enroll(formData, email, user)) : undefined} fullWidth>Log In</Button>
        </main>
    )
}

export default Home
