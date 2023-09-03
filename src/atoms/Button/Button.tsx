/** @jsx jsx */
import React, { ReactElement } from 'react';

// eslint-disable-next-line import/named
import { jsx, css } from '@emotion/react';

interface IProps {
    onClick?: () => void,
    children?: ReactElement | string,
    disabled?: boolean,
    cssCustom?: string,
}

const Button:React.FC<IProps> = ({
    onClick,
    children,
    disabled,
    cssCustom,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            css={css`${cssCustom}`}
        >
            {children}
        </button>
    );
};

export default React.memo(Button);
