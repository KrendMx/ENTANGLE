import React from 'react';
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
import TextGroup from 'src/UI/ui-kit/TextGrop';
import styles from '../style.module.css';

const InvestCardExp: React.FC<ICardUnit> = ({
    positions,
    price,
    chainId,
    bgGradient,
    cardTypeLabelBg,
    cardTypeLabelColor,
    currencyName,
}) => {
    const {
        store: {
            UserEntity: { profits, avgPrices },
            CardEntity: { data: cardData },
        },
        actions: {
            User: { setIsOpenModal },
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
        <div className={styles.root}>
            <div
                className={styles.headerGradient}
                style={{ background: bgGradient || '' }}
            />
            <div className={styles.logoWrapper}>
                <Image
                    width={44}
                    height={44}
                    quality={100}
                    src={`/images/networks/${
                        networks[detectedChainId(currencyName)].icon
                    }`}
                    alt="alt"
                    className={styles.logo}
                />
                <div
                    className={styles.cardLabel}
                    style={{ background: cardTypeLabelBg }}
                >
                    <p style={{ color: cardTypeLabelColor }}>Syntetic-LP</p>
                </div>
            </div>
            <div className={styles.header}>
                <p>
                    {`${networks[detectedChainId(currencyName)].currencyMin}`}
                </p>
            </div>
            <div className={styles.list}>
                <TextGroup
                    title={`${tProfile('network')}`}
                    value={networks[chainId].title}
                    customClassNameTitle={styles.customTitleGroup}
                    customClassNameValue={styles.customValueGroup}
                />
            </div>
            <div className={styles.list}>
                <TextGroup
                    title={t('yourPosition')}
                    value={positions.toFixed(5)}
                    customClassNameTitle={styles.customTitleGroup}
                    customClassNameValue={styles.customValueGroup}
                />
            </div>
            <div className={styles.list}>
                <TextGroup
                    title={`${t('APR')} (%)`}
                    value={
                        cardData[detectedChainId(currencyName)].apr !== null ? (
                            <p className={styles.customValueGroup}>
                                {`${
                                    cardData[detectedChainId(currencyName)].apr
                                }%`}
                            </p>
                        ) : (
                            <div className={styles.itemValue}>
                                <TextLoader bgGradient={bgGradient} />
                            </div>
                        )
                    }
                    customClassNameTitle={styles.customTitleGroup}
                    customClassNameValue={styles.customValueGroup}
                />
            </div>
            <div className={styles.list}>
                <TextGroup
                    title={t('price')}
                    value={`$${Number(price.toFixed(6))}`}
                    customClassNameTitle={styles.customTitleGroup}
                    customClassNameValue={styles.customValueGroup}
                />
            </div>
            <div className={styles.list}>
                <TextGroup
                    title={t('avgPrice')}
                    value={
                        'AVAX' in avgPrices ? (
                            <p className={styles.customValueGroup}>
                                $
                                {
                                    avgPrices[chainToNameConfig[chainId]][
                                        namesConfig[currencyName]
                                    ]
                                }
                            </p>
                        ) : (
                            <div className={styles.itemValue}>
                                <TextLoader bgGradient={bgGradient} />
                            </div>
                        )
                    }
                    customClassNameTitle={styles.customTitleGroup}
                    customClassNameValue={styles.customValueGroup}
                />
            </div>
            <div className={styles.list}>
                <TextGroup
                    title={t('yield')}
                    value={
                        'AVAX' in profits ? (
                            <p className={styles.customValueGroup}>
                                {`${profits[currencyName][chainId]?.stable} USDC`}
                            </p>
                        ) : (
                            <div className={styles.itemValue}>
                                <TextLoader bgGradient={bgGradient} />
                            </div>
                        )
                    }
                    customClassNameTitle={styles.customTitleGroup}
                    customClassNameValue={styles.customValueGroup}
                />
            </div>
            <div className={classNames(styles.list, styles.buttonContainer)}>
                <GradientButton
                    title={t('select')}
                    disabled={false}
                    isWhite
                    onClick={() => {
                        sessionStorage.setItem('card', currencyName);
                        payModalHandleOpen();
                    }}
                    wrapperClass={styles.wrapperButtonClass}
                    titleClass={styles.buttonTitleClass}
                />
            </div>
        </div>
    );
};

export default InvestCardExp;
