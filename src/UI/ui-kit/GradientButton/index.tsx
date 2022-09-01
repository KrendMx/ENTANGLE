import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './style.module.css';
import SearchIcon from '../SearchIcon';

type GradientButtonProps = {
    title: string;
    titleElement?: React.ReactElement;
    titleClass?: React.HTMLAttributes<HTMLDivElement>['className'];
    wrapperClass?: React.HTMLAttributes<HTMLDivElement>['className'];
    onClick: () => void;
    disabled?: boolean;
    loader?: JSX.Element;
    active?: boolean;
    isSearch?: boolean;
    isWhite?: boolean;
};

const GradientButton: React.FC<GradientButtonProps> = React.memo(
    ({
        title,
        titleElement,
        titleClass,
        wrapperClass,
        onClick,
        disabled = false,
        loader,
        isWhite = false,
        isSearch = false,
        ...props
    }) => {
        const [hover, setHover] = useState(false);

        return (
            <div
                onClick={() => {
                    if (!disabled) {
                        onClick();
                    }
                }}
                onMouseEnter={() => {
                    setHover(true);
                }}
                onMouseLeave={() => {
                    setHover(false);
                }}
                className={classNames(wrapperClass, styles.wrapper, {
                    [styles.disabled]: disabled,
                    [styles.white]: isWhite,
                })}
            >
                {titleElement ? (
                    <div
                        className={classNames(titleClass, styles.titleElement)}
                    >
                        {titleElement}
                    </div>
                ) : (
                    <div
                        className={classNames(titleClass || null, styles.dflex, {
                            [styles.active]: props?.active,
                            [styles.title]: !isWhite,
                            [styles.whiteTitle]: isWhite,
                        })}
                    >
                        <p>{title}</p>
                        {loader}
                    </div>
                )}
            </div>
        );
    },
);

export default GradientButton;
