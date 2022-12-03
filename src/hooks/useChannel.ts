import {
    useState,
    useEffect,
    useRef,
    useCallback,
} from 'react';

import { Channel } from 'livelists-js-core';

import { IChannelArgs, IChannel } from '../types/channel.types';

export function useChannel (args:IChannelArgs):IChannel {
    const [socketId, setSocketId] = useState('helloWorldId');
    const channelRef = useRef<Channel>();

    useEffect(()  => {
        channelRef.current = new Channel();
    }, []);

    const join = useCallback(() => {
        channelRef.current?.join();
    }, []);

    return {
        messages: [],
        join,
        subscribe: () => {},
    };
}

