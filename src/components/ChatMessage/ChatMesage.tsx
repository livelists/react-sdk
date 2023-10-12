/** @jsx jsx */
/**  @jsxFrag */
import React, { useEffect, useRef } from 'react';

import { css, jsx } from '@emotion/react';
import { LocalMessage, MessageType } from 'livelists-js-core';

import { SystemMessageBlock } from '../../atoms/SystemMessageBlock';
import { Text } from '../../atoms/Text';
import { useIntersectionObserver } from '../../hooks/common/useIntersectionObserver';
import { IReadMessageArgs } from '../../types/channel.types';
import { getDayTime } from '../../utils/date/getDayTime';
import { Avatar } from '../Avatar';
import { SystemMessage } from '../SystemMessage';
import { UnreadLabel } from './UnreadLabel';

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
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 2px;
    gap: 15px;
`;

const messageCloud = ({ isMy }:{ isMy: boolean }) => css`
  border-radius: ${isMy ? '12px 12px 12px 12px' : '5px 12px 12px 12px'};
  background: ${isMy ? '#78E378' : 'white'};
  font-size: 14px;
  padding: 4px 11px;
  color: ${isMy ? 'white' : 'black'};
  box-shadow: rgba(0, 0, 0, 0.25) 0 4px 4px 0;
`;

interface IProps {
    className?: string,
    localMessage: LocalMessage,
    readMessage?: (args:IReadMessageArgs) => void,
    prevMessageCreatedAt?: Date,
}

const ChatMessage:React.FC<IProps> = ({
    className,
    localMessage,
    readMessage,
    prevMessageCreatedAt,
}) => {
    const messageRef = useRef<HTMLDivElement>(null);
    console.log(localMessage.message.localMeta.isFirstUnSeen);

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
            isFirstUnSeen,
        }
    } = localMessage.message;

    const intersection = useIntersectionObserver(messageRef, {
        freezeOnceVisible: true,
    });

    useEffect(() => {
        if (intersection && id && readMessage) {
            readMessage({
                messageId: id,
            });
        }
    }, [intersection, id]);

    if (type == MessageType.System) {
        return (
            <>
                {isFirstUnSeen && (
                    <UnreadLabel />
                )}
                <SystemMessage localMessage={localMessage}/>
            </>
        );
    }

    const isFirstMessageInDay = prevMessageCreatedAt ? prevMessageCreatedAt.getDay() !== createdAt?.getDay() : false;

    return (
        <>
            {isFirstUnSeen && (
                <UnreadLabel />
            )}
            {(isFirstMessageInDay && createdAt) && (
                <SystemMessageBlock
                    text={getDayTime({
                        date: createdAt,
                    })}
                />
            )}
            <div
                className={className}
                css={cont({ isMy })}
                ref={messageRef}
            >
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
        </>
    );
};

export default React.memo(ChatMessage);
