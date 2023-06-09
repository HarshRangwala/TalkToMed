import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { FC, ReactNode } from "react";
import { colors } from "./styles";

export type TableProps = {
    children?: ReactNode
}

const Table: FC<TableProps> = props => {
    const { children } = props;
    return (
        <table css={[{
            backgroundColor: colors.background_dark,
            borderRadius: '1rem',
            tableLayout: 'fixed',
            width: '100%',
            textAlign: 'center',
            '& tr': {
                padding: '0.5em 0'
            }
        }]}>
            {children}
        </table>
    )
}

export default Table