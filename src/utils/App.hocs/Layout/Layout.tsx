import React, { useEffect, useMemo, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useStore } from 'core/store';
import Preloader from 'UI/ui-kit/Preloader';

import Footer from 'UI/Components/Footer';
import Header from 'UI/Components/Header';

import { GraphService } from 'services/index';
import QueryRequests from 'services/GraphService/queryRequests';
import { namesConfig } from 'utils/Global/Vars';
import { Notification } from 'src/libs/Notification';
import styles from './style.module.css';

type ILayoutProps = {
    children: JSX.Element;
};

export const Layout: React.FC<ILayoutProps> = memo(({ children }) => {
    const { store, actions, asyncActions } = useStore((store) => ({
        UserEntity: store.UserEntity,
        AppEntity: store.AppEntity,
        WalletEntity: store.WalletEntity,
    }));
    const dispatch = useDispatch();

    const {
        balances, txLoading, txHistory, txLoaded,
    } = store.UserEntity;
    const { isAppLoaded } = store.AppEntity;
    const { account } = store.WalletEntity;

    const { setIsAppLoaded } = actions.App;
    const {
        setCardLoaded, setTxHistory, setTxLoaded, setProfit, setError, setLoading,
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
                        'FTM': {
                            '56': { percentage: 0, stable: 0 },
                            '43114': { percentage: 0, stable: 0 },
                            '250': { percentage: 0, stable: 0 },
                        },
                        'AVAX': {
                            '56': { percentage: 0, stable: 0 },
                            '43114': { percentage: 0, stable: 0 },
                            '250': { percentage: 0, stable: 0 },
                        },
                        'BSC': {
                            '56': { percentage: 0, stable: 0 },
                            '43114': { percentage: 0, stable: 0 },
                            '250': { percentage: 0, stable: 0 },
                        },
                        'ETH': {
                            '56': { percentage: 0, stable: 0 },
                            '43114': { percentage: 0, stable: 0 },
                            '250': { percentage: 0, stable: 0 },
                        },
                    };
                    const names = Object.keys(balances);
                    for (const name of names) {
                        const chains = Object.keys(balances[name]);
                        for (let i = 0; i < chains.length; i++) {
                            if ((balances[name][chains[i]] as any).positions > 0) {
                                const { percentage, stable } = await QueryRequests.calculateProfit(
                                    txHistory,
                                    (balances[name][chains[i]] as any).positions,
                                    namesConfig[name],
                                );
                                res[name][chains[i]] = { percentage, stable };
                            } else {
                                res[name][chains[i]] = { percentage: 0, stable: 0 };
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