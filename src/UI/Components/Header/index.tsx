import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import Link from 'next/link';
import ScrollLock from 'react-scrolllock';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useStore } from 'core/store';
import type { walletKeyType, availableChains, languages } from 'utils/Global/Types';
import { chainToNameConfig } from 'utils/Global/Vars';
import { useDispatch } from 'react-redux';
import styles from './styles.module.css';
import Dropout from './Dropout';
import ChangeNetwork from './ChangeNetwork';
import MenuBtn from './MenuBtn/MenuBtn';
import locales from '../../../../locales';

const Header = () => {
    const { store, actions, asyncActions } = useStore((store) => ({
        UserEntity: store.UserEntity,
        AppEntity: store.AppEntity,
        WalletEntity: store.WalletEntity,
    }));
    const dispatch = useDispatch();

    const {
        account,
        provider,
        connect: walletConnectProvider,
    } = store.WalletEntity;

    const { setIsOpenSelectWalletModal } = actions.App;
    const { setIsOpenModal } = actions.User;
    const { removeWallet, changeNetworkWC, setPreloader } = actions.Wallet;
    const { setWallet } = asyncActions.Wallet;

    const { changeNetwork } = asyncActions.Wallet;
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
        case 'de':
            return 'DEU';
        case 'ko':
            return 'KOR';
        default:
            return 'undfined lang';
        }
    };

    const { asPath, locale, pathname } = useRouter();
    const { t } = useTranslation('header');

    useEffect(() => { setIsOpen(false); }, [pathname]);

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
                    <div>{t('connectWallet')}</div>
                </div>
            ) : (
                <Dropout
                    title={
                        account
                            ? `${account.slice(0, 4)}...${account.slice(-4)}`
                            : t('connectWallet')
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
                        <Link href="/pages/profile" passHref>
                            <div className={styles.locationBar}>
                                <div>{t('profile')}</div>
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
                            <div style={{ marginRight: '5px' }}>{t('disconnect')}</div>
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
            title={mapLanguage(locale as languages)}
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
                    <Link href={asPath} locale={el} key={key} passHref>
                        <p>
                            {mapLanguage(el)}
                        </p>
                    </Link>

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
                                <nav
                                    className={classNames(
                                        styles.navigate,
                                        styles.directionColumn,
                                    )}
                                >
                                    <div className={styles.dropElemFirst}>
                                        <Link href="/" passHref>
                                            <p className={styles.dropItemOne}>
                                                {t('syntheticVaults')}
                                            </p>
                                        </Link>
                                    </div>
                                    <Dropout title="EnUSD" offset="25px">
                                        <Link
                                            href="/borrow"
                                            passHref
                                        >
                                            <p className={styles.dropItem}>
                                                {t('borrow')}
                                            </p>
                                        </Link>
                                    </Dropout>
                                    <Dropout title={t('stake')} offset="25px">
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
                                                    {t('stablecoin')}
                                                </p>
                                            </Link>
                                            <Link
                                                href="/single-side-staking"
                                                passHref
                                            >
                                                <p className={styles.dropItem}>
                                                    SSAS
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
