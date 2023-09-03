import { Channel, CustomEvent } from 'livelists-js-core';

export interface ICustomEventsArgs {
    channel: Channel | undefined,
    channelRef: React.MutableRefObject<Channel | undefined>
}

export interface ISubscribeArgs {
    event: string,
    cb: (args:CustomEvent) => void
}

export interface ICustomEvents {
    onSubscribeEvent: (args:ISubscribeArgs) => void,
    unSubscribeEvent: (args:ISubscribeArgs) => void,
    publishEvent: (data: CustomEvent) => void,
}