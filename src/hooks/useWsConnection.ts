import React, { useRef, useCallback } from 'react';

import { WSConnector } from 'livelists-js-core';

import { IWsConnectionArgs, IWsConnection } from '../types/wsConnection.types';

export const useWsConnection = ({
    url,
    accessToken,
}:IWsConnectionArgs):IWsConnection => {
    const wsRef = useRef<WSConnector | null>(null);

    const onGetConnection = useCallback(async ():Promise<React.RefObject<WSConnector>> => {
        if (wsRef.current !== null) {
            return wsRef;
        }
        const channel = new WSConnector();

        try {
            await channel.openConnection({
                url,
                authToken: accessToken,
            });
            wsRef.current = channel;
            return wsRef;
        } catch (e) {
            wsRef.current = channel;
            return wsRef;
        }
    }, [accessToken]);

    return {
        onGetConnection,
    };
};