import { doc } from '@firebase/firestore'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Button from '../../components/Button'
import Header from '../../components/Header'
import { centeredPage } from '../../components/styles'
import Table from '../../components/Table'
import { auth, db } from '../../script/firebaseConfig'


const ProviderDashboard: NextPage = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userData, dataLoading, dataError] = useDocumentData(user?.uid ? doc(db, `/UserClassification/${user?.uid}`) : undefined)

    return (
        <main css={[centeredPage, {
            gap: '0.25rem'
        }]}>
            <Header>Welcome, </Header>
            <Link passHref href='/provider/enroll'>
                <Button fullWidth>Enroll New Patient</Button>
            </Link>
            <Table>

            </Table>
        </main>
    )
}

export default ProviderDashboard
