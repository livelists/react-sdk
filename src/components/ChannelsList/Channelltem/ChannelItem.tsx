/** @jsx jsx */
import React from 'react';

import { css, jsx } from '@emotion/react';
import { LocalShortChannel } from 'livelists-js-core';

import { useShortChannel } from '../../../hooks/useShortChannel';
import { getDayTime } from '../../../utils/date/getDayTime';
import { getChannelNameFromChannel } from '../../../utils/string/getChannelNameFromChannel';
import { getUserNameFromUser } from '../../../utils/string/getUserNameFromUser';
import { Avatar } from '../../Avatar';
import { UnreadCount } from './UnreadCount';

const content = ({ isActive }:{ isActive: boolean }) => css`
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  text-decoration: none;
  padding: 10px 10px 10px 15px;
  background: ${isActive ? '#F5F5F5' : undefined};
  cursor: ${isActive ? 'default' : 'pointer' };
`;

const avatarCont = css`
  width: 68px;
  padding-left: 1px;
`;

const infoCont = css`
    width: 100%;
    max-height: 100%;
    overflow: hidden;
    color: #707579;
    flex: 1 1 auto;
    padding: 3px 7px 1px 9px;
`;

const title= css`
    display: flex;
    justify-content: space-between;
`;

const subTitle= css`
    display: flex;
    justify-content: space-between;
    padding-top: 6px;
`;

const name = ({ isActive }:{ isActive: boolean }) => css`
    color: #011627;
    font-weight: 600;
    font-size: 16px;
`;

const time = ({ isActive }:{ isActive: boolean }) => css`
    font-size: 12px;
    line-height: 18px;
    color: #011627;
`;

const messageText = ({ isActive }:{ isActive: boolean }) => css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    color: #707991;
`;

const messageAuthor = ({ isActive }:{ isActive: boolean }) => css`
    color: #011627;
`;

interface IProps {
    channel: LocalShortChannel,
    isSelected: boolean,
    onClick?: ({ channelId }:{ channelId: string }) => void,
}

const ChannelItem:React.FC<IProps> = ({
    channel,
    isSelected,
    onClick,
}) => {
    const {
        channel: {
            channel: channelData
        }
    } = useShortChannel({
        channel,
    });

    if (!channelData?.channel) {
        return null;
    }

    return (
        <div
            onClick={onClick ? () => onClick({ channelId: channelData.channel?.identifier || '' }) : () => {}}
            css={content({ isActive: isSelected })}
        >
            <div css={avatarCont}>
                <Avatar
                    bigSize
                    identifier={getChannelNameFromChannel(channelData.channel)}
                />
            </div>
            <div css={infoCont}>
                <div css={title}>
                    <p css={name({ isActive: isSelected })}>
                        {getChannelNameFromChannel(channelData.channel)}
                    </p>
                    {channelData?.messages?.[0]?.createdAt && (
                        <p css={time({ isActive: isSelected })}>
                            {getDayTime({
                                date: channelData.messages?.[0]?.createdAt
                            })}
                        </p>
                    )}
                </div>
                {channelData.messages?.[0] && (
                    <div css={subTitle}>
                        <p css={messageText({ isActive: isSelected })}>
                            {channelData.messages[0].sender && (
                                <span css={messageAuthor({ isActive: isSelected })}>
                                    {`${getUserNameFromUser(channelData.messages[0].sender)}: `}
                                </span>
                            )}
                            {channelData.messages[0].text}
                        </p>
                        {channel.unreadCount > 0 && (
                            <UnreadCount
                                count={channel.unreadCount}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(ChannelItem);
