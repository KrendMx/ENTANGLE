import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './style.module.css';

type PropSelectTypes = {
    currenc: string;
    func: any;
    currencSymbol: string;
}

type PropOptionTypes = {
    key?:number,
    handleClick: ()=>void,
    icon:string,
    name:string,
    currencSymbol: string;
    price: string|number,
    customClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
}

type currencyObject = {
    name: string;
    icon: string;
    price: number;
}

const SyntOption:React.FC<PropOptionTypes> = ({
    icon, name, price, handleClick, currencSymbol, ...props
}) => (
    <div
        key={props?.key}
        className={classNames(styles.item, props?.customClassName)}
        onClick={() => {
            handleClick();
        }}
    >
        <Image
            alt=""
            src={icon}
            width={35}
            height={35}
        />
        <p className={styles.itemText}>{name}</p>
        <div className={styles.itemPrice}>
            <p>
                {`${price}`}
                &ensp;
                {`${currencSymbol}`}
            </p>
        </div>

    </div>
);

const SyntSelect:React.FC<PropSelectTypes> = ({ func, currenc, currencSymbol }) => {
    const currencyObject = {
        'USDC': { name: 'fUSDT-USDC', icon: '/images/networks/avalancheDashboard.png' },
        'BUSD': { name: 'UST-BUSD', icon: '/images/networks/pancakeDashboard.png' },
        'UST': { name: 'UST', icon: '/images/networks/anchorDashboard.png' },
    };

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const changeIsOpen = () => {
        if (isOpen) {
            setIsOpen(false);
            return;
        }
        setIsOpen(true);
    };
    return (
        <>
            <div className={styles.wrapper} onClick={changeIsOpen}>

                { !currenc
                    ? <p className={styles.textElement}>Select your Synth-Lp</p>
                    : (
                        <SyntOption
                            {...currencyObject[currenc]}
                            handleClick={changeIsOpen}
                            price={123}
                            customClassName={styles.noPadding}
                            currencSymbol={currencSymbol}
                        />
                    )}

                <div className={classNames(styles.wrapperImage, isOpen ? styles.wrapperImageOpen : null)}>
                    <Image
                        alt=""
                        src="/images/arrowIcon.svg"
                        width={16}
                        height={16}
                        quality={100}
                    />
                </div>

            </div>
            {isOpen
                ? (
                    <div className={styles.selectBlock}>
                        {Object.values(currencyObject).map((el, index) => (
                            <SyntOption
                                name={el.name}
                                key={index}
                                handleClick={() => {
                                    func(Object.keys(currencyObject)[index]);
                                    changeIsOpen();
                                }}
                                currencSymbol={currencSymbol}
                                icon={el.icon}
                                price={123}
                            />
                        ))}
                    </div>
                ) : null}
        </>
    );
};

export type { currencyObject };
export default SyntSelect;
