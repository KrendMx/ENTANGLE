import type { HTMLAttributes } from 'react';
import React from 'react';
import classNames from 'classnames';
import HintModal from 'UI/ui-kit/HintModal';
import styles from './style.module.css';

interface IText {
    title: string;
    content: string;
    hasTooltip?: boolean;
    tooltipText?: string;
    classText?: HTMLAttributes<HTMLDivElement>['className'];
}

const Text: React.FC<IText> = ({ title, content, ...props }) => (
    <div className={classNames(styles.text, props?.classText)}>
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
