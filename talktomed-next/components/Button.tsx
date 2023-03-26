import { ButtonHTMLAttributes, Component, FC, ReactNode } from "react";
import { colors, rounded } from "./styles";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: ReactNode,
    fullWidth?: boolean,
    loading?: boolean,
    error?: string,
    lightVariant?: boolean
}

const Button: FC<ButtonProps> = props => {
    let { children, fullWidth, loading, error, lightVariant, ...rest } = props;
    return (
        <>
            <button css={[
                fullWidth && { alignSelf: "stretch" },
                {
                    backgroundColor: colors.main,
                    color: colors.background,
                    '&:hover,&:active': {
                        backgroundColor: colors.main_dark
                    },
                    border: 'none',
                    fontSize: '1em',
                    padding: '0.5rem 1rem'
                },
                (loading || lightVariant) && {
                    backgroundColor: colors.background_dark,
                    text: colors.grey
                },
                rounded
            ]} {...rest}>
                {children}
            </button>
            {error && <p css={{color: 'red'}}>{error}</p>}
        </>
    )
}

export default Button