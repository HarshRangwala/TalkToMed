import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import { doc } from 'firebase/firestore'
import Button from '../../../components/Button'
import Header from '../../../components/Header'
import { centeredPage } from '../../../components/styles'
import { auth, db } from '../../../script/firebaseConfig'

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
            .
        </main>
    )
}

export default Home
