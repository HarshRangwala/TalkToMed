import type { NextPage } from 'next'
import Header from '../components/Header'
import { centeredPage } from '../components/styles'
import { doc } from 'firebase/firestore'



const Home: NextPage = () => {

    return (
        <main css={[centeredPage, {
            gap: '0.25rem'
        }]}>
            <Header>Welcome, patient.</Header>
        </main>
    )
}

export default Home
