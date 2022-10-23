import React, { ReactElement } from 'react';

interface IProps {
    onClick?: () => void,
    children?: ReactElement | string
}

const Button:React.FC<IProps> = ({ onClick, children}) => {
    return (
        <button
            onClick={onClick}
        >
            {children}
        </button>
    )
};

export default React.memo(Button);
