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
    IShouldScrollToBottom,
    NotSeenCounterEmittedEvents,
    INotSeenCountUpdated,
    IInitialInfoUpdated,
} from 'livelists-js-core';

import {
    IChannel,
    IChannelArgs,
    IFindNotSeenArgs,
    IInitialScroll,
    IPublishMessageArgs,
    IReadMessageArgs,
} from '../types/channel.types';
import { useCustomEvents } from './useCustomEvents';
import { useParticipants } from './useParticipants';

const DEFAULT_PAGE_SIZE = 50;

export const useChannel = ({
    wsConnector,
    initialPageSize = DEFAULT_PAGE_SIZE,
    initialOffset = 0,
    channelId,
}:IChannelArgs):IChannel => {
    const channelRef = useRef<Channel>();
    const [channel, setChannel] = useState<Channel>();
    const [recentMessages, setRecentMessages] = useState<LocalMessage[]>([]);
    const [historyMessages, setHistoryMessages] = useState<LocalMessage[]>([]);
    const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionStates.Disconnected);
    const [isLoadingHistory, setIsLoadingMore] = useState<boolean>(false);
    const [scrollToBottomKey, setScrollToBottomKey] = useState<number>(0);
    const [notSeenCount, setNotSeenCount, ] = useState<{
        count: number,
        isInit: boolean,
    }>({
        count: 0,
        isInit: false,
    });

    const [channelInfo, setChannelInfo] = useState<IInitialInfoUpdated['data'] | undefined>(
        undefined
    );

    const [initialScroll, setInitialScroll] = useState<IInitialScroll>({
        isFindNotSeen: false,
        offsetTop: 0,
        isVisibleOnStart: false,
    });

    useEffect(()  => {
        if (!wsConnector) {
            return;
        }
        channelRef.current = new Channel({
            socket: wsConnector,
            initialPageSize,
            initialOffset,
            channelId,
        });

        setChannel(channelRef.current);

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
        channelRef.current?.on({
            event: ChannelEvents.InitialInfoUpdated,
            cb: (data) => {
                setChannelInfo(data);
            }
        } as IOnEvent<ChannelEvents.InitialInfoUpdated, IInitialInfoUpdated['data']>);
        channelRef.current?.on({
            event: ChannelEvents.ShouldScrollToBottom,
            cb: () => {
                setScrollToBottomKey(c => c + 1);
            }
        } as IOnEvent<ChannelEvents.ShouldScrollToBottom, IShouldScrollToBottom['data']>);
        channelRef.current?.notSeenCounter.on({
            event: NotSeenCounterEmittedEvents.CountUpdated,
            cb: ({ count }) => {
                setNotSeenCount({
                    isInit: true,
                    count: count,
                });
            }
        } as IOnEvent<NotSeenCounterEmittedEvents.CountUpdated, INotSeenCountUpdated['data']>);
    }, [wsConnector]);

    const {
        loadParticipants,
        isParticipantsLoaded,
        participants,
    } = useParticipants({
        channel,
        channelRef,
    });

    const {
        onSubscribeEvent,
        unSubscribeEvent,
        publishEvent,
    } = useCustomEvents({
        channel,
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

    const readMessage = useCallback((args:IReadMessageArgs) => {
        channelRef.current?.notSeenCounter?.readMessage({
            messageId: args.messageId,
        });
    }, []);

    const onFindFirstNotSeen = useCallback((args:IFindNotSeenArgs) => {
        setInitialScroll((c) => ({
            ...c,
            isFindNotSeen: true,
            offsetTop: args.offsetTop,
        }));
    }, []);


    useEffect(() => {
        if (notSeenCount.isInit && notSeenCount.count === 0) {
            setInitialScroll({
                isFindNotSeen: false,
                offsetTop: 0,
                isVisibleOnStart: true,
            });
        }
    }, [notSeenCount]);

    return {
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
        scrollToBottomKey,
        readMessage,
        notSeenCount: notSeenCount.count,
        initialScroll,
        onFindFirstNotSeen,
        channelInfo,
    };
};
