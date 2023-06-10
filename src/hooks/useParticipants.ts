import { useCallback, useState } from 'react';
import {
    IOnEvent,
    IParticipantsLoaded,
    IParticipantsUpdated,
    ParticipantShortInfo,
    ChannelParticipantsEvents,
} from 'livelists-js-core';

import { IParticipants, IParticipantsArgs } from '../types/participants.types';

export const useParticipants = ({
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
        console.log(channelRef.current?.channelParticipants);
        channelRef.current?.channelParticipants?.loadParticipants();
    }, []);

    channelRef.current?.channelParticipants?.on({
        event: ChannelParticipantsEvents.ParticipantsListLoaded,
        cb: ({ isLoaded }) => {
            console.log('isLoaded', isLoaded);
            setIsParticipantsLoaded(isLoaded);
        }
    } as IOnEvent<ChannelParticipantsEvents.ParticipantsListLoaded, IParticipantsLoaded['data']>);

    channelRef.current?.channelParticipants?.on({
        event: ChannelParticipantsEvents.ParticipantsListUpdated,
        cb: ({ participants }) => {
            setParticipantsList(participants);
        }
    } as IOnEvent<ChannelParticipantsEvents.ParticipantsListUpdated, IParticipantsUpdated['data']>);

    return {
        participants: participantsList,
        loadParticipants,
        isParticipantsLoaded,
    };
};