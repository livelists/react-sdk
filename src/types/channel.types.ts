import { LocalMessage, ConnectionState } from 'livelists-js-core';

export interface IChannel {
    messages: any[],
    join: () => void,
    subscribe: () => void,
    publishMessage: (args:IPublishMessageArgs) => void,
    recentMessages: LocalMessage[],
    connectionState: ConnectionState,
    historyMessages: LocalMessage[],
}

export interface IChannelArgs {
    url: string,
    accessToken: string,
    initialPageSize?: number,
    initialOffset?: number,
}

export interface IPublishMessageArgs {
    text: string,
}
