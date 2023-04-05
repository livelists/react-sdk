import React from 'react';

import { Message } from 'livelists-js-core';

import { Text } from '../../atoms/Text';
import { cnb } from '../../utils/helpers/cnb';
import styles from './ChatMessage.module.css';

interface IProps {
    className?: string,
    message: Message,
}

const ChatMessage:React.FC<IProps> = ({
    className,
    message,
}) => {

    return (
        <div className={cnb(styles.cont, className)}>
            <Text>
                {message.text}
            </Text>
            <Text>
                {message.createdAt?.getTime()}
            </Text>
        </div>
    );
};

export default React.memo(ChatMessage);
