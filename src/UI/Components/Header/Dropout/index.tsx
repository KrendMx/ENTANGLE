import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './styles.module.css';
import type { DropoutProps } from './Dropout.interfaces';

const Dropout: React.FC<DropoutProps> = ({
    children,
    title,
    wrapperClassName,
    wrapperTextClassName,
    wrapperListClassName,
    wrapperPickerClassName,
    textClassName,
    offset = '0px',
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
                        <div className={classNames(wrapperPickerClassName)}>
                            <Image
                                width={12}
                                height={12}
                                quality={100}
                                src="/images/arrowIcon.svg"
                                alt=""
                            />
                        </div>
                    )}
                </div>
                <div className={classNames(wrapperListClassName, styles.list)} style={{ left: offset }}>{children}</div>
            </label>
        </div>
    );
};

export default Dropout;