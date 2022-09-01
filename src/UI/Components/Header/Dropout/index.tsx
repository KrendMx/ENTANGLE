import React from 'react';
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
    ...props
}) => (
    <div className={classNames(styles.wrapper, wrapperClassName)}>
        <label className={styles.label}>
            <input className={styles.input} type="checkbox" readOnly />
            <div
                className={classNames(wrapperTextClassName, {
                    [styles.title]: !wrapperTextClassName,
                })}
                style={
                    {
                        color: props?.active ? 'white' : '',
                    } as React.CSSProperties
                }
            >
                <div className={classNames(textClassName)}>
                    <p>
                        {title}
                    </p>
                    {isSoon && <span className={styles.soonText}>(soon)</span>}
                </div>
                {arrowImg || (
                    <div
                        className={classNames(
                            wrapperPickerClassName,
                            styles.arrow,
                        )}
                    >
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
            <div
                className={classNames(wrapperListClassName, styles.list)}
                style={{ left: offset }}
            >
                {children}
            </div>
        </label>
    </div>
);

export default Dropout;
