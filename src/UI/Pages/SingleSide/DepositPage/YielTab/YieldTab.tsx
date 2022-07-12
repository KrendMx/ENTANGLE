import React, { useState, useReducer } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import Typography from 'src/UI/ui-kit/Typography';
import HintModal from 'src/UI/ui-kit/HintModal';
import GradientButton from 'src/UI/ui-kit/GradientButton';
import { availableSingleSideNetworks } from 'src/utils/Global/Vars';
import type { IYieldTabProps, IYieldTabStore } from './YieldTab.interfaces';
import styles from './style.module.css';
import { ActiveCurrency } from '../ActiveCurrency';
import { CurrencyLabel } from '../../CurrencyLabel';

export const YieldTab: React.FC<IYieldTabProps> = ({
    firstChainId,
    secondChainId,
    duration,
}) => {
    const [store, dispatch] = useReducer(
        (oldState: IYieldTabStore, newState: Partial<IYieldTabStore>) => ({
            ...oldState,
            ...newState,
        }),
        {
            isYield: true,
            firstUserStake: '125',
            secondUserStake: '555',
            stakedAmount: '240',
            stakinTerm: 2,
            stakingRemained: 5,
            currentFirstAmount: 5,
            currentSecondAmount: 5,
            profitAmount: 155,
            ProjectedILPercentage: 5,
            impermanentWinPercentage: 55,
        },
    );

    return (
        <div>
            {store.isYield ? (
                <div>
                    <div
                        className={styles.upperInfo}
                        style={
                            {
                                '--assets': store?.secondUserStake ? 2 : 1,
                            } as React.CSSProperties
                        }
                    >
                        <div className={styles.infoCard}>
                            <span>
                                <p>{`You Staked ${availableSingleSideNetworks[firstChainId].abbr}`}</p>
                                <HintModal>
                                    <p>{`You Staked ${availableSingleSideNetworks[firstChainId].abbr}`}</p>
                                </HintModal>
                            </span>
                            <CurrencyLabel
                                chainId={firstChainId}
                                value={store.firstUserStake}
                            />
                        </div>
                        {store?.secondUserStake ? (
                            <div className={styles.infoCard}>
                                <span>
                                    <p>{`You Staked ${availableSingleSideNetworks[secondChainId].abbr}`}</p>
                                    <HintModal>
                                        <p>{`You Staked ${availableSingleSideNetworks[secondChainId].abbr}`}</p>
                                    </HintModal>
                                </span>
                                <CurrencyLabel
                                    chainId={secondChainId}
                                    value={store.secondUserStake}
                                />
                            </div>
                        ) : null}
                        <div className={styles.infoCard}>
                            <span>
                                <p>Stake Amount</p>
                                <HintModal>
                                    <p>Stake Amount</p>
                                </HintModal>
                            </span>
                            <p className={styles.cardMainInfoText}>
                                {`${store.stakedAmount}$`}
                            </p>
                        </div>
                        <div className={styles.infoCard}>
                            <span style={{ justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex' }}>
                                    Staking Term
                                    <HintModal>
                                        <p>Staking Term</p>
                                    </HintModal>
                                </div>
                                <div>
                                    {store.stakinTerm}
                                    <span
                                        style={{
                                            color: 'var(--gray)',
                                            fontSize: '13px',
                                        }}
                                    >
                                        {`/${duration} DAYS`}
                                    </span>
                                </div>
                            </span>
                            <span
                                className={styles.loader}
                                style={
                                    {
                                        '--load': `${
                                            (store.stakinTerm / duration) * 100
                                        }%`,
                                    } as React.CSSProperties
                                }
                            />
                            {store.stakinTerm === 0 ? (
                                <p className={styles.awaitingTitle}>
                                    Awaiting Deposite
                                </p>
                            ) : (
                                <p />
                            )}
                        </div>
                    </div>
                    <div className={styles.assetInfo}>
                        <div className={styles.mainAsset}>
                            <span>
                                <Typography type="textBody">
                                    Withdraw assets
                                </Typography>
                                <HintModal>
                                    <p>Withdraw assets</p>
                                </HintModal>
                            </span>
                            <Typography
                                type="textBody"
                                classNameModifier={styles.textDescription}
                            >
                                Avaiable assets for withdraw
                            </Typography>
                            <div>
                                <ActiveCurrency
                                    assets={[
                                        firstChainId,
                                        store.secondUserStake
                                            ? secondChainId
                                            : null,
                                    ]}
                                    activeAsset={` ${firstChainId} ${secondChainId}}`}
                                    changeActiveAssets={() => {}}
                                />
                            </div>
                            <div>
                                <GradientButton
                                    title="Withdraw"
                                    onClick={() => {}}
                                />
                            </div>
                        </div>
                        <div className={styles.infoCard}>
                            <span>
                                <p>
                                    {`Current ${
                                        store.secondUserStake
                                            ? 'Assets'
                                            : availableSingleSideNetworks[
                                                firstChainId
                                            ].title
                                    } Amount`}
                                </p>
                                <HintModal>
                                    <p>Current Assets Amount</p>
                                </HintModal>
                            </span>
                            <div className={styles.assetsAmount}>
                                <CurrencyLabel
                                    chainId={firstChainId}
                                    value={store.currentFirstAmount.toString()}
                                />
                                {store.secondUserStake ? (
                                    <CurrencyLabel
                                        chainId={secondChainId}
                                        value={store.currentSecondAmount.toString()}
                                    />
                                ) : null}
                            </div>
                        </div>
                        <div className={styles.infoCard}>
                            <span>
                                <p>Profit Amount</p>
                                <HintModal>
                                    <p>Profit Amount</p>
                                </HintModal>
                            </span>
                            <CurrencyLabel
                                value={store.profitAmount.toString()}
                                chainId="24886"
                            />
                        </div>
                        <div className={styles.projected}>
                            <div className={styles.infoCard}>
                                <span>
                                    <p>Projected IL Protection Percentage</p>
                                    <HintModal>
                                        <p>
                                            Projected IL Protection Percentage
                                        </p>
                                    </HintModal>
                                </span>
                                <p className={styles.cardMainInfoText}>
                                    {store.ProjectedILPercentage}
                                    %
                                </p>
                            </div>
                            <div className={styles.infoCard}>
                                <span>
                                    <p>Impermanent Win Percentage</p>
                                    <HintModal>
                                        <p>Impermanent Win Percentage</p>
                                    </HintModal>
                                </span>
                                <p className={styles.cardMainInfoText}>
                                    {store.impermanentWinPercentage}
                                    %
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.wrapper}>
                    <div className={styles.noAmount}>
                        <Image
                            src="/images/bar-graph.png"
                            width={312}
                            height={270}
                            quality={100}
                            alt=""
                        />
                        <Typography
                            type="textBody"
                            classNameModifier={styles.headerDesc}
                        >
                            No amount has been staked
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    );
};
