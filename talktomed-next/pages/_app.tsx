import { Global } from "@emotion/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import css from "styled-jsx/css";
import { main } from "../components/styles";

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

const App: NextPage<AppProps> = ({ Component,  pageProps }) => {
    return (
        <div css={main}>
            <Global styles={globalStyles} />
            <Component {...pageProps} />
        </div>
    )
}

export default App