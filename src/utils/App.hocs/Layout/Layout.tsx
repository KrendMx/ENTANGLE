import React, { useEffect, useMemo, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useStore } from 'core/store';
import Preloader from 'UI/ui-kit/Preloader';

import Footer from 'UI/Components/Footer';
import Header from 'UI/Components/Header';

import { GraphService } from 'services/index';
import QueryRequests from 'services/GraphService/queryRequests';
import { namesConfig, farms } from 'utils/Global/Vars';
import { Notification } from 'src/libs/Notification';
import type { availableChains } from 'src/utils/Global/Types';
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
        ContractEntity: store.ContractEntity,
        CardEntity: store.CardsEntity,
    }));
    const dispatch = useDispatch();

    const {
        balances, txLoading, txHistory, txLoaded,
    } = store.UserEntity;
    const { isAppLoaded } = store.AppEntity;
    const { account, chainId, provider } = store.WalletEntity;

    const { clearAllowance } = actions.Contract;

    const { setDefaultCardData } = actions.Card;

    const { changeNetwork } = asyncActions.Wallet;

    const { setIsAppLoaded } = actions.App;
    const {
        setCardLoaded,
        setTxHistory,
        setTxLoaded,
        setProfit,
        setError,
        setLoading,
    } = actions.User;

    const { calculateBalances, getAverageBuyPrice, getChartData } = asyncActions.User;
    const { getCardApr } = asyncActions.Card;

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
        (async () => {
            if (!account) return;
            dispatch(setCardLoaded(false));
            dispatch(calculateBalances({ account }));
        })();
    }, [account, txLoading]);

    useEffect(() => {
        if (!account) return;
        dispatch(getChartData({ account }));
    }, [account, txLoading]);

    useEffect(() => {
        dispatch(getCardApr());
    }, []);

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
                    dispatch(
                        setProfit(
                            Object.assign(res, {
                                EGLD: {
                                    '43114': { percentage: 0, stable: 0 },
                                    '250': { percentage: 0, stable: 0 },
                                    '56': { percentage: 0, stable: 0 },
                                },
                            }),
                        ),
                    );
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

    useEffect(() => {
        dispatch(clearAllowance());
        dispatch(setDefaultCardData());
    }, [chainId]);
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
