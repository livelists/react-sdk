import {
    useState,
    useEffect,
    useRef,
    useCallback,
} from 'react';

import { Channel } from 'livelists-js-core';

import {
    IChannelArgs,
    IChannel,
    IPublishMessageArgs,
} from '../types/channel.types';

export function useChannel (channelArgs:IChannelArgs):IChannel {
    const [socketId, setSocketId] = useState('helloWorldId');
    const channelRef = useRef<Channel>();

    useEffect(()  => {
        channelRef.current = new Channel();
    }, []);

    const join = useCallback(() => {
        channelRef.current?.join({
            url: channelArgs.url,
            channelId: channelArgs.channelId,
        });
    }, []);

    const publishMessage = useCallback((args:IPublishMessageArgs) => {
        channelRef.current?.publishMessage({
            text: args.text,
        });
    }, []);

    return {
        messages: [],
        join,
        subscribe: () => {},
        publishMessage,
    };
}
