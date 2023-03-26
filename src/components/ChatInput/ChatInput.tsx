import React, { useState } from 'react';

import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import styles from './ChatInput.module.css';

interface IProps {
    onSubmit?: ({ value }:{ value: string|undefined }) => void,
    placeholder?: string,
}

const ChatInput:React.FC<IProps> = ({ onSubmit, placeholder }) => {
    const [formValue, setValue] = useState<string>();

    return (
        <div className={styles.cont}>
            <Input
                placeholder={placeholder}
                onChange={({ value }) => setValue(value)}
            />
            <Button
                onClick={onSubmit ? () => onSubmit({ value: formValue }) : undefined}
            >
                Submit
            </Button>
        </div>
    );
};

export default React.memo(ChatInput);
