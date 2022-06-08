import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './style.module.css';
import GradientButton from '@/ui-kit/GradientButton';
import TextLoader from '@/ui-kit/TextLoader/TextLoader';
import { synths } from '@/src/utils/GlobalConst';
import {
    useAppDispatch,
    useAppSelector,
} from '@/src/Redux/store/hooks/redux';
import {
    changeNetwork,
    importToken,
    setWallet,
} from '@/src/Redux/store/reducers/ActionCreators';
import type { availableChains } from '@/src/utils/GlobalConst';
import type { ContainerStateType } from './containers/types';
import CopyBtn from '@/ui-kit/CopyBtn/CopyBtn';
import HoverTooltip from '@/ui-kit/HoverTooltip/HoverTooltip';
import { WalletProviderNames } from '../../../Modal/SelectWalletModal/SelectWalletModal.constants';
import { setIsOpenSelectWalletModal } from '@/src/Redux/store/reducers/AppSlice';
import HintModal from '@/components/HintModal';

type DashboardItemProps = {
    chainId: availableChains;
    bgGradient: string;
    icon: string;
    heading: string;
    description: string;
    priceCurrency: string;
    disabled: boolean;
    isFiltered: boolean;
    openModal?: () => void;
} & ContainerStateType;

const DashboardItem: React.FC<DashboardItemProps> = ({
    icon,
    bgGradient,
    heading,
    description,
    apr,
    available,
    totalAvailable,
    price,
    positions,
    totalPositions,
    priceCurrency,
    rowGradient,
    disabled,
    chainId,
    openModal,
    yieldTime,
    isFiltered = false,
    localChain,
    localName,
}) => {
    const {
        account,
        provider,
        chainId: selectedChainId,
    } = useAppSelector((state) => state.walletReducer);

    const dispatch = useAppDispatch();

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
            dispatch(importToken({ chainId, synthAddress, provider }));
            setAddingToken(false);
        }
    }, [selectedChainId, addingToken]);

    const buttonValue = useMemo(() => {
        if (localChain === '1') return 'High Gas Fees. Excluded from MVP';
        if (disabled) return 'Not available';
        if (!account) return 'Connect wallet';
        return 'Select';
    }, [account, selectedChainId]);

    const handleMetamaskClick = () => {
        if (addingToken) {
            dispatch(changeNetwork({ chainId: localChain, provider }));
            setAddingToken(true);
        } else {
            const synthAddress = synths[chainId][localName];
            dispatch(importToken({ chainId, synthAddress, provider }));
        }
    };

    const makeUrl = ({ net, card }) => {
        history.replaceState({}, '', `?net=${net}&card=${card}`);
    };

    const handleSelectClick = () => {
        switch (buttonValue) {
        case 'Select':
                openModal!();
            makeUrl({ net: selectedChainId, card: localChain });
            sessionStorage.setItem('card', localName);
            break;
        case 'Connect wallet':
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
                        <Image width={60} height={60} quality={100} src={`/images/networks/${icon}`} alt="" />
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
                                text="Add to MetaMask"
                            />
                        </div>
                    )}
                </div>
                <p className={styles.description}>{description}</p>
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>
                        <p>Current Projected APR </p>
                        <HintModal>
                            <p>The current annual percentage received on this farm</p>
                        </HintModal>
                    </div>
                    <div className={styles.sectionRow}>
                        {apr ? (
                            <p className={styles.sectionValue}>{apr}</p>
                        ) : (
                            <TextLoader bgGradient={bgGradient} />
                        )}
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>
                        <p>Value of LPs Staked </p>
                        <HintModal>
                            <p>The current annual percentage received on this farm</p>
                        </HintModal>
                    </div>
                    <div className={styles.sectionRow}>
                        {available ? (
                            <p className={styles.sectionValue}>{available}</p>
                        ) : (
                            <TextLoader bgGradient={bgGradient} />
                        )}
                    </div>
                </div>
                {/* <div className={styles.section}>
                    <div className={styles.sectionTitle}>
                        <p>Available</p>
                        <HintModal>
                            <p>The number of tokens available for purchase</p>
                        </HintModal>

                    </div>
                    {available ? (
                        <>
                            <div
                                className={classNames(
                                    styles.sectionRow,
                                    styles.sectionAvailable,
                                )}
                            >
                                <p className={styles.sectionValue}>
                                    {available}
                                </p>
                                <p className={styles.sectionSubValue}>
                                    Synth-LP
                                </p>
                                <p
                                    className={classNames(
                                        styles.sectionSubValue,
                                        styles.sectionGraySubValue,
                                    )}
                                >
                                    {totalAvailable}
                                </p>
                            </div>
                            <div
                                style={{ background: rowGradient }}
                                className={styles.rowGradient}
                            />
                        </>
                    ) : (
                        <TextLoader
                            bgGradient={bgGradient}
                            margin="0.87rem 0"
                        />
                    )}
                </div> */}
                <div className={styles.section}>
                    <p className={styles.sectionTitle}>Price</p>
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
                    <>
                        {/* <div className={styles.section}>
                            <p className={styles.sectionTitle}>Your Position</p>
                            <div className={classNames(styles.sectionRow)}>
                                {positions ? (
                                    <p className={styles.sectionValue}>
                                        {positions}
                                    </p>
                                ) : (
                                    <TextLoader bgGradient={bgGradient} />
                                )}
                                <p className={styles.sectionSubValue}>
                                    {totalPositions}
                                </p>
                            </div>
                        </div> */}
                        <div className={styles.section}>
                            <p className={styles.sectionTitle}>
                                Real Time Yield
                            </p>
                            <div className={styles.sectionRow}>
                                {yieldTime ? (
                                    <p className={styles.sectionValue}>
                                        {yieldTime}
                                    </p>
                                ) : (
                                    <TextLoader bgGradient={bgGradient} />
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={styles.section}>
                        <p className={styles.sectionTitle}>
                            Your Position / Real Time Yield
                        </p>
                        <div className={styles.section}>
                            <p className={styles.sectionError}>
                                Connect Your Metamask wallet
                            </p>
                        </div>
                    </div>
                )}
                <div className={styles.buttonWrapper}>
                    <div className={styles.mt2}>
                        <GradientButton
                            title={buttonValue}
                            onClick={handleSelectClick}
                            disabled={disabled || localChain === '1'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardItem;
