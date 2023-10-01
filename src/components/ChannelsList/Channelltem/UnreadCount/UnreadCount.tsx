/** @jsx jsx */
import React from 'react';

import { jsx, css } from '@emotion/react';

import { Text } from '../../../../atoms/Text';

const cont = css`
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #78E378;
  padding: 0 5.5px;
`;

interface IProps {
   count: number,
}

const UnreadCount:React.FC<IProps> = ({
    count,
}) => {
    
    return (
        <div css={cont}>
            <Text
                customCss={`
                    color: white;
                `}
            >
                {count}
            </Text>
        </div>
    );
};

export default React.memo(UnreadCount);
