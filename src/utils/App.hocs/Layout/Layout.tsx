import React, { useEffect, useMemo, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useStore } from 'core/store';
import Preloader from 'UI/ui-kit/Preloader';

import Footer from 'UI/Components/Footer';
import Header from 'UI/Components/Header';

import { GraphService } from 'services/GraphService';
import QueryRequests from 'services/GraphService/queryRequests';
import { namesConfig } from 'utils/Global/Vars';
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
        setAvgPrice, setCardLoaded, setTxHistory, setTxLoaded, setProfit,
    } = actions.User;

    const { calculateBalances } = asyncActions.User;

    useEffect(() => {
        dispatch(setIsAppLoaded(true));
    }, []);

    const Graph = useMemo(() => new GraphService(account), [account]);

    useEffect(() => {
        (async function getAvg() {
            if (!account) return;
            dispatch(setAvgPrice({ account }));
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
            if (txHistory.length) {
                const chains = Object.keys(balances);
                for (let i = 0; i < chains.length; i++) {
                    const { percentage, stable } = await QueryRequests.calculateProfit(
                        txHistory,
                        balances[chains[i]].price,
                        namesConfig[chains[i]],
                    );
                    dispatch(
                        setProfit({
                            n: stable,
                            change: percentage,
                            key: namesConfig[chains[i]],
                        }),
                    );
                }
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
