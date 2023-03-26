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
    const [isProvider, providerLoading, providerError] = useDocumentData(user?.uid ? doc(db, `/Provider/${user?.uid}`) : undefined)


    useEffect(() => {
        if (providerLoading || loading) return;
        if (!user) router.push('/login')
        if (!!isProvider) {
            router.push('/provider')
        } else {
            router.push('/patient')
        }
    }, [user, isProvider]);

    return (
        <main css={[centeredPage, {
            gap: '0.25rem'
        }]}>
            <Header>Redirecting...</Header>
        </main>
    )
}

export default Redirect
 