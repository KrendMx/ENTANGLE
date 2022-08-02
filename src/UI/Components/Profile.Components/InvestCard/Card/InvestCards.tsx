import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { useTranslation } from 'react-i18next';
import { chainToNameConfig, networks, namesConfig } from 'utils/Global/Vars';

import { useStore } from 'core/store';
import type { ICardUnit } from 'UI/Components/Profile.Components/InvestCard/InvestCard.interfaces';
import GradientButton from 'UI/ui-kit/GradientButton';

import TextLoader from 'UI/ui-kit/TextLoader/TextLoader';
import type { availableChains } from 'src/utils/Global/Types';
import { useDispatch } from 'react-redux';
import styles from '../style.module.css';

const InvestCardExp: React.FC<ICardUnit> = ({
    positions,
    price,
    chainId,
    description,
    bgGradient,
    cardTypeLabelBg,
    cardTypeLabelColor,
    currencyName,
}) => {
    const {
        store: {
            UserEntity: {
                profits,
                avgPrices,
            },
            CardEntity: {
                data: cardData,
            },
        },
        actions: {
            User: {
                setIsOpenModal,
            },
        },
    } = useStore((store) => ({
        UserEntity: store.UserEntity,
        CardEntity: store.CardsEntity,
    }));

    const dispatch = useDispatch();

    const payModalHandleOpen = () => {
        dispatch(setIsOpenModal(true));
    };

    const { t } = useTranslation('index');
    const { t: tProfile } = useTranslation('profile');

    const detectedChainId = (chainName: string): availableChains => {
        for (const key in networks) {
            if (networks[key].abbr === chainName) {
                return key as availableChains;
            }
        }
    };
    return (
        <div className={styles.root} style={{ background: bgGradient || '' }}>
            <div className={styles.logoWrapper}>
                <Image
                    width={64}
                    height={64}
                    quality={100}
                    src={`/images/networks/${
                        networks[detectedChainId(currencyName)].icon
                    }`}
                    alt="alt"
                    className={styles.logo}
                />
            </div>
            <div className={styles.main}>
                <div className={styles.pare}>
                    <div className={styles.assetTitle}>
                        <p>
                            {`${
                                networks[detectedChainId(currencyName)]
                                    .currencyMin
                            }`}
                        </p>
                    </div>
                    <button
                        className={styles.cardLabel}
                        style={{ background: cardTypeLabelBg }}
                    >
                        <p style={{ color: cardTypeLabelColor }}>Syntetic-LP</p>
                    </button>
                </div>
            </div>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>{`${tProfile('network')}`}</p>
                    <p className={styles.itemValue}>
                        {networks[chainId].title}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>{t('yourPosition')}</p>
                    <p className={styles.itemValue}>
                        {Number(positions.toFixed(5))}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>{`${t('APR')} (%)`}</p>
                    {cardData[detectedChainId(currencyName)].apr ? (
                        <p className={styles.itemValue}>
                            {`${cardData[detectedChainId(currencyName)].apr}`}
                        </p>
                    ) : (
                        <div className={styles.itemValue}>
                            <TextLoader bgGradient={bgGradient} />
                        </div>
                    )}
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>{t('price')}</p>
                    <p className={styles.itemValue}>
                        {`$${Number(price.toFixed(6))}`}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>{t('avgPrice')}</p>
                    {'AVAX' in avgPrices ? (
                        <p className={styles.itemValue}>
                            $
                            {avgPrices[chainToNameConfig[chainId]][namesConfig[currencyName]]}
                        </p>
                    ) : (
                        <div className={styles.itemValue}>
                            <TextLoader bgGradient={bgGradient} />
                        </div>
                    )}
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>{t('yield')}</p>
                    {'AVAX' in profits ? (
                        <p className={styles.itemValue}>
                            $
                            {profits[currencyName][chainId]?.stable}
                        </p>
                    ) : (
                        <div className={styles.itemValue}>
                            <TextLoader bgGradient={bgGradient} />
                        </div>
                    )}
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <GradientButton
                        title={t('buyAndSell')}
                        disabled={false}
                        onClick={() => {
                            sessionStorage.setItem('card', currencyName);
                            payModalHandleOpen();
                        }}
                        wrapperClass={styles.wrapperButtonClass}
                        titleClass={styles.buttonTitleClass}
                    />
                </li>
            </ul>
        </div>
    );
};

export default InvestCardExp;
