import React from 'react';
import classNames from 'classnames';
import styles from './style.module.css';
import HintModal from '../HintModal';

type TextGroupProps = {
    title: string;
    value: string | JSX.Element;
    hintText?: string;
    customClassNameWrapper?: React.HTMLAttributes<HTMLDivElement>['className'];
    customClassNameTitle?: React.HTMLAttributes<HTMLDivElement>['className'];
    customClassNameValue?: React.HTMLAttributes<HTMLDivElement>['className'];
};

const TextGroup: React.FC<TextGroupProps> = React.memo(({
    title,
    value,
    hintText,
    ...props
}) => (
    <div className={classNames(styles.formItem, styles.shareText, props?.customClassNameWrapper)}>
        <div
            className={classNames(styles.shareText)}
        >
            <p className={props?.customClassNameTitle}>{title}</p>
            {hintText && (
                <HintModal>
                    <p>{hintText}</p>
                </HintModal>
            )}
        </div>
        {typeof value === 'string' ? (
            <p className={props?.customClassNameValue}>
                {value}
            </p>
        ) : <div>{value}</div>}
    </div>
));

export default TextGroup;
