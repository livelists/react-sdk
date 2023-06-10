import React from 'react';

import {
    Channel, ParticipantShortInfo,
} from 'livelists-js-core';

export interface IParticipantsArgs {
    channelRef: React.MutableRefObject<Channel | undefined>
}

export interface IParticipants {
    participants: ParticipantShortInfo[],
    loadParticipants: () => void,
    isParticipantsLoaded: boolean,
}