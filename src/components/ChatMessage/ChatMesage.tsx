/** @jsx jsx */
import React, { useEffect } from 'react';

import { css, jsx } from '@emotion/react';
import { LocalMessage, MessageType } from 'livelists-js-core';

import { Text } from '../../atoms/Text';
import { IReadMessageArgs } from '../../types/channel.types';
import { getDayTime } from '../../utils/date/getDayTime';
import { Avatar } from '../Avatar';
import { SystemMessage } from '../SystemMessage';

const cont = ({ isMy }:{ isMy: boolean }) => css`
  display: flex;
  justify-content: ${isMy ? 'flex-end' : 'flex-start'};
  align-items: flex-start;
  width: 100%;
  gap: 12px;
  margin-bottom: 16px;
`;

const message = ({ isMy }:{ isMy: boolean }) => css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${isMy ? 'flex-end' : 'flex-start'};
  width: 80%;
`;

const sendInfo = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 2px;
    gap: 15px;
`;

const messageCloud = ({ isMy }:{ isMy: boolean }) => css`
  border-radius: ${isMy ? '12px 12px 12px 12px' : '5px 12px 12px 12px'};
  background: ${isMy ? '#78E378' : 'white'};
  font-size: 14px;
  padding: 4px 11px;
  color: ${isMy ? 'white' : 'black'}
`;

interface IProps {
    className?: string,
    localMessage: LocalMessage,
    readMessage?: (args:IReadMessageArgs) => void,
}

const ChatMessage:React.FC<IProps> = ({
    className,
    localMessage,
    readMessage,
}) => {
    const {
        message: {
            text,
            createdAt,
            sender,
            id,
            type,
        },
        localMeta: {
            isMy,
        }
    } = localMessage.message;


    useEffect(() => {
        if (id && readMessage) {
            readMessage({
                messageId: id,
            });
        }
    }, [id]);


    if (type == MessageType.System) {
        return (
            <SystemMessage localMessage={localMessage}/>
        );
    }

    return (
        <div className={className} css={cont({ isMy })}>
            {!isMy && (
                <Avatar
                    identifier={sender?.identifier?.[0]}
                />
            )}
            <div css={message({ isMy })}>
                <div css={messageCloud({ isMy })}>
                    {sender?.customData?.data?.username && (
                        <Text
                            customCss={`
                                font-weight: 500;
                                font-size: 16px;
                                color: #444444;
                                order: ${isMy ? 1 : 0}
                            `}
                        >
                            {sender.customData.data.username}
                        </Text>
                    )}
                    <Text
                        customCss={`
                            font-size: 16px;
                        `}
                    >
                        {text}
                    </Text>
                    <div css={sendInfo}>
                        {createdAt && (
                            <Text
                                customCss={`
                              font-size: 12px;
                              color: ${isMy ? 'white' : 1};
                              order: ${isMy ? 0 : 1}
                            `}
                            >
                                {getDayTime({
                                    date: createdAt,
                                })}
                            </Text>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ChatMessage);
