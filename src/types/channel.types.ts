import React from 'react';

import {
    LocalMessage,
    ConnectionState,
    CustomData,
    ILoadMoreMessagesArgs,
    CustomEvent,
    WSConnector,
} from 'livelists-js-core';

import { ISubscribeArgs } from './customEvents.types';
import { IParticipants } from './participants.types';

export interface IChannel extends IParticipants {
    messages: any[],
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
    channelIdentifier: string | undefined,
}

export interface IChannelArgs {
    wsConnector: WSConnector,
    initialPageSize?: number,
    initialOffset?: number,
}

export interface IPublishMessageArgs {
    text: string,
    customData?: CustomData,
}
