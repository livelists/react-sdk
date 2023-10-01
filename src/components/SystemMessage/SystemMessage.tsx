/** @jsx jsx */
import React from 'react';

import { jsx } from '@emotion/react';
import { LocalMessage } from 'livelists-js-core';

import { SystemMessageBlock } from '../../atoms/SystemMessageBlock';

interface IProps {
    className?: string,
    localMessage: LocalMessage,
}

const SystemMessage:React.FC<IProps> = ({
    className,
    localMessage,
}) => {
    const {
        message: {
            text,
        },
        localMeta: {
            isMy,
        }
    } = localMessage.message;

    let messageText = `${text} joined the chat`;

    if (isMy) {
        messageText = 'You joined the chat';
    }


    return (
        <SystemMessageBlock
            text={messageText}
        />
    );
};

export default React.memo(SystemMessage);
