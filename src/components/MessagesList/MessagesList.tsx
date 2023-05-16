import React, { ReactNode, useEffect, useRef } from 'react';

import { ILoadMoreMessagesArgs } from 'livelists-js-core/dist/types/channel.types';

import { ScrollBar } from '../../atoms/ScrollBar';
import { IOnScrollFrame } from '../../atoms/ScrollBar/types';
import { Text } from '../../atoms/Text';
import { cnb } from '../../utils/helpers/cnb';
import styles from './MessagesList.module.css';

const SCROLL_TOP_TO_LOAD_MORE = 200;
interface IProps {
    className?: string,
    children: ReactNode | ReactNode[],
    onLoadMore?: (args:ILoadMoreMessagesArgs) =>  void,
    isLoadingMore?: boolean,
}

const MessagesList:React.FC<IProps> = ({
    className,
    children,
    onLoadMore,
    isLoadingMore,
}) => {
    const scrollRef = useRef<ScrollBar|null>(null);

    const onScrollFrame = (args:IOnScrollFrame) => {
        if (args.scrollTop < SCROLL_TOP_TO_LOAD_MORE && onLoadMore) {
            onLoadMore({
                pageSize: 50,
                skipFromFirstLoaded: 0,
            });
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollToBottom();
    }, []);

    return (
        <div className={cnb(styles.cont, className)}>
            <ScrollBar
                style={{
                    height: 'calc(100vh - 67px)'
                }}
                ref={scrollRef}
                onScrollFrame={onScrollFrame}
            >
                {isLoadingMore ? <Text>Loading</Text> : undefined}
                {children}
            </ScrollBar>
        </div>
    );
};

export default React.memo(MessagesList);
