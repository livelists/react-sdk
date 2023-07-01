import {
    CustomEventsEmitEvents,
    IOnEvent,
    INewCustomEvents,
    CustomEvent,
} from 'livelists-js-core';

import { ICustomEventsArgs, ICustomEvents, } from '../types/customEvents.types';
import { useSubscriptions } from './common/useSubscriptions';


export const useCustomEvents = ({ channelRef }:ICustomEventsArgs):ICustomEvents => {
    const {
        onSubscribe,
        unSubscribe,
        callListeners,
    } = useSubscriptions();

    channelRef.current?.customEvents?.on({
        event: CustomEventsEmitEvents.NewCustomEvent,
        cb: (data) => {
            callListeners({
                event: data.eventName,
                data,
            });
        },
    } as IOnEvent<CustomEventsEmitEvents.NewCustomEvent, INewCustomEvents['data']>);


    const publishEvent = (data:CustomEvent) => {
        channelRef.current?.customEvents?.sendCustomEvent(data);
    };

    return {
        onSubscribeEvent: onSubscribe,
        unSubscribeEvent: unSubscribe,
        publishEvent
    };
};