import { useEffect, useState } from 'react';

import { IShortChannelData } from 'livelists-js-core';

import { IShortChannel, IShortChannelArgs } from '../types/channelAggregation.types';

export const useShortChannel = ({
    channel
}:IShortChannelArgs):IShortChannel => {
    const [channelData, setChannelData] = useState<IShortChannelData>({
        channel: channel.channel,
        unreadCount: channel.unreadCount,
    });
    
    useEffect(() => {
        if (!channelData && channel) {
            setChannelData(channel);
        }
    }, [channelData, channel]);


    useEffect(() => {
        channel?.onUpdated({
            cb: (chData:IShortChannelData) => {
                setChannelData(chData);
            }
        });
    }, [channel]);


    return {
        channel: channelData,
    };
};