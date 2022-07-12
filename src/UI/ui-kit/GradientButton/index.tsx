import React from 'react';
import classNames from 'classnames';
import styles from './style.module.css';

type GradientButtonProps = {
    title: string;
    titleElement?: React.ReactElement;
    titleClass?: React.HTMLAttributes<HTMLDivElement>['className'];
    wrapperClass?: React.HTMLAttributes<HTMLDivElement>['className'];
    gradient?: string;
    onClick: () => void;
    disabled?: boolean;
    loader?: JSX.Element
    active?: boolean
};

const GradientButton: React.FC<GradientButtonProps> = ({
    title,
    titleElement,
    titleClass,
    wrapperClass,
    onClick,
    disabled,
    loader,
    gradient = 'linear-gradient(90deg, #FF5EBA 0%, #6831D6DE 87%, #0094FF 100%)',
    ...props
}) => (
    <div
        onClick={onClick}
        style={{ background: gradient }}
        className={classNames(wrapperClass, styles.wrapper, {
            [styles.disabled]: disabled,
        })}
    >
        {titleElement ? (
            <div className={classNames(titleClass, styles.titleElement)}>{titleElement}</div>
        ) : (
            <p className={classNames(styles.title, titleClass || null, { [styles.active]: props?.active })}>
                {title}
                {loader}
            </p>
        )}
    </div>
);

export default GradientButton;