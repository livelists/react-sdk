/** @jsx jsx */
import React from 'react';

import { jsx } from '@emotion/react';

import { SystemMessageBlock } from '../../../atoms/SystemMessageBlock';

const UnreadLabel:React.FC = () => {

    return (
        <SystemMessageBlock
            isBottomMargin
            text="Unread messages"
        />
    );
};

export default React.memo(UnreadLabel);
