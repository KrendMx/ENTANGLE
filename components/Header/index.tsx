import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import ScrollLock from 'react-scrolllock';
import styles from './styles.module.css';
import Dropout from './Dropout';
import ChangeNetwork from './ChangeNetwork';
import MenuBtn from './MenuBtn/MenuBtn';
import { removeWallet, setPreloader } from '../../Redux/store/reducers/WalletSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/store/hooks/redux';
import { setIsOpenSelectWalletModal } from '../../Redux/store/reducers/AppSlice';
import { setWallet } from '../../Redux/store/reducers/ActionCreators';

const Header = () => {
    const { account, chainId } = useAppSelector((state) => state.walletReducer);
    const dispatch = useAppDispatch();
    const connect = () => account || dispatch(setIsOpenSelectWalletModal(true));
    const disconnect = () => dispatch(removeWallet());

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, []);

    useEffect(() => {
        const wallet = localStorage.getItem('wallet');
        if (wallet) {
            dispatch(setWallet({ walletKey: 'MetaMask' }));
        } else {
            dispatch(setPreloader(false));
        }
    }, []);

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
                                <img src="./images/person.svg" alt="" />
                            </div>
                        </Link>
                        <div className={styles.linkBtn} onClick={disconnect}>
                            <div>Disconnect</div>
                            <img src="./images/logout.svg" alt="" />
                        </div>
                    </>
                </Dropout>
            )}
        </div>
    );
    const langSwitcher = (
        <Dropout
            title="ENG"
            wrapperListClassName={styles.langList}
            arrowImg={<img src="./images/arrowIconSmallWhite.svg" alt="" />}
        >
            <p>ENG</p>
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
                                <img src="./images/logo.svg" alt="" />
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
                                    title="Synthetic LP Vaults"
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
                                    <Dropout
                                        title="enUSD"
                                        isSoon
                                        wrapperListClassName={
                                            styles.displayNone
                                        }
                                        wrapperPickerClassName={
                                            styles.displayNone
                                        }
                                    />
                                    <Dropout title="STAKE">
                                        <>
                                            <p>
                                                Entangle
                                                <span className={styles.soonText}>
                                                    (soon)
                                                </span>
                                            </p>
                                            <p>
                                                Stablecoins
                                                <span className={styles.soonText}>
                                                    (soon)
                                                </span>
                                            </p>
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
