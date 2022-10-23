import React, { useState, ChangeEvent } from 'react';

interface IProps {
    onChange?: ({ value }:{ value: string }) => void,
    placeholder?: string,
}

const Input:React.FC<IProps> = ({ onChange, placeholder }) => {
    const [localValue, setLocalValue] = useState<string>();

    const onLocalChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
        if (onChange) {
            onChange({ value: e.target.value });
        }
    }

    return (
        <input
            placeholder={placeholder}
            onChange={onLocalChange}
            value={localValue}
        />
    )
};

export default React.memo(Input);
