export const getPluralText = ({
    text,
    pluralText,
    count,
}:{
    text: string,
    pluralText: string,
    count: number,
}):string => {
    if (count > 1) {
        return pluralText;
    }
    return text;
};