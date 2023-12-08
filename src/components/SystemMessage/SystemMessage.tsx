/** @jsx jsx */
import React from 'react';

import { jsx } from '@emotion/react';
import { LocalMessage } from 'livelists-js-core';

import { SystemMessageBlock } from '../../atoms/SystemMessageBlock';
import { getUserNameFromUser } from '../../utils/string/getUserNameFromUser';

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
            sender,
        },
        localMeta: {
            isMy,
        },
    } = localMessage.message;

    const userText = sender ? getUserNameFromUser(sender) : text;

    let messageText = `${userText} joined the chat`;

    if (isMy) {
        messageText = 'You joined the chat';
    }


    return (
        <SystemMessageBlock
            isBottomMargin
            text={messageText}
        />
    );
};

export default React.memo(SystemMessage);
