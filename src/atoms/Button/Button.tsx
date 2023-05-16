import React, { ReactElement } from 'react';

interface IProps {
    onClick?: () => void,
    children?: ReactElement | string,
    disabled?: boolean,
    className?: string,
}

const Button:React.FC<IProps> = ({
    onClick,
    children,
    disabled,
    className,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={className}
        >
            {children}
        </button>
    );
};

export default React.memo(Button);
