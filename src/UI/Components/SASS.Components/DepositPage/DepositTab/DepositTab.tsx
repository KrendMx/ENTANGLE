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
import InfoBlock from 'src/UI/ui-kit/InfoBlock/InfoBlock';
import { InfoBlockTypes } from 'src/UI/ui-kit/InfoBlock/InfoBlock.constants';
import { ActiveCurrency } from '../ActiveCurrency';
import styles from './style.module.css';
import type {
    IDepositTabProps,
    depositStore,
    GraphStore,
} from './DepositTab.interfaces';
import { CurrencyLabel } from '../../CurrencyLabel';

export const DepositTab: React.FC<IDepositTabProps> = React.memo(
    ({ first, second, time }) => {
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
            },
        );

        const [graphStore, graphDispatch] = useReducer(
            (oldState: GraphStore, newState: Partial<GraphStore>) => ({
                ...oldState,
                ...newState,
            }),
            {
                activeAssets: '',
                activeButton: null,
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
            if (graphStore.activeAssets.includes(value)) {
                graphDispatch({
                    activeAssets: graphStore.activeAssets.replace(value, ''),
                });
            } else {
                graphDispatch({
                    activeAssets: `${graphStore.activeAssets} ${value}`,
                });
            }
        };

        const { t: tDep } = useTranslation('ssasdep');

        const { t: tSass } = useTranslation('ssas');

        return (
            <div className={styles.wrapper}>
                <div className={styles.depositInfo}>
                    <InfoBlock
                        type={InfoBlockTypes.PERCENTAGE}
                        value={Number(store.apr)}
                        info={`${tDep('stakedValue')} ${
                            availableSingleSideNetworks[first].abbr
                        }`}
                        customValueClassName={styles.customValueInfoCard}
                        customWrapperClassName={styles.customWrapperInfoCard}
                        customTitleClassName={styles.customTitleInfoCard}
                        hintText="HintModal"
                        isCurrencyLabel
                        currencyProps={{
                            chainId: second,
                            value:
                            store.stakedValueSecond === '0'
                                ? 'awaiting'
                                : store.stakedValueSecond,
                        }}
                    />
                    <InfoBlock
                        type={InfoBlockTypes.PERCENTAGE}
                        value={Number(store.apr)}
                        info={`${tDep('stakedValue')} ${
                            availableSingleSideNetworks[first].abbr
                        }`}
                        customValueClassName={styles.customValueInfoCard}
                        customWrapperClassName={styles.customWrapperInfoCard}
                        customTitleClassName={styles.customTitleInfoCard}
                        hintText="HintModal"
                        isCurrencyLabel
                        currencyProps={{
                            chainId: first,
                            value:
                            store.stakedValueFirst === '0'
                                ? 'awaiting'
                                : store.stakedValueFirst,
                        }}
                    />
                    <InfoBlock
                        type={InfoBlockTypes.SIMPLE_PERCENTAGE}
                        value={Number(store.apr)}
                        info={tDep('currentAPR')}
                        customValueClassName={styles.customValueInfoCard}
                        customWrapperClassName={styles.customWrapperInfoCard}
                        customTitleClassName={styles.customTitleInfoCard}
                        hintText="HintModal"
                    />
                    <InfoBlock
                        type={InfoBlockTypes.DAYS}
                        value={Number(time)}
                        info={tDep('stakingTerm')}
                        customValueClassName={styles.customValueInfoCard}
                        customWrapperClassName={styles.customWrapperInfoCard}
                        customTitleClassName={styles.customTitleInfoCard}
                        hintText="HintModal"
                    />
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
                            activeAsset={graphStore.activeAssets}
                        />
                        {/*---------------------------------------------------*/}
                        <div className={styles.balancesBlock}>
                            <TextGroup
                                hintText="Test"
                                customClassNameWrapper={styles.customTextGroop}
                                customClassNameTitle={styles.shareTextTitle}
                                customClassNameValue={styles.shareTextValue}
                                title={`${tDep('availableBalance')} ${
                                    availableSingleSideNetworks[first].abbr
                                }`}
                                value={`${store.availableFirst} ${availableSingleSideNetworks[first].abbr}`}
                            />
                            <TextGroup
                                customClassNameWrapper={styles.customTextGroop}
                                customClassNameTitle={styles.shareTextTitle}
                                customClassNameValue={styles.shareTextValue}
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
                                        enterAmountChangeHandler(
                                            e.target.value,
                                        );
                                    }}
                                />
                            </div>
                            <div className={styles.miniButtons}>
                                {graphStore.miniButtons.map((el, idx) => (
                                    <MiniButton
                                        key={idx}
                                        title={el}
                                        clickHandler={() => {
                                            graphDispatch({
                                                activeButton: idx,
                                            });
                                            enterAmountChangeHandler(
                                                (
                                                    (Number(
                                                        store.availableFirst,
                                                    )
                                                        / 100)
                                                    * Number(
                                                        el.slice(
                                                            0,
                                                            el.length - 1,
                                                        ),
                                                    )
                                                ).toString(),
                                            );
                                        }}
                                        active={graphStore.activeButton === idx}
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
    },
);
