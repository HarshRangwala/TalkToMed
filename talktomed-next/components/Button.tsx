import { Component, FC, ReactNode } from "react";
import { colors, rounded } from "./styles";

export type ButtonProps = {
    children?: ReactNode,
    fullWidth?: boolean
}

const Button: FC<ButtonProps> = props => {
    let {children, fullWidth, ...rest} = props;
    return (
        <button css={[{
            alignSelf: fullWidth ? 'stretch' : undefined,
            backgroundColor: colors.main,
            color: colors.background,
            '&:hover,&:active': {
                backgroundColor: colors.main_dark
            },
            border: 'none',
            fontSize: '1em',
            padding: '0.5rem 1rem'
        }, rounded]} {...rest}>
            {children}
        </button>
    )
}

export default Button