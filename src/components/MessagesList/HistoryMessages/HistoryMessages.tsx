/** @jsx jsx */
import React from 'react';

import { css, jsx } from '@emotion/react';
import { LocalMessage } from 'livelists-js-core';

import { IReadMessageArgs } from '../../../types/channel.types';
import { ChannelMessageWrapper } from '../../ChannelMessageWrapper';
import { ChatMessage } from '../../ChatMessage';

const cont = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

interface IProps {
    className?: string,
    messages: LocalMessage[],
    readMessage?: (args:IReadMessageArgs) => void,
    onFindFirstNotSeen?: (args:{
        offsetTop: number,
    }) => void,
}

const HistoryMessages:React.FC<IProps> = ({
    className,
    messages,
    readMessage,
    onFindFirstNotSeen,
}) => {

    return (
        <div className={className} css={cont}>
            {messages?.map((m, index) => (
                <ChannelMessageWrapper
                    onFindFirstNotSeen={onFindFirstNotSeen}
                    readMessage={readMessage}
                    localMessage={m}
                    key={m.message.message.id}
                >
                    <ChatMessage
                        localMessage={m}
                        prevMessageCreatedAt={messages?.[index - 1]?.message?.message?.createdAt}
                    />
                </ChannelMessageWrapper>
            ))}
        </div>
    );
};

export default React.memo(HistoryMessages);
