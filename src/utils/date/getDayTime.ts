export const getDayTime = ({
    date
}:{
    date: Date,
}):string => {
    return `${date?.getHours()}:${date?.getMinutes()}`;
}