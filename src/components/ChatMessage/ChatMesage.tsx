import React from 'react';

import { LocalMessage } from 'livelists-js-core';

import { Text } from '../../atoms/Text';
import { cnb } from '../../utils/helpers/cnb';
import styles from './ChatMessage.module.css';

interface IProps {
    className?: string,
    localMessage: LocalMessage,
}

const ChatMessage:React.FC<IProps> = ({
    className,
    localMessage,
}) => {
    const {
        message: {
            text,
            createdAt,
        }
    } = localMessage.message;

    return (
        <div className={cnb(styles.cont, className)}>
            <Text>
                {text}
            </Text>
            <Text>
                {createdAt?.getTime()}
            </Text>
        </div>
    );
};

export default React.memo(ChatMessage);
