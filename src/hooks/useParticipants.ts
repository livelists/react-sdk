import {useCallback, useEffect, useState} from 'react';

import {
    IOnEvent,
    IParticipantsLoaded,
    IParticipantsUpdated,
    ParticipantShortInfo,
    ChannelParticipantsEvents,
} from 'livelists-js-core';

import { IParticipants, IParticipantsArgs } from '../types/participants.types';

export const useParticipants = ({
    channel,
    channelRef,
}:IParticipantsArgs):IParticipants => {
    const [
        isParticipantsLoaded,
        setIsParticipantsLoaded,
    ] = useState<boolean>(false);

    const [
        participantsList,
        setParticipantsList,
    ] = useState<ParticipantShortInfo[]>([]);

    const loadParticipants = useCallback(() => {
        channelRef.current?.channelParticipants?.loadParticipants();
    }, []);

    useEffect(() => {
        if (!channel) {
            return;
        }
        channel.channelParticipants?.on({
            event: ChannelParticipantsEvents.ParticipantsListLoaded,
            cb: ({ isLoaded }) => {
                setIsParticipantsLoaded(isLoaded);
            }
        } as IOnEvent<ChannelParticipantsEvents.ParticipantsListLoaded, IParticipantsLoaded['data']>);

        channel.channelParticipants?.on({
            event: ChannelParticipantsEvents.ParticipantsListUpdated,
            cb: ({ participants }) => {
                setParticipantsList([...participants]);
            }
        } as IOnEvent<ChannelParticipantsEvents.ParticipantsListUpdated, IParticipantsUpdated['data']>);
    }, [channel]);

    return {
        participants: participantsList,
        loadParticipants,
        isParticipantsLoaded,
    };
};