import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import Link from 'next/link';
import ScrollLock from 'react-scrolllock';
import styles from './styles.module.css';
import Dropout from './Dropout';
import ChangeNetwork from './ChangeNetwork';
import MenuBtn from './MenuBtn/MenuBtn';
import type { walletKeyType } from '@/src/Redux/types';
import locales from '../../locales';
import {
    removeWallet,
    setPreloader,
    changeNetworkWC,
} from '@/src/Redux/store/reducers/WalletSlice';
import { useAppDispatch, useAppSelector } from '@/src/Redux/store/hooks/redux';
import {
    setIsOpenSelectWalletModal,
    setLanguage,
} from '@/src/Redux/store/reducers/AppSlice';
import { setIsOpenModal } from '@/src/Redux/store/reducers/UserSlice';
import { chainToNameConfig } from '@/src/utils/GlobalConst';
import {
    setWallet,
    changeNetwork,
} from '@/src/Redux/store/reducers/ActionCreators';
import type { availableChains, languages } from '@/src/utils/GlobalConst';

const Header = () => {
    const {
        account,
        provider,
        connect: walletConnectProvider,
    } = useAppSelector((state) => state.walletReducer);
    const { language } = useAppSelector((state) => state.appReducer);
    const dispatch = useAppDispatch();
    const connect = () => account || dispatch(setIsOpenSelectWalletModal(true));
    const disconnect = async () => {
        if (walletConnectProvider) await walletConnectProvider.disconnect();
        dispatch(removeWallet());
    };

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (window.location.search && provider) {
            const searchArray = location.search.replace('&', '=').split('=');
            const chainId = searchArray[1] as availableChains;
            const card = searchArray[3];
            dispatch(changeNetwork({ chainId, provider }));
            sessionStorage.setItem('card', chainToNameConfig[card]);
            dispatch(setIsOpenModal(true));
        }
    }, [account]);

    useEffect(() => {
        setIsOpen(false);
    }, []);

    useEffect(() => {
        if (walletConnectProvider) {
            walletConnectProvider.on('chainChanged', async (chainId: any) => {
                dispatch(
                    changeNetworkWC({
                        chainId: chainId.toString(),
                        provider,
                    }),
                );
            });
            walletConnectProvider.on('disconnect', async () => {
                dispatch(removeWallet());
            });
        }
    }, [walletConnectProvider]);

    useEffect(() => {
        (async function checkWallet() {
            const walletKey = localStorage.getItem('wallet') as walletKeyType;
            if (walletKey) {
                await dispatch(setWallet({ walletKey }));
            } else {
                dispatch(setPreloader(false));
            }
        }());
    }, []);

    const mapLanguage = (locale: languages) => {
        switch (locale) {
        case 'en':
            return 'ENG';
        case 'ru':
            return 'RUS';
        case 'ch':
            return 'CHN';
        default:
            return 'undfined lang';
        }
    };

    const handleClick = (el: languages) => {
        dispatch(setLanguage({ lang: el }));
    };

    const networkBtns = (
        <div
            className={classNames(styles.dashboard, styles.networkBtnsWrapper)}
        >
            <ChangeNetwork />
            {!account ? (
                <div
                    onClick={connect}
                    className={classNames(
                        styles.dashboardItem,
                        styles.connectButton,
                    )}
                >
                    Connect Wallet
                </div>
            ) : (
                <Dropout
                    title={
                        account
                            ? `${account.slice(0, 4)}...${account.slice(-4)}`
                            : 'Connect Wallet'
                    }
                    wrapperClassName={classNames(
                        styles.dashboardItem,
                        styles.justifyCenter,
                    )}
                    wrapperListClassName={styles.dashboardList}
                    wrapperTextClassName={styles.connectButtonText}
                    wrapperPickerClassName={styles.connectButtonPicker}
                >
                    <>
                        <Link href="/profile" passHref>
                            <div className={styles.locationBar}>
                                <div>Profile</div>
                                <Image
                                    src="/images/person.svg"
                                    width={25}
                                    height={25}
                                    quality={100}
                                    alt=""
                                />
                            </div>
                        </Link>
                        <div className={styles.linkBtn} onClick={disconnect}>
                            <div style={{ marginRight: '5px' }}>Disconnect</div>
                            <Image
                                src="/images/logout.svg"
                                width={20}
                                height={20}
                                quality={100}
                                alt=""
                            />
                        </div>
                    </>
                </Dropout>
            )}
        </div>
    );
    const langSwitcher = (
        <Dropout
            title={mapLanguage(language)}
            wrapperListClassName={styles.langList}
            arrowImg={(
                <Image
                    src="/images/arrowIconSmallWhite.svg"
                    width={10}
                    height={10}
                    alt=""
                />
            )}
        >
            <>
                {locales.map((el: languages, key: number) => (
                    <p key={key} onClick={() => handleClick(el)}>
                        {mapLanguage(el)}
                    </p>
                ))}
            </>
        </Dropout>
    );
    return (
        <>
            <header
                className={classNames(styles.header, {
                    [styles.isOpen]: isOpen,
                    [styles.isClose]: !isOpen,
                })}
            >
                <div className="container">
                    <div className={styles.wrapper}>
                        <div className={styles.menuHeaderWrapper}>
                            <Link href="/" passHref>
                                <Image
                                    src="/images/logo.svg"
                                    width={205}
                                    height={40}
                                    alt=""
                                />
                            </Link>
                        </div>
                        <div
                            className={classNames(styles.menuWrapper, {
                                [styles.isOpen]: isOpen,
                                [styles.isClose]: !isOpen,
                            })}
                        >
                            <div className={styles.selectorsWrapper}>
                                <Dropout
                                    title="Synthetic Vaults"
                                    wrapperClassName={classNames(
                                        styles.heading,
                                        styles.syntheticSelect,
                                    )}
                                >
                                    <>
                                        <Link href="/" passHref>
                                            <p className={styles.dropItem}>
                                                Buy & Sell Synth-LP
                                            </p>
                                        </Link>
                                        <p>
                                            Mint & Burn Synth-LP
                                            <span className={styles.soonText}>
                                                (soon)
                                            </span>
                                        </p>
                                    </>
                                </Dropout>
                                <nav
                                    className={classNames(
                                        styles.navigate,
                                        styles.directionColumn,
                                    )}
                                >
                                    <Dropout title="enUSD">
                                        <Link
                                            href="/mint-entangle-usd"
                                            passHref
                                        >
                                            <p className={styles.dropItem}>
                                                Borrow
                                            </p>
                                        </Link>
                                    </Dropout>
                                    <Dropout title="Stake">
                                        <>
                                            <Link
                                                href="/stake-entangle"
                                                passHref
                                            >
                                                <p className={styles.dropItem}>
                                                    Entangle
                                                </p>
                                            </Link>
                                            <Link
                                                href="/stake-stablecoin"
                                                passHref
                                            >
                                                <p className={styles.dropItem}>
                                                    Stablecoin
                                                </p>
                                            </Link>
                                        </>
                                    </Dropout>
                                </nav>
                                {networkBtns}
                                <div
                                    className={classNames(
                                        styles.mdBlock,
                                        styles.hidden,
                                        styles.alignStart,
                                    )}
                                >
                                    {langSwitcher}
                                </div>
                            </div>
                        </div>
                        <div className={styles.rightSideMenuWrappper}>
                            {networkBtns}
                            <div
                                className={classNames(
                                    styles.mdHidden,
                                    styles.block,
                                )}
                            >
                                {langSwitcher}
                            </div>
                            <div className={styles.menuBtnWrapper}>
                                <MenuBtn
                                    isOpen={isOpen}
                                    onOpen={() => {
                                        setIsOpen(true);
                                    }}
                                    onClose={() => {
                                        setIsOpen(false);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className={styles.headerHeight} />
            {isOpen && (
                <ScrollLock>
                    <div />
                </ScrollLock>
            )}
        </>
    );
};

export default Header;
