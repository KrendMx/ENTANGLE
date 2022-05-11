import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

type SelectProps = {
    value: string | undefined;
    children: JSX.Element[];
    onChange: any;
};

type OptionProps = {
    value: string;
    children: string;
    extraSymbol?: JSX.Element;
};

export const Option: React.FC<OptionProps> = ({ value, children, extraSymbol }) => (
    <li data-select-value={value}>
        {children}
        {' '}
        {extraSymbol}
    </li>
);

const Select: React.FC<SelectProps> = ({ value, onChange, children }) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const selectWrapperNode = useRef<HTMLDivElement>(null);

    useEffect(() => {
        React.Children.forEach<React.ReactElement<OptionProps, 'li'>>(
            children,
            (child) => {
                if (child.props.value === value && selected !== value) {
                    setSelected(child?.props?.children || '');
                }
            },
        );
    }, [value]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.hasAttribute('data-select-value')) {
                onChange(target.getAttribute('data-select-value'));
                setIsOpen(!isOpen);
            }
            if (target === selectWrapperNode.current) setIsOpen(!isOpen);
            if (target !== selectWrapperNode.current) setIsOpen(false);
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [isOpen]);

    return (
        <div className={styles.wrapper} ref={selectWrapperNode}>
            <label className={styles.label}>{selected}</label>
            <img
                src="./images/selectArrowIcon.svg"
                className={styles.icon}
                alt=""
            />
            {isOpen && <ul className={styles.options}>{children}</ul>}
        </div>
    );
};

export default Select;
