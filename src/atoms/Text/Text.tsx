import React, { ReactNode } from 'react';

interface IProps {
    children?: ReactNode,
    className?: string,
}

const Text:React.FC<IProps> = ({ children, className }) => {
    return (
        <p className={className}>
            {children}
        </p>
    );
};

export default React.memo(Text);
