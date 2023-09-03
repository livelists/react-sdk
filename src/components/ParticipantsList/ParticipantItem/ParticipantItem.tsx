/** @jsx jsx */
import React from 'react';

import { css, jsx } from '@emotion/react';
import { ParticipantShortInfo } from 'livelists-js-core';

import { Text } from '../../../atoms/Text';
import { getDayTime } from '../../../utils/date/getDayTime';
import { Avatar } from '../../Avatar';

interface IProps {
    participant: ParticipantShortInfo,
}

const cont = css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const avatarCont = css`
  width: 60px;
  flex-shrink: 0;
`;

const textCont = css`
  width: 100%;
  flex-shrink: 1;
`;

const participantUsername = `
  font-weight: 600;
`;

const onlineStatusText = `
  color: #959595;
`;


const ParticipantItem:React.FC<IProps> = ({
    participant,
}) => {
    return (

        <div css={cont}>
            <div css={avatarCont}>
                <Avatar
                    bigSize
                    identifier={participant.identifier}
                />
            </div>
            <div css={textCont}>
                {participant?.customData?.data?.username && (
                    <Text customCss={participantUsername}>
                        {participant.customData.data.username}
                    </Text>
                )}
                <Text customCss={onlineStatusText}>
                    {participant.isOnline ? (
                        'Online'
                    ) : (
                        participant.lastSeenAt ? getDayTime({
                            date: participant.lastSeenAt
                        }) : null
                    )}
                </Text>
            </div>
        </div>
    );
};

export default React.memo(ParticipantItem);
