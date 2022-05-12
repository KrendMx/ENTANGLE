import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

type DropoutProps = {
    title: string;
    wrapperClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    wrapperTextClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    wrapperPickerClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    wrapperListClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    textClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    isSoon?: boolean;
    arrowImg?: React.ReactElement;
    children?: JSX.Element;
};

const Dropout: React.FC<DropoutProps> = ({
    children,
    title,
    wrapperClassName,
    wrapperTextClassName,
    wrapperListClassName,
    wrapperPickerClassName,
    textClassName,
    isSoon = false,
    arrowImg,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Every dropout must be closed after page change
    useEffect(() => {
        setIsOpen(false);
    }, []);

    return (
        <div
            className={classNames(
                styles.wrapper,
                { [styles.open]: false },
                wrapperClassName,
            )}
        >
            <label className={styles.label}>
                <input
                    className={styles.input}
                    type="checkbox"
                    checked={isOpen}
                    readOnly
                />
                <div
                    className={classNames(
                        wrapperTextClassName,
                        {
                            [styles.title]: !wrapperTextClassName,
                        },
                    )}
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                >
                    <div className={classNames(textClassName)}>
                        {title}
                        {isSoon && (
                            <span className={styles.soonText}>
                                (soon)
                            </span>
                        )}
                    </div>
                    {arrowImg || (
                        <img
                            className={classNames(wrapperPickerClassName)}
                            src="./images/arrowIcon.svg"
                            alt=""
                        />
                    )}
                </div>
                <div className={classNames(wrapperListClassName, styles.list)}>{children}</div>
            </label>
        </div>
    );
};

export default Dropout;
