import React, { useState, useReducer } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import Typography from 'src/UI/ui-kit/Typography';
import HintModal from 'src/UI/ui-kit/HintModal';
import GradientButton from 'src/UI/ui-kit/GradientButton';
import { useTranslation } from 'react-i18next';
import { availableSingleSideNetworks } from 'utils/Global/Vars';
import type { availableSingleSideChains } from 'src/utils/Global/Types';
import InfoBlock from 'src/UI/ui-kit/InfoBlock/InfoBlock';
import { InfoBlockTypes } from 'src/UI/ui-kit/InfoBlock/InfoBlock.constants';
import type { IYieldTabProps, IYieldTabStore } from './YieldTab.interfaces';
import styles from './style.module.css';
import { ActiveCurrency } from '../ActiveCurrency';
import { CurrencyLabel } from '../../CurrencyLabel';

export const YieldTab: React.FC<IYieldTabProps> = React.memo(
    ({ firstChainId, secondChainId, duration }) => {
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

        const { t } = useTranslation('ssasdep');
        const { t: tSsas } = useTranslation('ssas');

        const [activeAssets, setActiveAssets] = useState<string>('');
        const changeActiveAssets = (value: availableSingleSideChains) => {
            if (activeAssets.includes(value)) {
                setActiveAssets(activeAssets.replace(value, ''));
            } else {
                setActiveAssets(activeAssets + value);
            }
        };

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
                            <InfoBlock
                                type={InfoBlockTypes.DAYS}
                                value={123}
                                info={`${t('youStaked')} ${
                                    availableSingleSideNetworks[firstChainId]
                                        .abbr
                                }`}
                                customValueClassName={
                                    styles.customValueInfoCard
                                }
                                customWrapperClassName={
                                    styles.customWrapperInfoCard
                                }
                                customTitleClassName={
                                    styles.customTitleInfoCard
                                }
                                hintText="HintModal"
                                isCurrencyLabel
                                currencyProps={{
                                    chainId: firstChainId,
                                    value: store.firstUserStake,
                                }}
                            />
                            {store?.secondUserStake ? (
                                <InfoBlock
                                    type={InfoBlockTypes.DAYS}
                                    value={123}
                                    info={`${t('youStaked')} ${
                                        availableSingleSideNetworks[
                                            secondChainId
                                        ].abbr
                                    }`}
                                    customValueClassName={
                                        styles.customValueInfoCard
                                    }
                                    customWrapperClassName={
                                        styles.customWrapperInfoCard
                                    }
                                    customTitleClassName={
                                        styles.customTitleInfoCard
                                    }
                                    hintText="HintModal"
                                    isCurrencyLabel
                                    currencyProps={{
                                        chainId: secondChainId,
                                        value: store.secondUserStake,
                                    }}
                                />
                            ) : null}
                            <InfoBlock
                                type={InfoBlockTypes.MONEY}
                                value={240}
                                info={t('stakeAmount')}
                                customValueClassName={
                                    styles.customValueInfoCard
                                }
                                customWrapperClassName={
                                    styles.customWrapperInfoCard
                                }
                                customTitleClassName={
                                    styles.customTitleInfoCard
                                }
                                hintText="HintModal"
                            />
                            <InfoBlock
                                value={2314}
                                info="123"
                                type={InfoBlockTypes.ABOUT}
                                customFilling
                                customWrapperClassName={
                                    styles.customWrapperInfoCard
                                }
                            >
                                <div className={styles.infoCard}>
                                    <div
                                        className={styles.stakingTerm}
                                    >
                                        <div style={{ display: 'flex' }}>
                                            {t('stakingTerm')}
                                            <HintModal>
                                                <p>{t('stakingTerm')}</p>
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
                                    </div>
                                    <span
                                        className={styles.loader}
                                        style={
                                            {
                                                '--load': `${
                                                    (store.stakinTerm
                                                        / duration)
                                                    * 100
                                                }%`,
                                            } as React.CSSProperties
                                        }
                                    />
                                    {store.stakinTerm === 0 ? (
                                        <p className={styles.awaitingTitle}>
                                            {tSsas('awaitingDeposit')}
                                        </p>
                                    ) : (
                                        <p />
                                    )}
                                </div>
                            </InfoBlock>
                        </div>
                        <div className={styles.assetInfo}>
                            <div className={styles.mainAsset}>
                                <span>
                                    <Typography type="textBody">
                                        {t('withdrawAssets')}
                                    </Typography>
                                    <HintModal>
                                        <p>{t('withdrawAssets')}</p>
                                    </HintModal>
                                </span>
                                <Typography
                                    type="textBody"
                                    classNameModifier={styles.textDescription}
                                >
                                    {t('avaiableAssets')}
                                </Typography>
                                <div>
                                    <ActiveCurrency
                                        assets={[
                                            firstChainId,
                                            store.secondUserStake
                                                ? secondChainId
                                                : null,
                                        ]}
                                        activeAsset={activeAssets}
                                        changeActiveAssets={changeActiveAssets}
                                    />
                                </div>
                                <div>
                                    <GradientButton
                                        title={t('withdrawAssets')}
                                        onClick={() => {}}
                                        isWhite
                                    />
                                </div>
                            </div>
                            <div className={styles.infoCard}>
                                <div className={styles.infoCardContainer}>
                                    <p>
                                        {store.secondUserStake
                                            ? t('currentAssets')
                                            : `${t('currentAssetStart')} ${
                                                availableSingleSideNetworks[
                                                    firstChainId
                                                ].abbr
                                            } ${t('currentAssetEnd')}`}
                                    </p>
                                    <HintModal>
                                        <p>Current Assets Amount</p>
                                    </HintModal>
                                </div>
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
                                <div className={styles.infoCardContainer}>
                                    <p>{t('profitAmount')}</p>
                                    <HintModal>
                                        <p>{t('profitAmount')}</p>
                                    </HintModal>
                                </div>
                                <div className={styles.assetsAmount}>
                                    <CurrencyLabel
                                        value={store.profitAmount.toString()}
                                        chainId="24886"
                                    />
                                </div>
                            </div>
                            <div className={styles.infoCard}>
                                <div className={styles.infoCardContainer}>
                                    <p>{t('ProjectedIL')}</p>
                                    <HintModal>
                                        <p>{t('ProjectedIL')}</p>
                                    </HintModal>
                                </div>
                                <div className={styles.assetsAmount}>
                                    <p className={styles.cardMainInfoText}>
                                        {store.ProjectedILPercentage}
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
    },
);
