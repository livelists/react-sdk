/** @jsx jsx */
import React from 'react';

import { css, jsx } from '@emotion/react';

import { SystemMessageBlock } from '../../../atoms/SystemMessageBlock';

const UnreadLabel:React.FC = () => {

    return (
        <SystemMessageBlock
            text="Unread messages"
        />
    );
};

export default React.memo(UnreadLabel);
