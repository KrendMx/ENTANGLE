import React from 'react';
import classNames from 'classnames';
import styles from './style.module.css';
import HintModal from '../HintModal';

type TextGroupProps = {
    title: string;
    value: string;
    hintText?: string;
    customClassNameTitle?: React.HTMLAttributes<HTMLDivElement>['className'];
    customClassNameValue?: React.HTMLAttributes<HTMLDivElement>['className'];
};

const TextGroup: React.FC<TextGroupProps> = ({
    title,
    value,
    hintText,
    ...props
}) => (
    <div className={classNames(styles.formItem, styles.shareText, {
        [props?.customClassNameTitle]: props?.customClassNameTitle,
    })}
    >
        <div
            className={classNames(styles.iBlock)}
        >
            <p>{title}</p>
            {hintText && (
                <HintModal>
                    <p>{hintText}</p>
                </HintModal>
            )}
        </div>
        <p>
            {value}
        </p>
    </div>
);

export default TextGroup;
