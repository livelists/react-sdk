import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    ChannelsAggregation,
    ILoadChannelsArgs,
    IOnEvent,
    ChannelsAggregationEvents,
    IChannelsListUpdated,
    LocalShortChannel,
} from 'livelists-js-core';

import {
    IChannelAggregation,
    IChannelAggregationArgs,
} from '../types/channelAggregation.types';

export const useChannelsAggregation = ({
    wsConnector
}:IChannelAggregationArgs):IChannelAggregation => {
    const [channels, setChannels] = useState<LocalShortChannel[]>([]);
    const channelsAggregationRef = useRef<ChannelsAggregation>();

    useEffect(() => {
        if (!wsConnector) {
            return;
        }
        channelsAggregationRef.current = new ChannelsAggregation({
            socket: wsConnector,
        });

        channelsAggregationRef.current?.on({
            event: ChannelsAggregationEvents.ChannelsListUpdated,
            cb: (data) => {
                setChannels(data.channels);
            }
        } as IOnEvent<ChannelsAggregationEvents.ChannelsListUpdated, IChannelsListUpdated['data']>);
    }, [wsConnector]);

    const loadChannels = useCallback((args:ILoadChannelsArgs) => {
        channelsAggregationRef.current?.loadMyChannels(args);
    }, []);

    return {
        loadChannels,
        channels,
    };
};