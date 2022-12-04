export interface IChannel {
    messages: any[],
    join: () => void,
    subscribe: () => void,
}

export interface IChannelArgs {
    url: string,
    channelId: string,
}
