import { ServerCustomData } from 'livelists-js-core';

export const getChannelNameFromChannel = ({
    identifier,
    customData,
}:{
    identifier: string;
    customData?: ServerCustomData | undefined;
}):string => {
    const customDataName = customData?.data?.channelName;
    if (customDataName) {
        return customDataName;
    }

    return identifier;
};