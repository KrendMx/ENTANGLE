import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { chainToNameConfig, networks } from 'utils/Global/Vars';
import type {
    TokenSelectProps,
    TokenOptionProps,
} from './TokenSelect.intefaces';

import styles from './style.module.css';
import PayModal from '../../Pages/HomePage/PayModal';
import Modal from '../../Components/Modal';

export const TokenOption: React.FC<TokenOptionProps> = ({
    key,
    value,
    children,
    currency,
    amount,
    ...props
}) => (
    <li
        data-select-value={value}
        data-select-amount={amount}
        data-select-abbr={props?.name}
        className={styles.selectElem}
        key={key}
    >
        <div
            className={styles.asset}
            data-select-value={value}
            data-select-amount={amount}
            data-select-abbr={props?.name}
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
                data-select-abbr={props?.name}
            />
            <p
                className={styles.assetText}
                data-select-value={value}
                data-select-amount={amount}
                data-select-abbr={props?.name}
            >
                {children}
            </p>
        </div>
        <p
            className={styles.amount}
            data-select-value={value}
            data-select-amount={amount}
            data-select-abbr={props?.name}
        >
            {amount ? amount !== 'Buy now' ? Number(Number(amount).toFixed(3)) : amount : undefined}
            {' '}
            {amount !== 'Buy now' ? currency : undefined}
        </p>
    </li>
);

const TokenSelect: React.FC<TokenSelectProps> = ({
    value,
    onChange,
    children,
    currency,
    title,
    withBalance = true,
    customClassName,
    defaultLabel,
    disabled,
    showPayModal = false,
    selectedTitle = 'currencyMin',
}) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenPayable, setIsOpenPayable] = useState<boolean>(false);
    const selectWrapperNode = useRef<HTMLDivElement>(null);

    useEffect(() => {
        React.Children.forEach<React.ReactElement<TokenOptionProps, 'li'>>(
            children as any,
            (child) => {
                if (child?.props?.value === value && selected !== value) {
                    if (child?.props?.amount) setBalance(child?.props?.amount.split(' ')[0]);
                    setSelected(child?.props?.value);
                }
            },
        );
    }, [value]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.hasAttribute('data-select-value')
                && target.getAttribute('data-select-amount') !== 'Buy now'
            ) {
                onChange(target.getAttribute('data-select-value'));
                setIsOpen(!isOpen);
            }
            if (target.getAttribute('data-select-amount') === 'Buy now') {
                sessionStorage.setItem('card', target.getAttribute('data-select-abbr'));
                setIsOpenPayable(true);
            }
            if (selectWrapperNode.current.contains(target as Node)) setIsOpen(!isOpen);
            if (!selectWrapperNode.current.contains(target as Node)) setIsOpen(false);
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [isOpen]);

    return (
        <>
            {title && <p className={styles.title}>{title}</p>}
            {showPayModal && isOpenPayable ? (
                <Modal handleClose={() => { setIsOpenPayable(false); }}>
                    <PayModal
                        handleClose={() => { setIsOpenPayable(false); }}
                        available="123"
                        totalAvailable="123"
                        price="123"
                    />
                </Modal>
            ) : null}
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
                        {networks[selected]?.[selectedTitle] ? networks[selected][selectedTitle] : defaultLabel}
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
                        {balance}
                        {' '}
                        {currency}
                    </p>
                )}
                {isOpen && <ul className={styles.options}>{children}</ul>}
            </div>
        </>
    );
};

export default TokenSelect;
