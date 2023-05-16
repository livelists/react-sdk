import React, { useState, ChangeEvent } from 'react';

interface IProps {
    onChange?: ({ value }:{ value: string }) => void,
    placeholder?: string,
    value?: string,
    className?: string,
    onKeyDown?: (args: React.KeyboardEvent<HTMLInputElement>) => void,
}

const Input:React.FC<IProps> = ({
    onChange,
    placeholder,
    value,
    className,
    onKeyDown,
}) => {
    const [localValue, setLocalValue] = useState<string>();

    const onLocalChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
        if (onChange) {
            onChange({ value: e.target.value });
        }
    };

    return (
        <input
            className={className}
            placeholder={placeholder}
            onChange={onLocalChange}
            onKeyDown={onKeyDown}
            value={onChange ? value : localValue}
        />
    );
};

export default Input;
