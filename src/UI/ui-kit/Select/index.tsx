import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import styles from './styles.module.css';

import type { OptionProps, SelectProps } from './Select.interfaces';

export const Option: React.FC<OptionProps> = ({
    value,
    children,
    extraSymbol,
    ...props
}) => (
    <li data-select-value={value}>
        {children}
        {(() => {
            if (props.state?.includes(value)) {
                if (props.state?.includes('desk')) {
                    return <div className={styles.rotate}>{extraSymbol}</div>;
                }
                return <div>{extraSymbol}</div>;
            }
        })()}
    </li>
);

const Select: React.FC<SelectProps> = ({
    value,
    onChange,
    children,
    customClassName,
    disabled,
    isCenter = false,
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
            if (selectWrapperNode.current.contains(target as Node)) {
                setIsOpen(!isOpen);
            }
            if (!selectWrapperNode.current.contains(target as Node)) {
                setIsOpen(false);
            }
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [isOpen]);

    return (
        <div
            className={classNames(styles.wrapper, customClassName, [
                disabled ? styles.disabled : '',
            ])}
            ref={selectWrapperNode}
        >
            <label
                className={classNames(styles.label, {
                    [styles.isCenter]: isCenter,
                })}
            >
                {selected}
            </label>
            <Image
                width={13}
                height={13}
                quality={100}
                src="/images/selectArrowIcon.svg"
                className={classNames(styles.icon, {
                    [styles.rotated]: isOpen,
                })}
                alt=""
            />
            <CSSTransition
                in={isOpen}
                timeout={200}
                unmountOnExit
                classNames={{
                    enter: styles['alert-enter'],
                    enterActive: styles['alert-enter-active'],
                    exit: styles['alert-exit'],
                    exitActive: styles['alert-exit-active'],
                }}
            >
                <ul className={styles.options}>{children}</ul>
            </CSSTransition>
        </div>
    );
};

export default Select;
