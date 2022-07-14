import type { HTMLAttributes } from 'react';
import React from 'react';

interface InputProps {
    value: string;
    onChange: (e: any) => void;
    className: HTMLAttributes<HTMLInputElement>['className'];
    style?: any;
}

const Input: React.FC<InputProps> = ({
    value,
    onChange,
    className,
    ...props
}) => {
    const changeWidthHandler = (e: any) => {
        e.target.style.width = `${e.target.value.length + 3}ch`;
        onChange(e);
    };
    return (
        <input
            type="number"
            onChange={changeWidthHandler}
            className={className}
            value={value}
            style={props.style}
            placeholder="0.0"
        />
    );
};

export default Input;
