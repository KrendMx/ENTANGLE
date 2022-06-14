import React from 'react';
import styles from './style.module.css';
import HintModal from '@/components/ui-kit/HintModal';

interface IText {
    title: string;
    content: string;
    hasTooltip?: boolean;
    tooltipText?: string;
}

const Text: React.FC<IText> = ({ title, content, ...props }) => (
    <div className={styles.text}>
        <p>{title}</p>
        {props?.hasTooltip ? (
            <HintModal>
                <p style={{ justifyContent: 'center' }}>{props?.tooltipText}</p>
            </HintModal>
        ) : null}
        <p>{content}</p>
    </div>
);

export default Text;
