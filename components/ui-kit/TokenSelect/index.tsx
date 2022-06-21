import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { chainToNameConfig, networks } from '@/src/utils/GlobalConst';
import type {
    TokenSelectProps,
    TokenOptionProps,
} from './TokenSelect.intefaces';

import styles from './style.module.css';
import { useAppSelector } from '@/src/Redux/store/hooks/redux';

export const TokenOption: React.FC<TokenOptionProps> = ({
    key,
    value,
    children,
    amount,
}) => (
    <li
        data-select-value={value}
        data-select-amount={amount}
        className={styles.selectElem}
        key={key}
    >
        <div
            className={styles.asset}
            data-select-value={value}
            data-select-amount={amount}
        >
            <Image
                src={`/images/alternativeAssets/${chainToNameConfig[value]}.svg`}
                width={24}
                height={24}
                quality={100}
                className={styles.image}
                alt={`${chainToNameConfig[value]}-asset`}
                data-select-value={value}
                data-select-amount={amount}
            />
            <p
                className={styles.assetText}
                data-select-value={value}
                data-select-amount={amount}
            >
                {children}
            </p>
        </div>
        <p
            className={styles.amount}
            data-select-value={value}
            data-select-amount={amount}
        >
            {amount}
        </p>
    </li>
);

const TokenSelect: React.FC<TokenSelectProps> = ({
    value,
    onChange,
    children,
    title,
    withBalance=true,
    customClassName,
    defaultLabel,
    disabled,
}) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const selectWrapperNode = useRef<HTMLDivElement>(null);

    const { balances } = useAppSelector((state) => state.userReducer);
    const { chainId } = useAppSelector((state) => state.walletReducer);

    useEffect(() => {
        React.Children.forEach<React.ReactElement<TokenOptionProps, 'li'>>(
            children as any,
            (child) => {
                if (child?.props?.value === value && selected !== value) {
                    setSelected(child?.props?.value);
                }
            },
        );
    }, [value]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.hasAttribute('data-select-value') &&
                target.getAttribute('data-select-amount') !== 'Buy now'
            ) {
                onChange(target.getAttribute('data-select-value'));
                setIsOpen(!isOpen);}
            if (target.getAttribute('data-select-amount') === 'Buy now') {
                location.replace(`${location.origin}/?net=${chainId}&card=${target.getAttribute('data-select-value')}`)
            }
            if (selectWrapperNode.current.contains(target as Node))
                setIsOpen(!isOpen);
            if (!selectWrapperNode.current.contains(target as Node))
                setIsOpen(false);
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [isOpen]);

    return (
        <>
            {title && <p className={styles.title}>{title}</p>}
            <div
                className={classNames(styles.wrapper, customClassName, [
                    disabled ? styles.disabled : '',
                ])}
                ref={selectWrapperNode}
            >
                <div className={styles.asset}>
                    {selected && (
                        <Image
                            src={`/images/alternativeAssets/${chainToNameConfig[selected]}.svg`}
                            width={24}
                            height={24}
                            quality={100}
                            alt={`${selected}-asset`}
                        />
                    )}
                    <label className={styles.label}>
                        {networks[selected]?.currencyMin || defaultLabel}
                    </label>
                    <Image
                    width={13}
                    height={13}
                    quality={100}
                    src="/images/selectArrowIcon.svg"
                    className={classNames(styles.icon, {
                        [styles.rotate]: isOpen,
                        [styles.selected]: selected,
                    })}
                    alt=""
                />
                </div>
                {selected && withBalance && (
                    <p>
                        {balances[chainToNameConfig[selected]]?.positions}{' '}
                        SYNTHUSDC
                    </p>
                )}
                {isOpen && <ul className={styles.options}>{children}</ul>}
            </div>
        </>
    );
};

export default TokenSelect;
