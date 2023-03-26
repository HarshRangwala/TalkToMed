import type { NextPage } from 'next'
import Header from '../components/Header'
import { centeredPage } from '../components/styles'
import { doc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { auth, db } from '../script/firebaseConfig'



const Redirect: NextPage = () => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [userData, dataLoading, dataError] = useDocumentData(user?.uid ? doc(db, `/UserClassification/${user?.uid}`) : undefined)


    useEffect(() => {
        if (!dataLoading || loading) return;
        if (!user) {
            router.push('/login')
        }
        if (userData?.type == 'provider') {
            router.push('/provider')
        } else {
            router.push('/patient')
        }
    }, [user, userData]);

    return (
        <main css={[centeredPage, {
            gap: '0.25rem'
        }]}>
            <Header>Redirecting...</Header>
        </main>
    )
}

export default Redirect
