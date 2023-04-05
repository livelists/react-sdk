import React, { ReactNode } from 'react';

interface IProps {
    children?: ReactNode,
}

const Text:React.FC<IProps> = ({ children }) => {
    return (
        <p>
            {children}
        </p>
    );
};

export default React.memo(Text);
