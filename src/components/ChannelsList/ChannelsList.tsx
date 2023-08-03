import React from 'react';

import { ChannelWithMsg } from 'livelists-js-core';

import { ScrollBar } from '../../atoms/ScrollBar';
import { ChannelItem } from './Channelltem';
import styles from './ChannelsList.module.css';

interface IProps {
    channels: ChannelWithMsg[],
}

const ChannelsList:React.FC<IProps> = ({
    channels,
}) => {

    return (
        <div className={styles.cont}>
            <ScrollBar
                style={{
                    height: 'calc(100vh - 67px)'
                }}
            >
                {channels.map((c:ChannelWithMsg) => (
                    <ChannelItem
                        key={c?.channel?.id}
                        channel={c}
                    />
                ))}
            </ScrollBar>
        </div>
    );
};

export default React.memo(ChannelsList);
