/** @jsx jsx */
import React, {
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';

import { css, jsx } from '@emotion/react';
import { ILoadMoreMessagesArgs, ScrollToBottomReasons } from 'livelists-js-core';

import { ScrollBar } from '../../atoms/ScrollBar';
import { IOnScrollFrame } from '../../atoms/ScrollBar/types';
import { IInitialScroll, IScrollToBottomKey } from '../../types/channel.types';

const SCROLL_TOP_TO_LOAD_MORE = 200;
const NOT_SEEN_START_START_MARGIN = 200;
const PREVENT_AUTO_SCROLL_TO_BOTTOM_MARGIN = 20;

const cont = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  padding: 0 27px;
`;

const content =  css`
  max-width: 694px;
  width: 100%;
  margin: auto;
`;

interface IProps {
    className?: string,
    children: ReactNode | ReactNode[],
    onLoadMore?: (args:ILoadMoreMessagesArgs) =>  void,
    isLoadingMore: boolean,
    initialScroll: IInitialScroll,
    scrollToBottomKey?: IScrollToBottomKey,
}

const MessagesList:React.FC<IProps> = ({
    className,
    children,
    onLoadMore,
    isLoadingMore,
    initialScroll,
    scrollToBottomKey,
}) => {
    const scrollRef = useRef<ScrollBar|null>(null);
    const timeOutRef = useRef<NodeJS.Timeout|null>(null);
    const [isAfterLoadMore, setIsAfterLoadMore] = useState<boolean>(false);

    const handleGetOffsetFromBottom = ():number => {
        return scrollRef.current?.getScrollHeight() -
            (scrollRef.current?.getScrollTop() + scrollRef.current?.getClientHeight());
    };

    const onScrollFrame = (args:IOnScrollFrame) => {
        if (args.scrollTop === 0) {
            scrollRef.current?.scrollTop(1);
        }

        if (!onLoadMore) {
            return;
        }
        if (args.scrollTop < SCROLL_TOP_TO_LOAD_MORE) {
            onLoadMore({
                pageSize: 50,
                skipFromFirstLoaded: 0,
                isPrevLoading: true,
            });
        }

        if (handleGetOffsetFromBottom() < SCROLL_TOP_TO_LOAD_MORE) {
            onLoadMore({
                pageSize: 50,
                skipFromFirstLoaded: 0,
                isPrevLoading: false,
            });
        }
    };

    const handleGetScrollTopToNotSeenStart = (offsetTop:number):number => {
        const scrollHeight = scrollRef.current?.getScrollHeight();
        const resultOffsetTop = offsetTop - NOT_SEEN_START_START_MARGIN;

        if (resultOffsetTop < 0) {
            return 0;
        }
        if (resultOffsetTop < scrollHeight) {
            return resultOffsetTop;
        }
        return scrollHeight;
    };

    useEffect(() => {
        if (initialScroll.isVisibleOnStart) {
        } else if (initialScroll.isFindNotSeen) {
            scrollRef.current?.scrollTop(handleGetScrollTopToNotSeenStart(initialScroll.offsetTop));
        }
    }, [initialScroll]);

    useEffect(() => {
        let timeOut:NodeJS.Timeout;
        if (
            !isLoadingMore &&
            isAfterLoadMore &&
            onLoadMore
        ) {
            timeOut = setTimeout(() => {
                if (scrollRef.current?.getScrollTop() === 0) {
                    onLoadMore({
                        pageSize: 50,
                        skipFromFirstLoaded: 0,
                        isPrevLoading: true,
                    });
                }
            }, 100);
        }
        
        return () => {
            if (timeOut) {
                clearTimeout(timeOut);
            }  
        };
    }, [isLoadingMore, isAfterLoadMore]);

    useEffect(() => {
        if (isLoadingMore) {
            setIsAfterLoadMore(true);
        }
    }, [isLoadingMore]);

    useEffect(() => {
        if (scrollToBottomKey?.reason) {
            const initialOffset = handleGetOffsetFromBottom();
            timeOutRef.current = setTimeout((reason, offset) => {
                console.log('timeOutFired', Date.now());
                if (reason === ScrollToBottomReasons.MePublishMessage) {
                    console.log('mePublish');
                    scrollRef.current?.scrollToBottom();
                } else if (offset < PREVENT_AUTO_SCROLL_TO_BOTTOM_MARGIN) {
                    console.log('offset');
                    scrollRef.current?.scrollToBottom();
                }
            }, 200, scrollToBottomKey?.reason, initialOffset);
        }
    }, [scrollToBottomKey?.key]);

    useEffect(() => {
        scrollRef.current?.scrollToBottom();

        return () => {
            if (timeOutRef.current !== null) {
                clearTimeout(timeOutRef.current);
            }
        };
    }, []);

    return (
        <div className={className} css={cont}>
            <ScrollBar
                style={{
                    height: '100%',
                }}
                ref={scrollRef}
                onScrollFrame={onScrollFrame}
            >
                <div css={content}>
                    {children}
                </div>
            </ScrollBar>
        </div>
    );
};

export default React.memo(MessagesList);
