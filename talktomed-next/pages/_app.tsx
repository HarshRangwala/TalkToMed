import { Global } from "@emotion/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { main } from "../components/styles";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const globalStyles = ({
  '*': {
    fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`
  },
  "body": {
    margin: 0,
    padding: 0
  }
});

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <div css={main}>
    <Script src="https://kit.fontawesome.com/f34b5430c2.js" crossOrigin="anonymous" />
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </div>
  )
}

export default App