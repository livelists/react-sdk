/** @jsx jsx */
import React from 'react';

// eslint-disable-next-line import/named
import { jsx, css } from '@emotion/react';

import { Text } from '../Text';

const cont = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 12px;
  margin-bottom: 16px;
`;

interface IProps {
    text: string,
}

const SystemMessageBlock:React.FC<IProps> = ({
    text,
}) => {
    return (
        <p css={cont}>
            <Text>
                {text}
            </Text>
        </p>
    );
};

export default React.memo(SystemMessageBlock);
