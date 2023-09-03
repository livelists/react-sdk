/** @jsx jsx */
import React, { useState } from 'react';

import { css, jsx } from '@emotion/react';

import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';

const ENTER_CHAR_CODE = 13;

const cont = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 20px;
    height: 67px;
    padding: 0 30px;
    box-shadow: 0 0 5px #dcdcdc;
`;

const input = `
    width: 100%;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
    border: none;
`;

const sendButton = `
    width: 44px;
    height: 44px;
    background: rgb(114,76,233);
    background: linear-gradient(153deg, rgba(114,76,233,1) 48%, rgba(64,82,238,1) 100%);
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
                    viewBox="0 0 24 24"
                    css={sendIcon}
                >
                    <path
                        fill="none"
                        d="M0 0h24v24H0V0z"
                    />
                    <path
                        d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"
                    />
                </svg>
            </Button>
        </div>
    );
};

export default React.memo(ChatInput);
