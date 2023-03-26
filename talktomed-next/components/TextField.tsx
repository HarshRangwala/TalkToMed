import { css } from "@emotion/react";
import { FC, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
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

// export type TextFieldProps =  any {
//   fullWidth?: boolean,
//   error?: boolean,
//   textArea?: boolean,

// }

const TextField: FC<any> = props => {
  const { textArea, fullWidth, error, ...rest } = props;
  const propsToPass = {
    css: css([
      {
        alignSelf: fullWidth ? 'stretch' : undefined,
        border: `3px solid ${colors.background_dark}`,
        backgroundColor: colors.background,
        fontSize: '1em',
        padding: '0.5rem 1rem',
      }, error && {
        borderColor: colors.main
      }, rounded]),
    ...rest
  }
  return textArea ? (
    <textarea {...propsToPass}></textarea>
  ): (
    <input {...propsToPass} />
  )
}

export default TextField