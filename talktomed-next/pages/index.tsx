import { css, Global } from '@emotion/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Button from '../components/Button'
import Header from '../components/Header'
import { center, colors, main } from '../components/styles'

const globalStyles= css({
  '*': {
    fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`
  },
  "body": {
    margin: 0,
    padding: 0
  }
});

const Home: NextPage = () => {
  return (
    <div css={main}>
      <Global styles={globalStyles} />
      <main css={[center, {
        gap: '0.25rem'
      }]}>
        <Header>TalkTo<span css={{ color: colors.main }}>Med</span></Header>
        <Button fullWidth>Log In</Button>
        <Button fullWidth>Sign Up</Button>
      </main>
    </div>
  )
}

export default Home
