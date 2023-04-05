import React from 'react';

import { cnb } from '../../../utils/helpers/cnb';
import styles from './HistoryMessages.module.css';

interface IProps {
    className?: string,
}

const HistoryMessages:React.FC<IProps> = ({ className }) => {

    return (
        <div className={cnb(styles.cont, className)}>

        </div>
    );
};

export default React.memo(HistoryMessages);
