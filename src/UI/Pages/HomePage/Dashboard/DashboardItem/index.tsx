import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import GradientButton from 'UI/ui-kit/GradientButton';
import TextLoader from 'UI/ui-kit/TextLoader/TextLoader';
import { synths, WalletProviderNames } from 'utils/Global/Vars';
import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import type { availableChains } from 'utils/Global/Types';
import CopyBtn from 'UI/ui-kit/CopyBtn/CopyBtn';
import HoverTooltip from 'UI/ui-kit/HoverTooltip/HoverTooltip';
import HintModal from 'UI/ui-kit/HintModal';
import type { ContainerStateType } from './containers/types';
import styles from './style.module.css';

type DashboardItemProps = {
    chainId: availableChains;
    bgGradient: string;
    icon: string;
    heading: string;
    vendor: string;
    priceCurrency: string;
    disabled: boolean;
    isFiltered: boolean;
    openModal?: () => void;
} & ContainerStateType;

const DashboardItem: React.FC<DashboardItemProps> = ({
    icon,
    bgGradient,
    heading,
    vendor,
    apr,
    available,
    price,
    priceCurrency,
    disabled,
    chainId,
    openModal,
    isFiltered = false,
    localChain,
    localName,
}) => {
    const { store, asyncActions, actions } = useStore((store) => ({
        UserEntity: store.UserEntity,
        WalletEntity: store.WalletEntity,
        AppEntity: store.AppEntity,
    }));

    const { account, provider, chainId: selectedChainId } = store.WalletEntity;

    const { profits } = store.UserEntity;

    const { importToken, changeNetwork, setWallet } = asyncActions.Wallet;

    const { setIsOpenSelectWalletModal } = actions.App;

    const dispatch = useDispatch();

    const { t } = useTranslation('index');

    const [addingToken, setAddingToken] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    useEffect(() => {
        if (tooltipVisible) {
            const timer = setTimeout(() => setTooltipVisible(false), 3000);
            return () => {
                clearTimeout(timer);
            };
        }
        return () => {};
    }, [tooltipVisible]);

    useEffect(() => {
        if (addingToken) {
            const synthAddress = synths[chainId][localName];
            dispatch(importToken({ synthAddress, provider }));
            setAddingToken(false);
        }
    }, [selectedChainId, addingToken]);

    const buttonValue = useMemo(() => {
        if (selectedChainId === '1') return 'highGas';
        if (disabled) return 'notAvailable';
        if (!account) return 'connectWallet';
        return 'select';
    }, [account, selectedChainId]);

    const handleMetamaskClick = () => {
        if (addingToken) {
            dispatch(changeNetwork({ chainId: localChain, provider }));
            setAddingToken(true);
        } else {
            const synthAddress = synths[chainId][localName];
            dispatch(importToken({ synthAddress, provider }));
        }
    };

    const makeUrl = ({ net, card }) => {
        history.replaceState({}, '', `?net=${net}&card=${card}`);
    };

    const handleSelectClick = () => {
        switch (buttonValue) {
        case 'select':
                openModal!();
            makeUrl({ net: selectedChainId, card: localChain });
            sessionStorage.setItem('card', localName);
            break;
        case 'connectWallet':
            dispatch(setWallet({ walletKey: 'MetaMask' }));
            setIsOpenSelectWalletModal();
            break;
        default:
            throw new Error('Unexpected button value');
        }
    };

    return (
        <div
            className={classNames(styles.overlayWrapper, {
                [styles.hidden]: isFiltered,
            })}
        >
            {disabled && <div className={styles.overlayDisabled} />}
            <div className={styles.wrapper}>
                <div className={styles.topBg}>
                    <div
                        className={styles.bg}
                        style={{ background: bgGradient || '' }}
                    />
                </div>
                <div className={styles.top}>
                    <div className={styles.logo}>
                        <Image
                            width={60}
                            height={60}
                            quality={100}
                            src={`/images/networks/${icon}`}
                            alt=""
                        />
                    </div>
                    <p className={styles.title}>Synthetic-LP</p>
                </div>
                <div className={styles.heading}>
                    {heading}
                    <div className={styles.addImgWrapper}>
                        <CopyBtn
                            text={synths[chainId][localName]}
                            wrapperClassName={styles.metamaskBtnImg}
                        />
                    </div>
                    {provider && account && (
                        <div
                            className={styles.addImgWrapper}
                            onMouseEnter={() => {
                                setTooltipVisible(true);
                            }}
                            onMouseLeave={() => {
                                setTooltipVisible(false);
                            }}
                            onClick={handleMetamaskClick}
                        >
                            <Image
                                width={20}
                                height={20}
                                className={styles.metamaskBtnImg}
                                quality={100}
                                src={`/images/connectors/${WalletProviderNames.MetaMask}.svg`}
                                alt="Add to MetaMask"
                            />
                            <HoverTooltip
                                isVisible={tooltipVisible}
                                text={t('metamask')}
                            />
                        </div>
                    )}
                </div>
                <p className={styles.description}>
                    {t('desFirstPart')}
                    {' '}
                    {heading}
                    {' '}
                    {t('desSecPart')}
                    {' '}
                    <span style={{ color: '#fff' }}>{vendor}</span>
                </p>
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>
                        <p>{t('aprCard')}</p>
                        <HintModal>
                            <p>{t('aprDesk')}</p>
                        </HintModal>
                    </div>
                    <div className={styles.sectionRow}>
                        {apr ? (
                            <p className={styles.sectionValue}>{`${apr}%`}</p>
                        ) : (
                            <TextLoader bgGradient={bgGradient} />
                        )}
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>
                        <p>{t('valueLPCard')}</p>
                        <HintModal>
                            <p>{t('valueLPDesk')}</p>
                        </HintModal>
                    </div>
                    <div className={styles.sectionRow}>
                        {available ? (
                            <p className={styles.sectionValue}>
                                {available === 'Unlimited'
                                    ? t('unlimited')
                                    : available}
                            </p>
                        ) : (
                            <TextLoader bgGradient={bgGradient} />
                        )}
                    </div>
                </div>
                <div className={styles.section}>
                    <p className={styles.sectionTitle}>{t('price')}</p>
                    <div className={styles.sectionRow}>
                        {price ? (
                            <>
                                <p className={styles.sectionValue}>
                                    $
                                    {price}
                                </p>
                                <p className={styles.sectionSubValue}>
                                    {priceCurrency}
                                </p>
                            </>
                        ) : (
                            <TextLoader bgGradient={bgGradient} />
                        )}
                    </div>
                </div>
                {account ? (
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <p>{t('rty')}</p>
                            <HintModal>
                                <p>{t('rtyDesk')}</p>
                            </HintModal>
                        </div>
                        <div className={styles.sectionRow}>
                            {profits[localChain]?.value
                                || profits[localChain]?.value === 0 ? (
                                    <p className={styles.sectionValue}>
                                        $
                                        {profits[localChain]?.value}
                                    </p>
                                )
                                : (
                                    <TextLoader bgGradient={bgGradient} />
                                )}
                        </div>
                    </div>
                ) : (
                    <div className={styles.section}>
                        <p className={styles.sectionTitle}>
                            {`${t('yourPosition')} / ${t('rty')}`}
                        </p>
                        <div className={styles.section}>
                            <p className={styles.sectionError}>
                                {t('connectWallet')}
                            </p>
                        </div>
                    </div>
                )}
                <div className={styles.buttonWrapper}>
                    <div className={styles.mt2}>
                        <GradientButton
                            title={t(buttonValue)}
                            onClick={handleSelectClick}
                            disabled={disabled || selectedChainId === '1'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardItem;
