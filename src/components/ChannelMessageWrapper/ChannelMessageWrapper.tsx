/** @jsx jsx */
/**  @jsxFrag */
import React, { ReactElement, useEffect, useRef } from 'react';

import { css, jsx } from '@emotion/react';
import { LocalMessage } from 'livelists-js-core';

import { useIntersectionObserver } from '../../hooks/common/useIntersectionObserver';
import { IReadMessageArgs } from '../../types/channel.types';

const cont = () => css`
  width: 100%;
`;

interface IProps {
    localMessage: LocalMessage,
    readMessage?: (args:IReadMessageArgs) => void,
    onFindFirstNotSeen?: (args:{
        offsetTop: number,
    }) => void,
    children: ReactElement,
}

const ChannelMessageWrapper:React.FC<IProps> = ({
    localMessage,
    readMessage,
    onFindFirstNotSeen,
    children,
}) => {
    const messageRef = useRef<HTMLDivElement>(null);

    const {
        message: {
            id,
        },
        localMeta: {
            isFirstUnSeen,
        }
    } = localMessage.message;

    const intersection = useIntersectionObserver(messageRef, {
        freezeOnceVisible: true,
    });

    useEffect(() => {
        if (intersection?.isIntersecting && id && readMessage) {
            readMessage({
                messageId: id,
            });
        }
    }, [intersection, id]);


    useEffect(() => {
        if (isFirstUnSeen) {
            if (messageRef.current?.offsetTop !== undefined && onFindFirstNotSeen) {
                onFindFirstNotSeen({
                    offsetTop: messageRef.current?.offsetTop
                });
            }
        }
    }, [isFirstUnSeen]);

    return (
        <div
            css={cont}
            ref={messageRef}
        >
            {children}
        </div>
    );
};

export default React.memo(ChannelMessageWrapper);
