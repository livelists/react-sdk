/** @jsx jsx */
import React, { ReactElement } from 'react';

import { css, jsx } from '@emotion/react';
import { IInitialInfoUpdated } from 'livelists-js-core';

import { Text } from '../../atoms/Text';
import { getChannelNameFromChannel } from '../../utils/string/getChannelNameFromChannel';
import { getPluralText } from '../../utils/string/getPluralText';
import { Avatar } from '../Avatar';

const cont = css`
    background: white;
    width: 100%;
    height: 56px;
    border-bottom: 1px solid #D9DCE0;
    padding: 8px 16px;
    display: flex;
    align-items: flex-start;
    box-shadow: 0 2px 2px rgb(114,114,114,0.169);
`;

const avatarCont = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 60px;
`;

const textInfo = css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

interface IProps {
    children?: ReactElement,
    channelInfo?: IInitialInfoUpdated['data']
}

const ChannelInfo:React.FC<IProps> = ({
    children,
    channelInfo,
}) => {
    const onlineCountWithoutMe = (channelInfo?.participantsOnlineCount || 0) - 1;

    if (channelInfo) {
        return (
            <div css={cont}>
                <div css={avatarCont}>
                    <Avatar
                        identifier={getChannelNameFromChannel({
                            identifier: channelInfo.identifier,
                            customData: channelInfo.customData
                        })}
                    />
                </div>
                <div css={textInfo}>
                    <Text
                        customCss={`
                        color: #011627;
                        font-size: 16px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 20px;
                    `}
                    >
                        {getChannelNameFromChannel({
                            identifier: channelInfo.identifier,
                            customData: channelInfo.customData
                        })}
                    </Text>
                    <Text
                        customCss={`
                        color: #707991;
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 18px; 
                    `}
                    >
                        {`${getPluralText({
                            text: `${channelInfo.participantsCount} member`,
                            pluralText: `${channelInfo.participantsCount} members`,
                            count: channelInfo.participantsCount
                        })}${onlineCountWithoutMe > 1 ? (
                            `, ${channelInfo.participantsOnlineCount} online`
                        ): '' }`}
                    </Text>
                </div>
                {children}
            </div>
        );
    }

    return (
        <div css={cont}>
            {children}
        </div>
    );
};

export default React.memo(ChannelInfo);
