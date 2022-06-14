import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './style.module.css';

type PropSelectTypes = {
    currenc: string;
    func: any;
    currencSymbol: string;
};

type PropOptionTypes = {
    key?: number;
    isOpen: boolean;
    handleClick: () => void;
    icon: string;
    name: string;
    currencSymbol: string;
    price: string | number;
    customClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
};

type currencyObject = {
    name: string;
    icon: string;
    price: number;
};

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
                    width={16}
                    height={16}
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
        USDC: {
            name: 'fUSDT-USDC',
            icon: '/images/networks/avalancheDashboard.png',
        },
        BUSD: {
            name: 'UST-BUSD',
            icon: '/images/networks/pancakeDashboard.png',
        },
        UST: { name: 'UST', icon: '/images/networks/anchorDashboard.png' },
    };

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const changeIsOpen = () => {
        if (isOpen) {
            setIsOpen(false);
            return;
        }
        setIsOpen(true);
    };
    const modal = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClick = (e: MouseEvent) =>
            modal.current
            && !modal.current.contains(e.target as Node)
            && setIsOpen(false);

        window.addEventListener('mousedown', handleClick);

        return () => window.removeEventListener('mousedown', handleClick);
    }, []);

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
                                width={16}
                                height={16}
                                quality={100}
                            />
                        </div>
                    </div>
                ) : (
                    <SyntOption
                        {...currencyObject[currenc]}
                        handleClick={changeIsOpen}
                        price={123}
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
                            isOpen={isOpen}
                            currencSymbol={currencSymbol}
                            icon={el.icon}
                            price={123}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export type { currencyObject };
export default SyntSelect;
