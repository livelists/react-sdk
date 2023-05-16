import { LocalMessage, ConnectionState, CustomData } from 'livelists-js-core';
import { ILoadMoreMessagesArgs } from "livelists-js-core/dist/types/channel.types";

export interface IChannel {
    messages: any[],
    join: () => void,
    subscribe: () => void,
    publishMessage: (args:IPublishMessageArgs) => void,
    recentMessages: LocalMessage[],
    connectionState: ConnectionState,
    historyMessages: LocalMessage[],
    isLoadingHistory: boolean,
    loadMoreMessages: (args:ILoadMoreMessagesArgs) => void,
}

export interface IChannelArgs {
    url: string,
    accessToken: string,
    initialPageSize?: number,
    initialOffset?: number,
}

export interface IPublishMessageArgs {
    text: string,
    customData?: CustomData,
}
