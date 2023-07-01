import React from 'react';

import { ParticipantShortInfo } from 'livelists-js-core';

import { Text } from '../../../atoms/Text';
import { Avatar } from '../../Avatar';
import styles from './Participantitem.module.css';
interface IProps {
    participant: ParticipantShortInfo,
}

const ParticipantItem:React.FC<IProps> = ({
    participant,
}) => {
    return (
        <div className={styles.cont}>
            <div className={styles.avatarCont}>
                <Avatar
                    identifier={participant.identifier}
                />
            </div>
            <div className={styles.textCont}>
                {participant?.customData?.data?.username && (
                    <Text className={styles.participantUsername}>
                        {participant.customData.data.username}
                    </Text>
                )}
                <Text className={styles.onlineStatusText}>
                    {participant.isOnline ? (
                        'Online'
                    ) : (
                        `${participant.lastSeenAt?.getHours()}:${participant.lastSeenAt?.getMinutes()}`
                    )}
                </Text>
            </div>
        </div>
    );
};

export default React.memo(ParticipantItem);
