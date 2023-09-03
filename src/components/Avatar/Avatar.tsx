/** @jsx jsx */
import React from 'react';

import { css, jsx } from '@emotion/react';

import { Text } from '../../atoms/Text';

interface IProps {
    identifier: string | undefined,
    bigSize?: boolean,
}

const Avatar:React.FC<IProps> = ({
    identifier,
    bigSize,
}) => {

    return (
        <div css={css`
            width: ${bigSize ? '54px' : '44px'};
            height: ${bigSize ? '54px' : '44px'};
            background: #4052ee;
            color: white;
            border-radius: 30px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          `}>
            <Text
                customCss={`
                  color: white;
                  font-size: 20px;
                `}
            >
                {identifier?.[0]}
            </Text>
        </div>
            
    );
};

export default React.memo(Avatar);
