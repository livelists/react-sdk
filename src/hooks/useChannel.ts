import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    Channel,
    ChannelEvents,
    Message,
} from 'livelists-js-core';

import { IChannel, IChannelArgs, IPublishMessageArgs, } from '../types/channel.types';

export function useChannel (channelArgs:IChannelArgs):IChannel {
    const channelRef = useRef<Channel>();
    const [recentMessages, setRecentMessages] = useState<Message[]>([]);

    useEffect(()  => {
        channelRef.current = new Channel();

        channelRef.current?.on({
            event: ChannelEvents.RecentMessagesUpdated,
            cb: ({ messages }) => {
                console.log('on new message', messages);
                setRecentMessages(messages);
            }
        });
    }, []);

    const join = useCallback(() => {
        channelRef.current?.join({
            url: channelArgs.url,
            accessToken: channelArgs.accessToken,
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
        recentMessages,
    };
}
