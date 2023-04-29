import {
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';

import {
    Channel,
    ChannelEvents,
    ConnectionState,
    ConnectionStates,
    IConnectionStateUpdated, IHistoryMessagesUpdated,
    IOnEvent,
    IRecentMessagesUpdated,
    LocalMessage
} from 'livelists-js-core';

import { IChannel, IChannelArgs, IPublishMessageArgs } from '../types/channel.types';

const DEFAULT_PAGE_SIZE = 50;

export function useChannel ({
    url,
    accessToken,
    initialPageSize = DEFAULT_PAGE_SIZE,
    initialOffset = 0,
}:IChannelArgs):IChannel {
    const channelRef = useRef<Channel>();
    const [recentMessages, setRecentMessages] = useState<LocalMessage[]>([]);
    const [historyMessages, setHistoryMessages] = useState<LocalMessage[]>([]);
    const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionStates.Disconnected);

    useEffect(()  => {
        channelRef.current = new Channel({
            initialPageSize,
            initialOffset,
        });

        channelRef.current?.on({
            event: ChannelEvents.RecentMessagesUpdated,
            cb: ({ messages }) => {
                setRecentMessages(messages);
            }
        } as IOnEvent<ChannelEvents.RecentMessagesUpdated, IRecentMessagesUpdated['data']>);
        channelRef.current?.on({
            event: ChannelEvents.ConnectionStateUpdated,
            cb: ({ connectionState:s }) => {
                setConnectionState(s);
            }
        } as IOnEvent<ChannelEvents.ConnectionStateUpdated, IConnectionStateUpdated['data']>);
        channelRef.current?.on({
            event: ChannelEvents.HistoryMessagesUpdated,
            cb: ({ messages }) => {
                setHistoryMessages(messages);
            }
        } as IOnEvent<ChannelEvents.HistoryMessagesUpdated, IHistoryMessagesUpdated['data']>);
    }, []);

    const join = useCallback(() => {
        channelRef.current?.join({
            url,
            accessToken,
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
        connectionState,
        historyMessages,
    };
}
