import React, { ReactNode, useEffect, useRef } from 'react';

import { ILoadMoreMessagesArgs, ParticipantShortInfo } from 'livelists-js-core';

import { ScrollBar } from '../../atoms/ScrollBar';
import { ParticipantItem } from './ParticipantItem';
import styles from './ParticipantsList.module.css';

interface IProps {
    className?: string,
    participants: ParticipantShortInfo[],
}

const ParticipantsList:React.FC<IProps> = ({
    className,
    participants,
}) => {
    const scrollRef = useRef<ScrollBar|null>(null);

    return (
        <div className={className}>
            <ScrollBar
                style={{
                    height: '500px'
                }}
                ref={scrollRef}
            >
                {participants.map((p) => (
                    <ParticipantItem
                        key={p.identifier}
                        participant={p}
                    />
                ))}
            </ScrollBar>
        </div>
    );
};

export default React.memo(ParticipantsList);
