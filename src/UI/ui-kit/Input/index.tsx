import type { InputHTMLAttributes } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.css';

type InputProps = {
    value?: string;
    placeholder: string;
    type: string;
    title?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    otherProps?: InputHTMLAttributes<HTMLInputElement>;
    classNameInputModifier?: InputHTMLAttributes<HTMLInputElement>['className'];
    getMax?: () => void;
    min?: string
};

const Input: React.FC<InputProps> = ({
    value,
    onChange,
    classNameInputModifier,
    placeholder,
    getMax,
    type,
    otherProps,
    title,
    ...props
}) => (
    <>
        {title && <p className={styles.inputTitle}>{title}</p>}
        <div className={styles.wrapper}>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                min={props?.min}
                className={classNames(styles.input, classNameInputModifier)}
                {...otherProps}
            />
            {type === 'number' && (
                <p className={styles.gradientText} onClick={getMax}>
                    max
                </p>
            )}
            {
                type === 'text' && (
                    <button type="submit">
                        <Image
                            width={23}
                            height={23}
                            quality={100}
                            className={styles.searchIcon}
                            src="/images/searchIcon.svg"
                            alt=""
                        />
                    </button>
                )
            }
        </div>
    </>
);

export default Input;
