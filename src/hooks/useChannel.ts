import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    Channel,
    ChannelEvents,
    ConnectionState,
    ConnectionStates,
    IConnectionStateUpdated,
    IHistoryMessagesUpdated,
    IOnEvent,
    IRecentMessagesUpdated,
    LocalMessage,
    IIsLoadingMoreUpdated,
    ILoadMoreMessagesArgs,
} from 'livelists-js-core';

import { IChannel, IChannelArgs, IPublishMessageArgs } from '../types/channel.types';
import { useCustomEvents } from './useCustomEvents';
import { useParticipants } from './useParticipants';

const DEFAULT_PAGE_SIZE = 50;

export const useChannel = ({
    wsConnector,
    initialPageSize = DEFAULT_PAGE_SIZE,
    initialOffset = 0,
}:IChannelArgs):IChannel => {
    const channelRef = useRef<Channel>();
    const [recentMessages, setRecentMessages] = useState<LocalMessage[]>([]);
    const [historyMessages, setHistoryMessages] = useState<LocalMessage[]>([]);
    const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionStates.Disconnected);
    const [isLoadingHistory, setIsLoadingMore] = useState<boolean>(false);

    useEffect(()  => {
        if (!wsConnector) {
            return;
        }
        channelRef.current = new Channel({
            socket: wsConnector,
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
        channelRef.current?.on({
            event: ChannelEvents.IsLoadingMoreUpdated,
            cb: ({ isLoadingMore }) => {
                setIsLoadingMore(isLoadingMore);
            }
        } as IOnEvent<ChannelEvents.IsLoadingMoreUpdated, IIsLoadingMoreUpdated['data']>);
    }, [wsConnector]);

    const {
        loadParticipants,
        isParticipantsLoaded,
        participants,
    } = useParticipants({
        channelRef,
    });

    const {
        onSubscribeEvent,
        unSubscribeEvent,
        publishEvent,
    } = useCustomEvents({
        channelRef,
    });

    const join = useCallback(() => {
        channelRef.current?.join();
    }, []);

    const publishMessage = useCallback((args:IPublishMessageArgs) => {
        channelRef.current?.publishMessage({
            text: args.text,
            customData: args.customData,
        });
    }, []);

    const loadMoreMessages = useCallback((args:ILoadMoreMessagesArgs) => {
        channelRef.current?.loadMoreMessages(args);
    }, []);


    return {
        messages: [],
        join,
        subscribe: () => {},
        publishMessage,
        recentMessages,
        connectionState,
        historyMessages,
        isLoadingHistory,
        loadMoreMessages,
        loadParticipants,
        isParticipantsLoaded,
        participants,
        onSubscribeEvent,
        unSubscribeEvent,
        publishEvent,
        channelIdentifier: channelRef.current?.channelId,
    };
};
