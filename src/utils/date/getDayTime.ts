import { addToNumberZeros } from '../string/addToNumberZeros';

export const getDayTime = ({
    date
}:{
    date: Date,
}):string => {
    return `${addToNumberZeros({ 
        number: date?.getHours().toString() || '0',
        minLength: 2
    })}:${addToNumberZeros({
        number: date?.getMinutes().toString() || '0',
        minLength: 2
    })}`;
};