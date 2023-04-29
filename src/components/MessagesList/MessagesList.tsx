import React, { ReactNode } from 'react';

import { ScrollBar } from '../../atoms/ScrollBar';
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
            <ScrollBar
                style={{
                    height: '500px'
                }}
            >
                {children}
            </ScrollBar>
        </div>
    );
};

export default React.memo(MessagesList);
