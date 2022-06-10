import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './styles.module.css';

type SelectProps = {
    value: string | undefined;
    children: React.ReactNode[];
    onChange: (HTMLElement) => void;
    customClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    customOptionClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    disabled?:boolean;
};

type OptionProps = {
    value: string;
    children: string;
    extraSymbol?: JSX.Element;
};

export const Option: React.FC<OptionProps> = ({
    value, children, extraSymbol,
}) => (
    <li data-select-value={value}>
        {extraSymbol}
        {children}
    </li>
);

const Select: React.FC<SelectProps> = ({
    value, onChange, children, customClassName, disabled,
}) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const selectWrapperNode = useRef<HTMLDivElement>(null);

    useEffect(() => {
        React.Children.forEach<React.ReactElement<OptionProps, 'li'>>(
            children as any,
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
        <div
            className={
                classNames(styles.wrapper, customClassName, [disabled ? styles.disabled : ''])
            }
            ref={selectWrapperNode}
        >
            <label className={styles.label}>{selected}</label>
            <Image
                width={13}
                height={13}
                quality={100}
                src="/images/selectArrowIcon.svg"
                className={styles.icon}
                alt=""
            />
            {isOpen && <ul className={styles.options}>{children}</ul>}
        </div>
    );
};

export default Select;
