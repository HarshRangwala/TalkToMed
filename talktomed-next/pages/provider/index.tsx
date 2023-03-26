import type { NextPage } from 'next'
import Link from 'next/link'
import Button from '../../components/Button'
import Header from '../../components/Header'
import { centeredPage } from '../../components/styles'



const ProviderDashboard: NextPage = () => {

    return (
        <main css={[centeredPage, {
            gap: '0.25rem'
        }]}>
            <Header>Welcome, provider.</Header>
            <Link passHref href='/provider/enroll'>
                <Button fullWidth>Enroll New Patient</Button>
            </Link>

        </main>
    )
}

export default ProviderDashboard
