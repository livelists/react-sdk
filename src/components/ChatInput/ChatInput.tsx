import React, { useState, ChangeEvent } from 'react';
import styles from './ChatInput.module.css';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';

interface IProps {
    onChange?: ({ value }:{ value: string }) => void,
    placeholder?: string,
}

const ChatInput:React.FC<IProps> = ({ onChange, placeholder }) => {
    return (
        <div className={styles.cont}>
            <Input
                placeholder='Message...'
            />
            <Button>
                Send
            </Button>
        </div>
    )
};

export default React.memo(ChatInput);
