export interface IChannel {
    messages: any[],
    join: () => void,
    subscribe: () => void,
    publishMessage: (args:IPublishMessageArgs) => void,
}

export interface IChannelArgs {
    url: string,
    channelId: string,
}

export interface IPublishMessageArgs {
    text: string,
}
