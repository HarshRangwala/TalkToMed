import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { FC, ReactNode } from "react";
import { colors } from "./styles";

export type HeaderProps = {
    children?: ReactNode,
    closeToPath?: string,
    onClose?: () => void
}

const Header: FC<HeaderProps> = props => {
    const { children, closeToPath, onClose } = props;
    return (
        <h1 css={[{
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center'
        }, (closeToPath || onClose) && {
            justifyContent: 'space-between'
        }]}>
            {children}
            {closeToPath && <Link href={closeToPath}>
                <FontAwesomeIcon icon={faTimes} css={{ marginLeft: 'auto', 
            '&:hover': {
                color: colors.grey
            } }} />
            </Link>}
            {onClose && <div onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} css={{ marginLeft: 'auto', 
            '&:hover': {
                color: colors.grey
            } }} />
            </div>}
        </h1>
    )
}

export default Header