import React from 'react';

import { Message } from 'livelists-js-core';

import { cnb } from '../../../utils/helpers/cnb';
import { ChatMessage } from '../../ChatMessage';
import styles from './RecentMessages.module.css';

interface IProps {
    className?: string,
    messages: Message[],
}

const RecentMessages:React.FC<IProps> = ({
    className ,
    messages
}) => {

    return (
        <div className={cnb(styles.cont, className)}>
            {messages?.map((m) =>(
                <ChatMessage
                    key={m.id}
                    message={m}
                />
            ))}
        </div>
    );
};

export default React.memo(RecentMessages);
