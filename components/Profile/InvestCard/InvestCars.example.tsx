import React, {
    useEffect, useMemo, useReducer, useState,
} from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { farms, networks } from '@/src/utils/GlobalConst';

import styles from './style.module.css';
import { useAppSelector } from '@/src/Redux/store/hooks/redux';
import type { availableChains } from '@/src/utils/GlobalConst';
import Loader from '@/ui-kit/Loader';
import HintModal from '@/components/ui-kit/HintModal';
import GradientButton from '@/components/ui-kit/GradientButton';

import PayModal from '../../HomePage/PayModal/index';
import Modal from '@/components/Modal';
import CardService from '@/src/ChainService/CardService';
import type { IChain } from '@/src/ChainService/ChainService.interface';

interface IState {
    chainId: availableChains;
    description: string;
    positions: number;
    price: number;
    bgGradient: string;
    cardType: string;
    cardTypeLabelBg:string,
    cardTypeLabelColor:string,
    currencyName: IChain,
}

type ValueStateType = {
    available: string,
    totalAvailable: string,
    price: string
}

const InvestCardExp: React.FC<IState> = ({
    positions,
    cardType,
    price,
    chainId,
    description,
    bgGradient,
    cardTypeLabelBg,
    cardTypeLabelColor,
    currencyName,
}) => {
    const {
        profits, avgPrices,
    } = useAppSelector((state) => state.userReducer);

    const [isClose, setIsClose] = useState<boolean | null>(null);

    const Service = useMemo(() => new CardService(currencyName), []);

    const [state, dispatch] = useReducer((
        valueState: ValueStateType,
        stateUpdate: Partial<ValueStateType>,
    ) => ({ ...valueState, ...stateUpdate }), {
        available: '0',
        totalAvailable: '0',
        price: '1',
    });

    useEffect(() => {
        (async () => {
            const timless = {
                available: '0',
                totalAvailable: '0',
                price: '0',
            };
            try {
                const cardData = await Service.getCardData(
                    farms[chainId][currencyName],
                );
                timless.available = cardData.available.toString();
                timless.totalAvailable = cardData.totalAvailable.toString();
                timless.price = cardData.price.toString();
                dispatch({ ...timless });
                setIsClose(false);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return (
        <div className={styles.root} style={{ background: bgGradient || '' }}>
            {isClose ? (
                <Modal handleClose={() => { setIsClose(false); }}>
                    <PayModal {...state} handleClose={() => { setIsClose(false); }} />
                </Modal>
            ) : null}
            <div className={styles.logoWrapper}>
                <Image
                    width={64}
                    height={64}
                    quality={100}
                    src={`/images/networks/${networks[chainId].icon}`}
                    alt="alt"
                    className={styles.logo}
                />
            </div>
            <div className={styles.main}>
                <div className={styles.pare}>
                    <p>{`f${networks[chainId].currencyMin}`}</p>
                    <span style={{ margin: '0 10px 0 5px' }}>
                        <HintModal>
                            <p>test</p>
                        </HintModal>
                    </span>
                    <button
                        className={styles.cardLabel}
                        style={{ background: cardTypeLabelBg }}
                    >
                        <p style={{ color: cardTypeLabelColor }}>{cardType}</p>

                    </button>
                </div>
                <p className={styles.undertitle}>{description}</p>
            </div>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Your Position</p>
                    <p className={styles.itemValue}>{Number(positions.toFixed(2))}</p>
                    <p className={styles.undertitle}>
                        {networks[chainId].currency}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Price</p>
                    <p className={styles.itemValue}>{Number(price.toFixed(6))}</p>
                    <p className={styles.undertitle}>
                        {networks[chainId].currencyMin}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Avg Buy Price</p>
                    {avgPrices[chainId] ? (
                        <>
                            <p className={styles.itemValue}>
                                $
                                {avgPrices[chainId]}
                            </p>
                            <p className={styles.undertitle}>
                                {networks[chainId].currency}
                            </p>
                        </>
                    ) : (
                        <p className={styles.itemValue}>
                            <Loader />
                        </p>
                    )}
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Profit</p>
                    {profits.get(chainId)?.value ? (
                        <>
                            <p className={styles.itemValue}>
                                $
                                {profits.get(chainId)?.value}
                            </p>
                            <p
                                className={classNames(
                                    styles.undertitle,
                                    {
                                        [styles.loss]:
                                            profits.get(chainId)?.change! < 0,
                                    },
                                    {
                                        [styles.up]:
                                            profits.get(chainId)?.change! > 0,
                                    },
                                )}
                            >
                                {profits.get(chainId)?.change! > 0
                                    ? `+${profits.get(chainId)?.change}`
                                    : `${profits.get(chainId)?.change}`}
                                %
                            </p>
                        </>
                    ) : (
                        <p className={styles.itemValue}>
                            <Loader />
                        </p>
                    )}
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <GradientButton
                        title={cardType === 'Synthetic-LP' ? 'Buy/Sell' : 'Lock/Unlock'}
                        disabled={isClose === null}
                        onClick={() => {
                            sessionStorage.setItem('card', currencyName);
                            setIsClose(true);
                        }}
                        titleClass={styles.buttonTitleClass}
                    />
                </li>
            </ul>
        </div>
    );
};

export default InvestCardExp;
