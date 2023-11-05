import { CustomData } from 'livelists-js-core/dist/proto/models';

export const getUserNameFromUser = ({
    identifier,
    customData,
}:{
    identifier: string;
    customData?: CustomData | undefined;
}):string => {
    const customDataUserName = customData?.data?.username;
    if (customDataUserName) {
        return customDataUserName;
    }

    return identifier;
};