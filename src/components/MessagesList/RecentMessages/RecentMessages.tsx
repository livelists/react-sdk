/** @jsx jsx */
import React from 'react';

import { css, jsx } from '@emotion/react';
import { LocalMessage } from 'livelists-js-core';

import { IReadMessageArgs } from '../../../types/channel.types';
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
}

const RecentMessages:React.FC<IProps> = ({
    className ,
    messages,
    readMessage,
}) => {

    return (
        <div className={className} css={cont}>
            {messages?.map((m) =>(
                <ChatMessage
                    readMessage={readMessage}
                    key={m.message.message.id}
                    localMessage={m}
                />
            ))}
        </div>
    );
};

export default React.memo(RecentMessages);
