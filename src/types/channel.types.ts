import {
    LocalMessage,
    ConnectionState,
    CustomData,
    ILoadMoreMessagesArgs,
    CustomEvent,
    WSConnector,
    IInitialInfoUpdated, ScrollToBottomReasons,
} from 'livelists-js-core';

import { ISubscribeArgs } from './customEvents.types';
import { IParticipants } from './participants.types';

export interface IChannel extends IParticipants {
    join: () => void,
    subscribe: () => void,
    publishMessage: (args:IPublishMessageArgs) => void,
    publishEvent: (args:CustomEvent) => void,
    recentMessages: LocalMessage[],
    connectionState: ConnectionState,
    historyMessages: LocalMessage[],
    isLoadingHistory: boolean,
    loadMoreMessages: (args:ILoadMoreMessagesArgs) => void,
    onSubscribeEvent: (args:ISubscribeArgs) => void,
    unSubscribeEvent: (args:ISubscribeArgs) => void,
    scrollToBottomKey: IScrollToBottomKey,
    readMessage: (args:IReadMessageArgs) => void,
    notSeenCount: number,
    initialScroll: IInitialScroll,
    onFindFirstNotSeen: (args:IFindNotSeenArgs) => void,
    channelInfo: IInitialInfoUpdated['data'] | undefined,
}

export interface IScrollToBottomKey {
    reason: ScrollToBottomReasons | undefined,
    key: number,
}

export interface IChannelArgs {
    wsConnector: WSConnector,
    initialPageSize?: number,
    initialOffset?: number,
    channelId: string,
}

export interface IPublishMessageArgs {
    text: string,
    customData?: CustomData,
}

export interface IReadMessageArgs {
    messageId: string,
}

export interface IInitialScroll {
    isFindNotSeen: boolean,
    offsetTop: number,
    isVisibleOnStart: boolean,
}

export interface IFindNotSeenArgs {
    offsetTop: number,
}