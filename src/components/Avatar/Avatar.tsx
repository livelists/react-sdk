import React from 'react';

import { Text } from '../../atoms/Text';
import { cnb } from '../../utils/helpers/cnb';
import styles from './Avatar.module.css';

interface IProps {
    className?: string,
    identifier: string | undefined,
}

const ChatMessage:React.FC<IProps> = ({
    className,
    identifier,
}) => {

    return (
        <div className={cnb(styles.avatar, className)}>
            <Text className={styles.avatarText}>
                {identifier?.[0]}
            </Text>
        </div>
            
    );
};

export default React.memo(ChatMessage);
