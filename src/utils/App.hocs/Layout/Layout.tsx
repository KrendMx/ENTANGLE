import React, { useEffect, useMemo, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useStore } from 'core/store';
import Preloader from 'UI/ui-kit/Preloader';

import Footer from 'UI/Components/Footer';
import Header from 'UI/Components/Header';

import { CardService, GraphService } from 'services/index';
import QueryRequests from 'services/GraphService/queryRequests';
import { namesConfig, farms } from 'utils/Global/Vars';
import { Notification } from 'src/libs/Notification';
import type { availableChains, availableNames } from 'src/utils/Global/Types';
import styles from './style.module.css';

type ILayoutProps = {
    children: JSX.Element;
};

type synthArrayType = {
    chainId: availableChains;
    name: string;
    secondChain: string;
};

// eslint-disable-next-line react/display-name
export const Layout: React.FC<ILayoutProps> = memo(({ children }) => {
    const { store, actions, asyncActions } = useStore((store) => ({
        UserEntity: store.UserEntity,
        AppEntity: store.AppEntity,
        WalletEntity: store.WalletEntity,
        CardsEntity: store.CardsEntity,
    }));
    const dispatch = useDispatch();

    const servises = {
        FTM: useMemo(() => new CardService('FTM'), []),
        AVAX: useMemo(() => new CardService('AVAX'), []),
        ETH: useMemo(() => new CardService('ETH'), []),
        BSC: useMemo(() => new CardService('BSC'), []),
    };

    const {
        balances, txLoading, txHistory, txLoaded,
    } = store.UserEntity;
    const { isAppLoaded } = store.AppEntity;
    const { account, chainId } = store.WalletEntity;

    const { data: CardData } = store.CardsEntity;

    const { setCardInfo } = actions.Card;
    const { setPayData } = actions.User;

    const synthArray: synthArrayType[] = [
        { chainId: '43114', name: 'AVAX', secondChain: '68' },
        { chainId: '250', name: 'FTM', secondChain: '9' },
        { chainId: '1', name: 'ETH', secondChain: '7' },
        { chainId: '56', name: 'BSC', secondChain: '7' },
    ];

    const updateCardUserInfo = (): void => {
        synthArray.forEach((el) => {});
    };

    const updateCardAppInfo = (): void => {
        synthArray.forEach((el) => {
            if (CardData[el.chainId].available === null) {
                (async () => {
                    let [
                        available,
                        totalAvailable,
                        totalDeposits,
                        currentDeposits,
                        price,
                    ] = [0, 0, 0, 0, 0];
                    try {
                        const test = new CardService(el.name as availableNames);
                        const cardData = await test.getCardData(
                            account ? farms[chainId][el.name] : el.secondChain,
                        );
                        available = cardData.available;
                        totalAvailable = cardData.totalAvailable;
                        totalDeposits = cardData.totalDeposits;
                        currentDeposits = cardData.currentDeposits;
                        price = cardData.price;
                        console.log(totalAvailable);
                    } catch (e) {
                        if ((e.code as number) === -32002) {
                            localStorage.removeItem('wallet');
                        }
                    }
                    dispatch(
                        setCardInfo({
                            key: el.chainId,
                            data: {
                                available: `${
                                    CardData[el.chainId].localChain === chainId
                                        ? 'Unlimited'
                                        : available
                                }`,
                                totalAvailable: totalAvailable.toString(),
                                totalDeposits: `${totalDeposits} aDAI/aSUSD Synthetic LP`,
                                currentDeposits: `$${currentDeposits.toFixed(
                                    3,
                                )}`,
                                price: `${Number(price.toFixed(6))}`,
                            },
                        }),
                    );
                    dispatch(
                        setPayData({
                            key: '1',
                            data: {
                                available: `${
                                    CardData[el.chainId].localChain === chainId
                                        ? 'Unlimited'
                                        : Number(available.toFixed(5))
                                }`,
                                price: `${Number(price.toFixed(6))}`,
                                totalAvailable: `$${totalAvailable}`,
                            },
                        }),
                    );
                })();
            }
        });
    };

    const updateCardApr = (): void => {
        synthArray.forEach((el) => {});
    };

    const { setIsAppLoaded } = actions.App;
    const {
        setCardLoaded,
        setTxHistory,
        setTxLoaded,
        setProfit,
        setError,
        setLoading,
    } = actions.User;

    const { calculateBalances, getAverageBuyPrice } = asyncActions.User;

    useEffect(() => {
        dispatch(setIsAppLoaded(true));
    }, []);

    const Graph = useMemo(() => new GraphService(account), [account]);

    useEffect(() => {
        (async function getAvg() {
            if (!account) return;
            dispatch(getAverageBuyPrice({ account }));
        }());
    }, [account]);

    useEffect(() => {
        updateCardAppInfo();
        console.log(CardData);
    }, [chainId]);

    useEffect(() => {
        (async () => {
            if (!account) return;
            dispatch(setCardLoaded(false));
            dispatch(calculateBalances({ account }));
        })();
    }, [account, txLoading]);

    useEffect(() => {
        (async () => {
            if (!account) return;
            Graph.getAllTransactions()
                .then((res) => {
                    dispatch(setTxHistory(res));
                })
                .finally(() => dispatch(setTxLoaded(true)));
        })();
    }, [account, txLoading]);

    useEffect(() => {
        (async function GetProfit() {
            try {
                dispatch(setLoading(true));
                if (txHistory.length) {
                    const res = {
                        FTM: {
                            '56': { percentage: 0, stable: 0 },
                            '43114': { percentage: 0, stable: 0 },
                            '250': { percentage: 0, stable: 0 },
                        },
                        AVAX: {
                            '56': { percentage: 0, stable: 0 },
                            '43114': { percentage: 0, stable: 0 },
                            '250': { percentage: 0, stable: 0 },
                        },
                        BSC: {
                            '56': { percentage: 0, stable: 0 },
                            '43114': { percentage: 0, stable: 0 },
                            '250': { percentage: 0, stable: 0 },
                        },
                        ETH: {
                            '56': { percentage: 0, stable: 0 },
                            '43114': { percentage: 0, stable: 0 },
                            '250': { percentage: 0, stable: 0 },
                        },
                    };
                    const names = Object.keys(balances);
                    for (const name of names) {
                        const chains = Object.keys(balances[name]);
                        for (let i = 0; i < chains.length; i++) {
                            if (
                                (balances[name][chains[i]] as any).positions > 0
                            ) {
                                const { percentage, stable } = await QueryRequests.calculateProfit(
                                    txHistory,
                                    (balances[name][chains[i]] as any)
                                        .positions,
                                    namesConfig[name],
                                );
                                res[name][chains[i]] = { percentage, stable };
                            } else {
                                res[name][chains[i]] = {
                                    percentage: 0,
                                    stable: 0,
                                };
                            }
                        }
                    }
                    dispatch(setProfit(res));
                } else if (!txHistory.length && txLoaded) {
                    const chains = Object.keys(balances);
                    for (let i = 0; i < chains.length; i++) {
                        dispatch(
                            setProfit({
                                n: 0,
                                change: 0,
                                key: namesConfig[chains[i]],
                            }),
                        );
                    }
                }
            } catch (e) {
                Notification.error('Error', e.message);
                setError(e.message);
            } finally {
                dispatch(setLoading(false));
            }
        }());
    }, [txHistory, txLoading, balances, txLoaded]);

    return (
        <div className={styles.wrapper}>
            <Preloader isVisible={!isAppLoaded} />
            <Header />
            <div className={styles.layout}>
                <main>{children}</main>
            </div>
            <Footer />
        </div>
    );
});
