import React, { useReducer } from 'react';
import Image from 'next/image';
import HintModal from 'src/UI/ui-kit/HintModal';
import TextGroup from 'src/UI/ui-kit/TextGrop';
import Typography from 'src/UI/ui-kit/Typography';
import { Arrow } from 'src/UI/ui-kit/Arrow';
import Input from 'src/UI/ui-kit/Input';
import MiniButton from 'src/UI/ui-kit/MiniButton';
import GradientButton from 'src/UI/ui-kit/GradientButton';

import type { availableSingleSideChains } from 'src/utils/Global/Types';
import { availableSingleSideNetworks } from 'src/utils/Global/Vars';
import { ActiveCurrency } from '../ActiveCurrency';
import styles from './style.module.css';
import type { IDepositTabProps, depositStore } from './DepositTab.interfaces';
import { CurrencyLabel } from '../../CurrencyLabel';

export const DepositTab: React.FC<IDepositTabProps> = ({
    first,
    second,
    time,
}) => {
    const miniButtons = ['25%', '50%', '75%', '100%'];

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

    return (
        <div className={styles.wrapper}>
            <div className={styles.depositInfo}>
                <div className={styles.infoCard}>
                    <span>
                        <p>{`Staked Value ${availableSingleSideNetworks[first].abbr}`}</p>
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
                        <p>{`Staked Value ${availableSingleSideNetworks[second].abbr}`}</p>
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
                        <p>Current APR</p>
                        <HintModal>
                            <p>HintModal</p>
                        </HintModal>
                    </span>
                    <p className={styles.cardMainInfoText}>{`${store.apr}%`}</p>
                </div>
                <div className={styles.infoCard}>
                    <span>
                        <p>Staking Term</p>
                        <HintModal>
                            <p>HintModal</p>
                        </HintModal>
                    </span>
                    <p className={styles.cardMainInfoText}>{`${time} days`}</p>
                </div>
            </div>
            <div className={styles.depositDo}>
                <div>
                    <Typography type="textBody">Select asset</Typography>
                    {/*---------------------------------------------------*/}
                    <ActiveCurrency
                        assets={[first, second]}
                        changeActiveAssets={changeActiveAssets}
                        activeAsset={store.activeAssets}
                    />
                    {/*---------------------------------------------------*/}
                    <TextGroup
                        customClassNameTitle={styles.customTextGroop}
                        customClassNameValue={styles.customTextGroop}
                        title={`Available Balance ${availableSingleSideNetworks[first].abbr}`}
                        value={`${store.availableFirst} ${availableSingleSideNetworks[first].abbr}`}
                    />
                    <TextGroup
                        customClassNameTitle={styles.customTextGroop}
                        customClassNameValue={styles.customTextGroop}
                        title={`Available Balance ${availableSingleSideNetworks[second].abbr}`}
                        value={`${store.availableSecond} ${availableSingleSideNetworks[second].abbr}`}
                    />
                </div>
                <div>
                    <Arrow />
                    <Typography type="textBody">Enter Stake Amount</Typography>
                    <div>
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            value={store.enterAmount}
                            onChange={(e) => {
                                enterAmountChangeHandler(e.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.miniButtons}>
                        {miniButtons.map((el, idx) => (
                            <MiniButton
                                key={idx}
                                title={el}
                                clickHandler={() => {}}
                                active={false}
                            />
                        ))}
                    </div>
                    <div className={styles.buttonContainer}>
                        <GradientButton title="Deposit" onClick={() => {}} />
                    </div>
                </div>
            </div>
        </div>
    );
};
