import {
    LocalMessage,
    ConnectionState,
    CustomData,
    ILoadMoreMessagesArgs,
} from 'livelists-js-core';
import { IParticipants } from './participants.types';

export interface IChannel extends IParticipants {
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
