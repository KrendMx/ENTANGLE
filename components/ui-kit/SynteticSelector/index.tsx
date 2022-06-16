import React, {
    useEffect, useReducer, useRef, useState,
} from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './style.module.css';
import type {
    PropSelectTypes,
    PropOptionTypes,
    currencyObject,
    priceObject,
} from './SynteticSelector.types';
import { useAppSelector } from '@/src/Redux/store/hooks/redux';

const SyntOption: React.FC<PropOptionTypes> = ({
    icon,
    name,
    price,
    handleClick,
    currencSymbol,
    isOpen,
    ...props
}) => (
    <div
        key={props?.key}
        className={classNames(styles.item, props?.customClassName)}
        onClick={() => {
            handleClick();
        }}
    >
        <Image alt="" src={icon} width={22} height={22} />
        <p className={styles.itemText}>{name}</p>
        {!isOpen ? (
            <div
                className={classNames(
                    styles.wrapperImage,
                    isOpen ? styles.wrapperImageOpen : null,
                )}
            >
                <Image
                    alt=""
                    src="/images/arrowIcon.svg"
                    width={10}
                    height={10}
                    quality={100}
                />
            </div>
        ) : null}
        <div className={styles.itemPrice}>
            <p>
                {`${price}`}
                &ensp;
                {`${currencSymbol}`}
            </p>
        </div>
    </div>
);

const SyntSelect: React.FC<PropSelectTypes> = ({
    func,
    currenc,
    currencSymbol,
}) => {
    const currencyObject = {
        'BSC': {
            name: 'UST-BUSD',
            icon: '/images/networks/pancakeDashboard.png',
        },
        'AVAX': {
            name: 'fUSDT-USDC',
            icon: '/images/networks/avalancheDashboard.png',
        },
    };

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { balances } = useAppSelector((state) => state.userReducer);

    const changeIsOpen = () => { setIsOpen(!isOpen); };

    const [priceState, priceDispatcher] = useReducer(
        (oldState: priceObject, newState: Partial<priceObject>) => ({
            ...oldState,
            ...newState,
        }),
        {
            'AVAX': '~',
            'BSC': '~',
        },
    );

    const modal = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) =>
            modal.current
            && !modal.current.contains(e.target as Node)
            && setIsOpen(false);

        window.addEventListener('mousedown', handleClick);

        return () => window.removeEventListener('mousedown', handleClick);
    }, []);

    useEffect(() => {
        if (balances.AVAX) { priceDispatcher({ ...priceState, 'AVAX': balances.AVAX.positions.toString() }); }
        if (balances.BSC) { priceDispatcher({ ...priceState, 'BSC': balances.BSC.positions.toString() }); }
    }, [balances]);

    return (
        <div ref={modal} style={{ width: '100%', position: 'relative' }}>
            <div className={styles.wrapper} onClick={changeIsOpen}>
                {!currenc ? (
                    <div className={styles.textElement}>
                        <p>Select your Synth-Lp</p>
                        <div
                            className={classNames(
                                styles.wrapperImage,
                                isOpen ? styles.wrapperImageOpen : null,
                            )}
                        >
                            <Image
                                alt=""
                                src="/images/arrowIcon.svg"
                                width={10}
                                height={10}
                                quality={100}
                            />
                        </div>
                    </div>
                ) : (
                    <SyntOption
                        {...currencyObject[currenc]}
                        handleClick={changeIsOpen}
                        price={priceState[currenc]}
                        customClassName={styles.noPadding}
                        currencSymbol={currencSymbol}
                    />
                )}
            </div>
            {isOpen ? (
                <div className={styles.selectBlock}>
                    {Object.values(currencyObject).map((el, index) => (
                        <SyntOption
                            name={el.name}
                            key={index}
                            handleClick={() => {
                                func(Object.keys(currencyObject)[index]);
                                changeIsOpen();
                            }}
                            price={priceState[Object.keys(currencyObject)[index]]}
                            isOpen={isOpen}
                            currencSymbol={currencSymbol}
                            icon={el.icon}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export type { currencyObject };
export default SyntSelect;
