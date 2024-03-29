import { ServerCustomData } from 'livelists-js-core';

export const getUserNameFromUser = ({
    identifier,
    customData,
}:{
    identifier: string;
    customData?: ServerCustomData | undefined;
}):string => {
    const customDataUserName = customData?.data?.username;
    if (customDataUserName) {
        return customDataUserName;
    }

    return identifier;
};