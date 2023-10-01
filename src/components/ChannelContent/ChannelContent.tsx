/** @jsx jsx */
import React, { ReactElement } from 'react';

import { css, jsx } from '@emotion/react';

import { BG_DATA_URI } from './BG_DATA_URI';

const cont = css`
  width: 100%;
  flex-shrink: 1;
  position: relative;  
  background: #8BABD8;
`;

const bgCont = css`
  background: url(${BG_DATA_URI});
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0.5;
  background-size: contain;
`;

const content = css`
    width: 100%;
    height: 100%;
    z-index: 10;
    position: relative;
`;

interface IProps {
    children?: ReactElement
}

const ChannelContent:React.FC<IProps> = ({
    children,
}) => {


    return (
        <div css={cont}>
            <div css={bgCont} />
            <div css={content}>
                {children}
            </div>
        </div>
    );
};

export default React.memo(ChannelContent);
