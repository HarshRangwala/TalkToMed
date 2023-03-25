import { FC, ReactNode } from "react";

export type HeaderProps = {
    children?: ReactNode
}

const Header: FC<HeaderProps> = props => {
    const {children} = props;
    return (
        <h1>
            {children}
        </h1>
    )
}

export default Header