/** @jsx jsx */
import React from 'react';

// eslint-disable-next-line import/named
import { jsx, css } from '@emotion/react';

import { Text } from '../Text';

const cont = css`
  width: fit-content;
  border-radius: 12px;
  background: rgba(61, 112, 184, 0.60);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  padding: 4px 12px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-top: 10px;
`;

interface IProps {
    text: string,
}

const SystemMessageBlock:React.FC<IProps> = ({
    text,
}) => {
    return (
        <div css={cont}>
            <Text
                customCss={`
                   color: white;
                   font-size: 16px;
                `}
            >
                {text}
            </Text>
        </div>
    );
};

export default React.memo(SystemMessageBlock);
