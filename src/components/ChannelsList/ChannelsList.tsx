/** @jsx jsx */
import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';

import { css, jsx } from '@emotion/react';
import { LocalShortChannel } from 'livelists-js-core';

import { ScrollBar } from '../../atoms/ScrollBar';
import { ChannelItem } from './Channelltem';

interface IProps {
    channels: LocalShortChannel[],
    onSelect?: ({ channelId }:{ channelId: string }) => void,
}

const ChannelsList:React.FC<IProps> = ({
    channels,
    onSelect,
}) => {
    const [selectedChannelId, setSelectedChannelId] = useState<string|undefined>(undefined);

    useEffect(() => {
        if (selectedChannelId && onSelect) {
            onSelect({ channelId: selectedChannelId });
        }
    }, [selectedChannelId]);

    const onItemClick = useCallback(({ channelId }:{ channelId: string }) => {
        setSelectedChannelId(channelId);
    }, []);

    return (
        <div css={css`
          width: 100%;
        `}
        >
            <ScrollBar
                style={{
                    height: 'calc(100vh - 67px)'
                }}
            >
                {channels.map((c:LocalShortChannel) => (
                    <ChannelItem
                        onClick={onItemClick}
                        key={c.channel.channel?.id}
                        channel={c}
                        isSelected={selectedChannelId === c?.channel?.channel?.identifier}
                    />
                ))}
            </ScrollBar>
        </div>
    );
};

export default React.memo(ChannelsList);
