/** @jsx jsx */
import React from 'react';

import { css, jsx } from '@emotion/react';
import { LocalMessage } from 'livelists-js-core';

import { Text } from '../../atoms/Text';
import { getDayTime } from '../../utils/date/getDayTime';
import { Avatar } from '../Avatar';

const cont = ({ isMy }:{ isMy: boolean }) => css`
  display: flex;
  justify-content: ${isMy ? 'flex-end' : 'flex-start'};
  align-items: flex-start;
  width: 100%;
  gap: 12px;
  margin-bottom: 24px;
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
    margin-bottom: 15px;
    gap: 15px;
`;

const messageCloud = ({ isMy }:{ isMy: boolean }) => css`
  border-radius: ${isMy ? '13px 13px 13px 13px' : '5px 13px 13px 13px'};
  background: ${isMy ? 'linear-gradient(153deg, rgba(114,76,233,1) 48%, rgba(64,82,238,1) 100%)' : 'white'};
  box-shadow: 0 0 5px #dcdcdc;
  font-size: 14px;
  padding: 14px 15px;
  color: ${isMy ? 'white' : 'black'}
`;

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
            sender,
        },
        localMeta: {
            isMy,
        }
    } = localMessage.message;

    return (
        <div className={className} css={cont({ isMy })}>
            {!isMy && (
                <Avatar
                    identifier={sender?.identifier?.[0]}
                />
            )}
            <div css={message({ isMy })}>
                <div css={sendInfo}>
                    {sender?.customData?.data?.username && (
                        <Text
                            customCss={`
                                font-weight: 700;
                                font-size: 16px;
                                color: #444444;
                                order: ${isMy ? 1 : 0}
                            `}
                        >
                            {sender.customData.data.username}
                        </Text>
                    )}
                    {createdAt && (
                        <Text
                            customCss={`
                              font-size: 14px;
                              color: #a8a8a8;
                              order: ${isMy ? 0 : 1}
                            `}
                        >
                            {getDayTime({
                                date: createdAt,
                            })}
                        </Text>
                    )}
                </div>
                <div css={messageCloud({ isMy })}>
                    <Text>
                        {text}
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ChatMessage);
