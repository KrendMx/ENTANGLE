import React, { useReducer, useTransition } from 'react';
import Image from 'next/image';
import HintModal from 'UI/ui-kit/HintModal';
import TextGroup from 'UI/ui-kit/TextGrop';
import Typography from 'UI/ui-kit/Typography';
import { Arrow } from 'UI/ui-kit/Arrow';
import Input from 'UI/ui-kit/Input';
import MiniButton from 'UI/ui-kit/MiniButton';
import GradientButton from 'UI/ui-kit/GradientButton';
import { useTranslation } from 'react-i18next';
import type { availableSingleSideChains } from 'utils/Global/Types';
import { availableSingleSideNetworks } from 'utils/Global/Vars';
import { ActiveCurrency } from '../ActiveCurrency';
import styles from './style.module.css';
import type { IDepositTabProps, depositStore } from './DepositTab.interfaces';
import { CurrencyLabel } from '../../CurrencyLabel';

export const DepositTab: React.FC<IDepositTabProps> = ({
    first,
    second,
    time,
}) => {
    const [store, dispatch] = useReducer(
        (oldState: depositStore, newState: Partial<depositStore>) => ({
            ...oldState,
            ...newState,
        }),
        {
            stakedValueFirst: '0',
            stakedValueSecond: '120',
            apr: '99',
            availableFirst: '150',
            availableSecond: '1500',
            enterAmount: '',
            activeAssets: '',
            activeButton: 5,
            miniButtons: ['25%', '50%', '100%'],
        },
    );

    const enterAmountChangeHandler = (value: string) => {
        if (/^[1-9]\d*(\.\d+)?$/.test(value) && !isNaN(Number(value))) {
            dispatch({ enterAmount: value });
        } else {
            dispatch({ enterAmount: '' });
        }
    };

    const changeActiveAssets = (value: availableSingleSideChains) => {
        if (store.activeAssets.includes(value)) {
            dispatch({ activeAssets: store.activeAssets.replace(value, '') });
        } else {
            dispatch({ activeAssets: `${store.activeAssets} ${value}` });
        }
    };

    const { t: tDep } = useTranslation('ssasdep');

    const { t: tSass } = useTranslation('ssas');

    return (
        <div className={styles.wrapper}>
            <div className={styles.depositInfo}>
                <div className={styles.infoCard}>
                    <span>
                        <p>
                            {`${tDep('stakedValue')} ${
                                availableSingleSideNetworks[first].abbr
                            }`}
                        </p>
                        <HintModal>
                            <p>HintModal</p>
                        </HintModal>
                    </span>
                    <CurrencyLabel
                        chainId={first}
                        value={
                            store.stakedValueFirst === '0'
                                ? 'awaiting'
                                : store.stakedValueFirst
                        }
                    />
                </div>
                <div className={styles.infoCard}>
                    <span>
                        <p>
                            {`${tDep('stakedValue')} ${
                                availableSingleSideNetworks[second].abbr
                            }`}
                        </p>
                        <HintModal>
                            <p>HintModal</p>
                        </HintModal>
                    </span>
                    <CurrencyLabel
                        chainId={second}
                        value={
                            store.stakedValueSecond === '0'
                                ? 'awaiting'
                                : store.stakedValueSecond
                        }
                    />
                </div>
                <div className={styles.infoCard}>
                    <span>
                        <p>{tDep('currentAPR')}</p>
                        <HintModal>
                            <p>HintModal</p>
                        </HintModal>
                    </span>
                    <p className={styles.cardMainInfoText}>{`${store.apr}%`}</p>
                </div>
                <div className={styles.infoCard}>
                    <span>
                        <p>{tDep('stakingTerm')}</p>
                        <HintModal>
                            <p>HintModal</p>
                        </HintModal>
                    </span>
                    <p className={styles.cardMainInfoText}>
                        {`${time} ${tSass('days')}`}
                    </p>
                </div>
            </div>
            <div className={styles.depositDo}>
                <div>
                    <Typography type="textBody">
                        {tDep('selectAsset')}
                    </Typography>
                    {/*---------------------------------------------------*/}
                    <ActiveCurrency
                        assets={[first, second]}
                        changeActiveAssets={changeActiveAssets}
                        activeAsset={store.activeAssets}
                    />
                    {/*---------------------------------------------------*/}
                    <div className={styles.balancesBlock}>
                        <TextGroup
                            customClassNameTitle={styles.customTextGroop}
                            customClassNameValue={styles.customTextGroop}
                            title={`${tDep('availableBalance')} ${
                                availableSingleSideNetworks[first].abbr
                            }`}
                            value={`${store.availableFirst} ${availableSingleSideNetworks[first].abbr}`}
                        />
                        <TextGroup
                            customClassNameTitle={styles.customTextGroop}
                            customClassNameValue={styles.customTextGroop}
                            title={`${tDep('availableBalance')} ${
                                availableSingleSideNetworks[second].abbr
                            }`}
                            value={`${store.availableSecond} ${availableSingleSideNetworks[second].abbr}`}
                        />
                    </div>
                </div>
                <div>
                    <Arrow />
                    <Typography type="textBody">
                        {tDep('enterStake')}
                    </Typography>
                    <span>
                        <div>
                            <Input
                                type="number"
                                placeholder={tDep('enterAmount')}
                                value={store.enterAmount}
                                onChange={(e) => {
                                    enterAmountChangeHandler(e.target.value);
                                }}
                            />
                        </div>
                        <div className={styles.miniButtons}>
                            {store.miniButtons.map((el, idx) => (
                                <MiniButton
                                    key={idx}
                                    title={el}
                                    clickHandler={() => {
                                        dispatch({ activeButton: idx });
                                        enterAmountChangeHandler(
                                            (
                                                (Number(store.availableFirst)
                                                    / 100)
                                                * Number(
                                                    el.slice(0, el.length - 1),
                                                )
                                            ).toString(),
                                        );
                                    }}
                                    active={store.activeButton === idx}
                                />
                            ))}
                        </div>
                    </span>
                    <div className={styles.buttonContainer}>
                        <GradientButton
                            isWhite
                            title={tDep('deposit')}
                            onClick={() => {}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
