import { css, Global } from '@emotion/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../components/Button'
import Header from '../components/Header'
import { center, centeredPage, colors, main } from '../components/styles'

const Home: NextPage = () => {
  return (
    <main css={[centeredPage, {
      gap: '0.25rem'
    }]}>
      <Header>TalkTo<span css={{ color: colors.main }}>Med</span></Header>
      <Link passHref href='/login'>
        <Button fullWidth>Patient and Provider Login</Button>
      </Link>
    </main>
  )
}

export default Home
