/** @jsx jsx */
import React, { ReactElement } from 'react';

import { css, jsx } from '@emotion/react';

import { Text } from '../../atoms/Text';
import { Avatar } from '../Avatar';


const cont = css`
    background: white;
    width: 100%;
    height: 56px;
    border-bottom: 1px solid #D9DCE0;
    padding: 8px 16px;
    display: flex;
    align-items: flex-start;
    box-shadow: 0 2px 2px rgb(114,114,114,0.169);
`;

const avatarCont = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 60px;
`;

const textInfo = css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

interface IProps {
    children?: ReactElement
}

const ChannelInfo:React.FC<IProps> = ({
    children,
}) => {
    return (
        <div css={cont}>
            <div css={avatarCont}>
                <Avatar
                    identifier='AAA'
                />
            </div>
            <div css={textInfo}>
                <Text
                    customCss={`
                        color: #011627;
                        font-size: 16px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 20px;
                    `}
                >
                    David Moore
                </Text>
                <Text
                    customCss={`
                        color: #707991;
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 18px; 
                    `}
                >
                    last seen 5 mins ago
                </Text>
            </div>
            {children}
        </div>
    );
};

export default React.memo(ChannelInfo);
