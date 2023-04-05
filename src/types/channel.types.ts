import { Message } from 'livelists-js-core';

export interface IChannel {
    messages: any[],
    join: () => void,
    subscribe: () => void,
    publishMessage: (args:IPublishMessageArgs) => void,
    recentMessages: Message[],
}

export interface IChannelArgs {
    url: string,
    accessToken: string,
}

export interface IPublishMessageArgs {
    text: string,
}
