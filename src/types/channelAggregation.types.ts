import {
    ILoadChannelsArgs, IShortChannelData,
    LocalShortChannel,
    WSConnector,
} from 'livelists-js-core';

export interface IChannelAggregationArgs {
    wsConnector: WSConnector,
}

export interface IChannelAggregation {
    loadChannels: (args:ILoadChannelsArgs) => void,
    channels: LocalShortChannel[],
}

export interface IShortChannelArgs {
    channel: LocalShortChannel,
}
export interface IShortChannel {
    channel: IShortChannelData,
}
