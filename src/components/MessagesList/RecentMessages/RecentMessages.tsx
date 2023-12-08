/** @jsx jsx */
import React from 'react';

import { css, jsx } from '@emotion/react';
import { LocalMessage } from 'livelists-js-core';

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
}

const RecentMessages:React.FC<IProps> = ({
    className ,
    messages,
}) => {

    return (
        <div className={className} css={cont}>
            {messages?.map((m, index) => (
                <ChatMessage
                    key={m.message.message.id}
                    localMessage={m}
                    prevMessageCreatedAt={messages?.[index - 1]?.message?.message?.createdAt}
                />
            ))}
        </div>
    );
};

export default React.memo(RecentMessages);
