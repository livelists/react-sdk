import { useState } from 'react';

import { IChannelArgs } from '../types/channel.types';

//:TODO move react hooks to separate library
export function useChannel (args:IChannelArgs) {
    const [socketId, setSocketId] = useState('helloWorldId');

    return 'id';
};
