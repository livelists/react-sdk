import React, {
    useRef,
    useCallback,
    useState,
} from 'react';

import { WSConnector } from 'livelists-js-core';

import { IWsConnectionArgs, IWsConnection } from '../types/wsConnection.types';

export const useWsConnection = ({
    url,
    accessToken,
}:IWsConnectionArgs):IWsConnection => {
    const wsRef = useRef<WSConnector | null>(null);

    const [ws, setWs] = useState<WSConnector | null>(null);

    const onGetConnection = useCallback(async ():Promise<React.RefObject<WSConnector>> => {
        if (wsRef.current !== null) {
            return wsRef;
        }
        const wsConn = new WSConnector({});

        try {
            await wsConn.openConnection({
                url,
                authToken: accessToken,
            });
            wsRef.current = wsConn;

            setWs(wsConn);
            return wsRef;
        } catch (e) {
            wsRef.current = wsConn;
            return wsRef;
        }
    }, [accessToken, url]);

    return {
        onGetConnection,
        ws,
    };
};