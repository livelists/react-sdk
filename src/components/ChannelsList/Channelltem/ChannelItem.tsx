import React, { useState } from 'react';

import { ChannelWithMsg } from 'livelists-js-core';

import { getDayTime } from '../../../utils/date/getDayTime';
import { Avatar } from '../../Avatar';
import styles from './ChannelItem.module.css';

interface IProps {
    channel: ChannelWithMsg,
}

const ChannelItem:React.FC<IProps> = ({
    channel,
}) => {

    return (
        <div
            className={styles.content}
        >
            <div className={styles.avatarCont}>
                <Avatar
                    className={styles.avatar}
                    identifier={channel.channel?.identifier}
                />
            </div>
            <div className={styles.infoCont}>
                <div className={styles.title}>
                    <p className={styles.name}>
                        {channel.channel?.identifier}
                    </p>
                    {channel.messages?.[0]?.createdAt && (
                        <p className={styles.time}>
                            {getDayTime({
                                date: channel.messages?.[0]?.createdAt
                            })}
                        </p>
                    )}
                </div>
                {channel.messages?.[0] && (
                    <div className={styles.subTitle}>
                        <p className={styles.messageText}>
                            {channel.messages[0].sender && (
                                <span className={styles.messageAuthor}>
                                    {channel.messages[0].sender?.identifier}
                                </span>
                            )}
                            {channel.messages[0].text}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(ChannelItem);
