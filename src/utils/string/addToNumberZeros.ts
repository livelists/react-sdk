export const addToNumberZeros = ({
    number,
    minLength,
}:{
    number:string,
    minLength: number,
}):string => {
    let resultString = number;
    if (minLength <= number.length) {
        return number;
    }

    for (let i = 0; i < minLength - number.length; i++) {
        resultString = '0' + resultString;
    }

    return  resultString;
};
