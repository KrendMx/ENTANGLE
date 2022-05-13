import type { InputHTMLAttributes } from 'react';
import React from 'react';
import styles from './styles.module.css';

type InputProps = {
    value: string;
    placeholder: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    otherProps?: InputHTMLAttributes<HTMLInputElement>;
    children: JSX.Element
};

const Input: React.FC<InputProps> = ({
    value,
    onChange,
    placeholder,
    children,
    type,
    otherProps,
}) => (
    <div className={styles.wrapper}>
        <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={styles.input}
            {...otherProps}
        />
        {children}
    </div>
);

export default Input;
