import type { NextPage } from 'next'
import { ChangeEventHandler, useEffect, useState } from 'react'
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

const Home: NextPage = () => {
    const router = useRouter();
    const patient = router.query.patient ?? '';
    const [user, authLoading, authError] = useAuthState(auth);
    const [userData, dataLoading, dataError] = useDocumentData(user?.uid ? doc(db, `/Provider/${user?.uid}`) : undefined)
    const [patientData, patientLoading, patientError] = useDocumentData(patient ? doc(db, `/Patients/${patient}`) : undefined)
    const [email, setEmail] = useState('');
    const loading = authLoading || dataLoading || patientLoading;
    const [enrollState, setEnrollState] = useState<Promise<any>>();

    useEffect(() => {
        if (!user || !userData) return;
        if (userData.type == 'patient') router.push('/patient')
    }, [user, userData]);

    return (
        <main css={[centeredPage, {
            gap: '0.25rem'
        }]}>
            <Header closeToPath='/provider'>{patientData ? patientData.Name : "Loading..."}</Header>
            <Button fullWidth>Send Message</Button>
        </main>
    )
}

export default Home
