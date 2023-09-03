/** @jsx jsx */
import React, { ReactNode } from 'react';

// eslint-disable-next-line import/named
import { jsx, css } from '@emotion/react';

interface IProps {
    children?: ReactNode,
    customCss?: string,
}

const Text:React.FC<IProps> = ({
    children,
    customCss,
}) => {
    return (
        <p css={css`${customCss}`}>
            {children}
        </p>
    );
};

export default React.memo(Text);
