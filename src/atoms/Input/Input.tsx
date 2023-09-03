/** @jsx jsx */
import React, { useState, ChangeEvent } from 'react';

// eslint-disable-next-line import/named
import { jsx, css } from '@emotion/react';

interface IProps {
    onChange?: ({ value }:{ value: string }) => void,
    placeholder?: string,
    value?: string,
    customCss?: string,
    onKeyDown?: (args: React.KeyboardEvent<HTMLInputElement>) => void,
}

const Input:React.FC<IProps> = ({
    onChange,
    placeholder,
    value,
    customCss,
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
            css={css`${customCss}`}
            placeholder={placeholder}
            onChange={onLocalChange}
            onKeyDown={onKeyDown}
            value={onChange ? value : localValue}
        />
    );
};

export default Input;
