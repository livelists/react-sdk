import { toSpaceCase } from './toSpaceCase';

export const toCamelCase = (string:string) => {
    return toSpaceCase(string).replace(/\s(\w)/g, function (matches, letter) {
        return letter.toUpperCase();
    });
};
