/** @jsx jsx */
import React, {
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';

import { css, jsx } from '@emotion/react';
import { ILoadMoreMessagesArgs } from 'livelists-js-core';

import { ScrollBar } from '../../atoms/ScrollBar';
import { IOnScrollFrame } from '../../atoms/ScrollBar/types';

const SCROLL_TOP_TO_LOAD_MORE = 200;

const cont = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;

const content = css`
  width: 694px;
  margin: auto;
`;

interface IProps {
    className?: string,
    children: ReactNode | ReactNode[],
    onLoadMore?: (args:ILoadMoreMessagesArgs) =>  void,
    isLoadingMore: boolean,
    scrollToBottomKey?: number,
}

const MessagesList:React.FC<IProps> = ({
    className,
    children,
    onLoadMore,
    isLoadingMore,
    scrollToBottomKey,
}) => {
    const scrollRef = useRef<ScrollBar|null>(null);
    const [isAfterLoadMore, setIsAfterLoadMore] = useState<boolean>(false);

    const onScrollFrame = (args:IOnScrollFrame) => {
        if (args.scrollTop === 0) {
            scrollRef.current?.scrollTop(1);
        }
        if (args.scrollTop < SCROLL_TOP_TO_LOAD_MORE && onLoadMore) {
            onLoadMore({
                pageSize: 50,
                skipFromFirstLoaded: 0,
            });
        }
    };

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
                    });
                }
            }, 1000);
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
        let timeOut:NodeJS.Timeout;
        if (scrollToBottomKey) {
            timeOut = setTimeout(() => scrollRef.current?.scrollToBottom(), 50);
        }

        return () => {
            clearTimeout(timeOut);
        };
    }, [scrollToBottomKey]);

    useEffect(() => {
        scrollRef.current?.scrollToBottom();
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
