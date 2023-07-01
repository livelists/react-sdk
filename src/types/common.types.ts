import { CustomEvent } from "livelists-js-core";

export interface IUseSubscriptions {
    onSubscribe: (args:ISubscribeArgs) => void,
    unSubscribe: (args:ISubscribeArgs) => void,
    callListeners: ({ event, data }:{ event: string, data: any }) => void,
}

export interface ISubscribeArgs {
    event: string,
    cb: (args:any) => void
}