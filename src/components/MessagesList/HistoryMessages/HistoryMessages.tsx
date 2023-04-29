import React from 'react';

import { LocalMessage } from 'livelists-js-core';

import { cnb } from '../../../utils/helpers/cnb';
import { ChatMessage } from '../../ChatMessage';
import styles from './HistoryMessages.module.css';

interface IProps {
    className?: string,
    messages: LocalMessage[],
}

const HistoryMessages:React.FC<IProps> = ({
    className,
    messages,
}) => {

    return (
        <div className={cnb(styles.cont, className)}>
            {messages?.map((m) =>(
                <ChatMessage
                    key={m.message.message.id}
                    localMessage={m}
                />
            ))}
        </div>
    );
};

export default React.memo(HistoryMessages);
