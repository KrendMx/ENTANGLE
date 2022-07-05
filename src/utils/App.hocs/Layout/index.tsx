import React, { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../Redux/store/hooks/redux';
import { appSlice } from '../../Redux/store/reducers/AppSlice';
import Preloader from '../../../components/ui-kit/Preloader';

import Footer from '../../../components/Footer/index';
import Header from '../../../components/Header';

import styles from './style.module.css';
import GraphService from '@/src/GraphService';
import QueryRequests from '@/src/GraphService/queryRequests';
import {
    getAverageBuyPrice,
    setCardLoaded,
    setProfit,
    setTxHistory,
    setTxLoaded,
} from '@/src/Redux/store/reducers/UserSlice';
import { calculateBalances } from '@/src/Redux/store/reducers/ActionCreators';
import { namesConfig } from '@/src/utils/GlobalConst';

type ILayoutProps = {
    children: JSX.Element;
};

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    const { isLoaded } = useAppSelector((state) => state.appReducer);
    const {
        balances, txLoading, txHistory, txLoaded,
    } = useAppSelector(
        (state) => state.userReducer,
    );
    const { account } = useAppSelector((state) => state.walletReducer);
    const { appLoaded } = appSlice.actions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(appLoaded(true));
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
            <Preloader isVisible={!isLoaded} />
            <Header />
            <div className={styles.layout}>
                <main>{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default React.memo(Layout);
