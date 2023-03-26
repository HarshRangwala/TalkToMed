import { css } from "@emotion/react";
import { FC, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from "react";
import { colors, rounded } from "./styles";

const globalStyles = css({
  '*': {
    fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`
  },
  "body": {
    margin: 0,
    padding: 0
  }
});

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    fullWidth?: boolean
}

const TextField: FC<TextFieldProps> = props => {
    const {fullWidth, placeholder} = props;
    return (
        <input css={[{
            alignSelf: fullWidth ? 'stretch' : undefined,
            border: `3px solid ${colors.background_dark}`,
            backgroundColor: colors.background,
            fontSize: '1em',
            padding: '0.5rem 1rem',
        }, rounded]}
         {...props} />
    )
}

export default TextField