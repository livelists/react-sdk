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
  padding: 0 20px;
`;

interface IProps {
    className?: string,
    messages: LocalMessage[],
}

const RecentMessages:React.FC<IProps> = ({
    className ,
    messages
}) => {

    return (
        <div className={className} css={cont}>
            {messages?.map((m) =>(
                <ChatMessage
                    key={m.message.message.id}
                    localMessage={m}
                />
            ))}
        </div>
    );
};

export default React.memo(RecentMessages);
