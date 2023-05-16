import React from 'react';

import { LocalMessage } from 'livelists-js-core';

import { Text } from '../../atoms/Text';
import { cnb } from '../../utils/helpers/cnb';
import styles from './ChatMessage.module.css';

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
        <div className={cnb(styles.cont, className, {
            [styles.isMy]: isMy,
        })}>
            {!isMy && (
                <div className={styles.avatar}>
                    <Text className={styles.avatarText}>
                        {sender?.identifier?.[0]}
                    </Text>
                </div>
            )}
            <div className={cnb(styles.message, {
                [styles.myMessage]: isMy,
            })}>
                <div className={styles.sendInfo}>
                    {sender?.customData?.data?.username && (
                        <Text className={cnb(styles.senderUsername, {
                            [styles.mySenderUsername]: isMy,
                        })}>
                            {sender.customData.data.username}
                        </Text>
                    )}
                    <Text className={cnb(styles.sendDate, {
                        [styles.mySendDate]: isMy,
                    })}>
                        {`${createdAt?.getHours()}:${createdAt?.getMinutes()}`}
                    </Text>
                </div>
                <div className={cnb(styles.messageCloud, {
                    [styles.myCloud]: isMy,
                })}>
                    <Text>
                        {text}
                    </Text>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ChatMessage);
