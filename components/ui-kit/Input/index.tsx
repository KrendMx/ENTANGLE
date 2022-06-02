import type { InputHTMLAttributes } from 'react';
import React from 'react';
import styles from './styles.module.css';

type InputProps = {
    value: string;
    placeholder: string;
    type: string;
    title?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    otherProps?: InputHTMLAttributes<HTMLInputElement>;
    getMax: () => void;
};

const Input: React.FC<InputProps> = ({
    value,
    onChange,
    placeholder,
    getMax,
    type,
    otherProps,
    title,
}) => (
    <>
        {title && <p className={styles.inputTitle}>{title}</p>}
        <div className={styles.wrapper}>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={styles.input}
                {...otherProps}
            />
            {type === 'number' && (
                <p className={styles.gradientText} onClick={getMax}>
                    max
                </p>
            )}
        </div>
    </>
);

export default Input;
