import React from 'react';

import { WSConnector } from 'livelists-js-core';

export interface IWsConnectionArgs {
    url: string,
    accessToken: string,
}

export interface IWsConnection {
    onGetConnection: () => Promise<React.RefObject<WSConnector>>,
    ws: WSConnector | null
}