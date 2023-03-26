import type { NextPage } from 'next'
import Header from '../components/Header'
import { centeredPage } from '../components/styles'
import { doc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { db, auth } from '../script/firebaseConfig'



const Home: NextPage = () => {
    const [user, authLoading, authError] = useAuthState(auth);
    const [patientData, patientLoading, patientError] = useDocumentData(user?.uid ? doc(db, `/Patients/${user.uid}`) : undefined)

    return (
        <main css={[centeredPage, {
            gap: '0.25rem'
        }]}>
            <Header>Welcome, {patientData ? patientData.Name : "patient"}.</Header>
        </main>
    )
}

export default Home
