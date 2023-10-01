/** @jsx jsx */
import React, { useState } from 'react';

import { css, jsx } from '@emotion/react';

import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';

const ENTER_CHAR_CODE = 13;

const cont = css`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    gap: 20px;
    height: 100px;
    padding-top: 7px;
`;

const inputBlock = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 694px;
    gap: 20px;
    height: 56px;
    background: white;
    border-radius: 12px;
    padding: 0 8px 0 10px;
`;

const input = `
    width: 100%;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
    border: none;
    outline: none;
    &:focus {
        outline: none;
    }
`;

const sendButton = `
    width: 40px;
    height: 40px;
    background: transparent;
    flex-shrink: 0;
    border-radius: 50%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const sendIcon = css`
    fill: white;
    transition: .3s ease-in-out transform;
`;


interface IProps {
    onSubmit?: ({ value }:{ value: string|undefined }) => void,
    placeholder?: string,
}

const ChatInput:React.FC<IProps> = ({ onSubmit, placeholder }) => {
    const [formValue, setValue] = useState<string>();

    const handleSubmit = () => {
        if (onSubmit && formValue) {
            onSubmit({ value: formValue });
        }
    };

    const onClickButton = () => {
        handleSubmit();
        setValue('');
    };

    const onKeyDown = (args:React.KeyboardEvent<HTMLInputElement>) => {
        if (args.key === 'Enter' || args.keyCode === ENTER_CHAR_CODE) {
            handleSubmit();
            setValue('');
        }
    };

    return (
        <div css={cont}>
            <div css={inputBlock}>
                <Input
                    customCss={input}
                    value={formValue}
                    placeholder={placeholder}
                    onChange={({ value }) => setValue(value)}
                    onKeyDown={onKeyDown}
                />
                <Button
                    disabled={!formValue}
                    onClick={onClickButton}
                    cssCustom={sendButton}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        css={sendIcon}
                    >
                        <path
                            fill="#8BABD8"
                            d="m12.815 12.197-7.532 1.256a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.943l18-9a.75.75 0 0 0 0-1.342l-18-9c-.614-.307-1.283.304-1.035.943l2.598 6.957a.5.5 0 0 0 .386.319l7.532 1.255a.2.2 0 0 1 .119.326.2.2 0 0 1-.119.068h-.001Z"
                        />
                    </svg>
                </Button>
            </div>
        </div>
    );
};

export default React.memo(ChatInput);
