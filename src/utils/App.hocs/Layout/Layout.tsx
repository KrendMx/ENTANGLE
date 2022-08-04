import React, {
    useEffect, useMemo, memo,
} from 'react';
import { useDispatch } from 'react-redux';
import { useStore } from 'core/store';
import Preloader from 'UI/ui-kit/Preloader';

import Footer from 'UI/Components/Footer';
import Header from 'UI/Components/Header';

import { CardService, GraphService } from 'services/index';
import QueryRequests from 'services/GraphService/queryRequests';
import { namesConfig, availableChainsArray, farms } from 'utils/Global/Vars';
import { generateEmptyObject } from 'utils/helper/generateEmptyObject';
import { Notification } from 'src/libs/Notification';
import type { availableChains, availableNames } from 'src/utils/Global/Types';
import toNormalChainId from 'utils/toChainId/toNormalChainId';
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
    const {
        store: {
            UserEntity: {
                balances,
                txHistory,
                txLoaded,
            },
            WalletEntity: {
                account,
                chainId,
                walletKey,
                preLoader,
                provider,
            },
            AppEntity: {
                isAppLoaded,
            },
            ContractEntity: {
                txLoading,
            },
        }, actions: {
            User: {
                setCardLoaded,
                setPayData,
                setProfit,
                setError,
                setLoading,
            },
            Wallet: {
                removeWallet,
                setChain,
                setAccount,
                setIsOpenWrongChainModal,
            },
            Card: {
                setDefaultCardData,
                setCardInfo,
            },
            Contract: {
                clearAllowance,
            },
            App: {
                setIsAppLoaded,
            },
        }, asyncActions: {
            Wallet: {
                changeNetwork,
            },
            Card: {
                getCardApr,
            },
            User: {
                calculateBalances,
                getAverageBuyPrice,
                getChartData,
            },
        },
    } = useStore((store) => ({
        UserEntity: store.UserEntity,
        AppEntity: store.AppEntity,
        WalletEntity: store.WalletEntity,
        ContractEntity: store.ContractEntity,
        CardEntity: store.CardsEntity,
    }));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setIsAppLoaded(true));
        dispatch(getCardApr());
    }, []);

    const Graph = useMemo(() => new GraphService(account), [account]);

    const cardDataConfig = [
        { firstLabel: 'AVAX', secondId: '' },
        { firstLabel: 'FTM', secondId: '' },
        { firstLabel: 'BSC', secondId: '' },
        { firstLabel: 'ETH', secondId: '' },
        { firstLabel: 'ELRD', secondId: '' },
    ];

    useEffect(() => {
        (async function getAvg() {
            if (!account) return;
            dispatch(getAverageBuyPrice({ account }));
        }());
    }, [account]);

    const disconnect = () => dispatch(removeWallet());

    const changeAccount = (accounts: string[]) => dispatch(setAccount({ accounts }));

    const chainChange = (chainId: string) =>
        dispatch(changeNetwork({ chainId: toNormalChainId(chainId) as availableChains, provider }));

    useEffect(() => {
        if (walletKey) {
            const eventProvider = window.ethereum;
            eventProvider.on('disconnect', disconnect);
            eventProvider.on('accountsChanged', changeAccount);
            eventProvider.on('chainChanged', chainChange);
            return () => {
                const removeEventKey = 'removeListener';
                eventProvider[removeEventKey]('disconnect', disconnect);
                eventProvider[removeEventKey]('accountsChanged', changeAccount);
                eventProvider[removeEventKey]('chainChanged', chainChange);
            };
        }
        return () => {};
    }, [walletKey]);

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
        if (!preLoader) {
            for (const key of cardDataConfig) {
                const Service = new CardService(key.firstLabel as availableNames);
                (async () => {
                    const {
                        available,
                        totalAvailable,
                        totalDeposits,
                        currentDeposits,
                        price,
                    } = await Service.getCardData(
                        account
                            ? farms[chainId]?.[key.firstLabel]
                            : farms['43114']?.[key.firstLabel],
                    );

                    dispatch(
                        setCardInfo({
                            key: namesConfig[key.firstLabel],
                            data: {
                                available: `${
                                    namesConfig[key.firstLabel] === chainId
                                        ? 'Unlimited'
                                        : available.toFixed(2)
                                }`,
                                totalAvailable: totalAvailable.toString(),
                                totalDeposits: `${totalDeposits} aDAI/aSUSD Synthetic LP`,
                                currentDeposits: `$${currentDeposits.toFixed(3)}`,
                                price: `${Number(price.toFixed(6))}`,
                            },
                        }),
                    );
                    dispatch(
                        setPayData({
                            key: namesConfig[key.firstLabel],
                            data: {
                                available: `${
                                    namesConfig[key.firstLabel] === chainId
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
        }
    }, [chainId, preLoader]);

    useEffect(() => {
        (async function GetProfit() {
            try {
                dispatch(setLoading(true));
                if (txHistory.length) {
                    const res = generateEmptyObject();
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
                                    (balances[name][chains[i]] as any)
                                        .price,
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
                } else if (txLoaded) {
                    dispatch(setProfit(generateEmptyObject()));
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
