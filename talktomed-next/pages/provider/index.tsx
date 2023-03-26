import { collection, doc } from '@firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import Button from '../../components/Button'
import Header from '../../components/Header'
import { centeredPage } from '../../components/styles'
import Table from '../../components/Table'
import { auth, db } from '../../script/firebaseConfig'
import { faEye } from '@fortawesome/free-solid-svg-icons';


const ProviderDashboard: NextPage = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userData, dataLoading, dataError] = useDocumentData(user?.uid ? doc(db, `/UserClassification/${user?.uid}`) : undefined);
    const [patients, patientsLoading, patientsError] = useCollection(collection(db, 'Patients'));

    return (
        <main css={[centeredPage, {
            gap: '0.25rem'
        }]}>
            <Header>Welcome, {userData?.["Doctor's Name"] || 'Provider'}</Header>
            <Link passHref href='/provider/enroll'>
                <Button fullWidth>Enroll New Patient</Button>
            </Link>
            <Table>
                <thead>
                    <th>Name</th>
                    <th>DOB</th>
                    <th>Actions</th>
                </thead>
                {patients?.docs.map((doc) => {
                    const data = doc.data()
                    return (
                        <tr key={data.id}>
                            <td>{data.Name}</td>
                            <td>{new Date(data.DOB.seconds * 1000).toLocaleDateString()}</td>
                            <td>
                                <Link href={`/provider/${doc.id}`}>
                                    <FontAwesomeIcon icon={faEye} />
                                </Link>
                            </td>
                        </tr>
                    )
                })}
            </Table>
        </main>
    )
}

export default ProviderDashboard
