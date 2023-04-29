import { toNoCase } from './toNoCase';

export const toSpaceCase = (string:string) => {
    return toNoCase(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
        return match ? ' ' + match : '';
    }).trim();
};
