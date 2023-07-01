import { useState } from 'react';

import { IUseSubscriptions } from '../../types/common.types';
import { ISubscribeArgs } from '../../types/customEvents.types';

export const useSubscriptions = ():IUseSubscriptions => {
    const [subscriptions, setSubscriptions] = useState<
        Record<string, ((args:any) => void)[]>>({});

    const onSubscribe = (args:ISubscribeArgs) => {
        const prevListeners = subscriptions[args.event];
        if (!prevListeners) {
            setSubscriptions((c) => ({
                ...c,
                [args.event]: [args.cb],
            }));
        } else {
            setSubscriptions((c) => ({
                ...c,
                [args.event]: [...subscriptions[args.event], args.cb],
            }));
        }
    };

    const unSubscribe = (args:ISubscribeArgs) => {
        const handlersCopy = [...subscriptions[args.event]];
        if (handlersCopy) {
            const deleteIndex = handlersCopy.findIndex((cb) => cb === args.cb);
            if (deleteIndex !== -1) {
                handlersCopy.splice(deleteIndex, 1);
                setSubscriptions((c) => ({
                    ...c,
                    [args.event]: handlersCopy,
                }));
            }
        }
    };

    const callListeners = ({ event, data }:{ event: string, data: any }) => {
        subscriptions[event]?.map((cb) => cb(data));
    };

    return {
        onSubscribe,
        unSubscribe,
        callListeners,
    };
};