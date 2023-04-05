import React, { ReactNode } from 'react';

import { cnb } from '../../utils/helpers/cnb';
import styles from './MessagesList.module.css';

interface IProps {
    className?: string,
    children: ReactNode | ReactNode[],
}

const MessagesList:React.FC<IProps> = ({
    className,
    children,
}) => {

    return (
        <div className={cnb(styles.cont, className)}>
            {children}
        </div>
    );
};

export default React.memo(MessagesList);
