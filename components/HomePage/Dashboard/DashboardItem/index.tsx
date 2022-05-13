import React, {
    useEffect, useMemo, useState,
} from 'react';
import classNames from 'classnames';
import styles from './style.module.css';
import GradientButton from '../../../ui-kit/GradientButton';
import TextLoader from '../../../ui-kit/TextLoader/TextLoader';
import { networks } from '../../../../src/utils/GlobalConst';
import { useAppDispatch, useAppSelector } from '../../../../Redux/store/hooks/redux';
import { changeNetwork, importToken, setWallet } from '../../../../Redux/store/reducers/ActionCreators';
import type { availableChains } from '../../../../src/utils/GlobalConst';
import type { ContainerStateType } from './containers/types';
import CopyBtn from '../../../ui-kit/CopyBtn/CopyBtn';
import HoverTooltip from '../../../ui-kit/HoverTooltip/HoverTooltip';
import { WalletProviderNames } from '../../../Modal/SelectWalletModal/SelectWalletModal.constants';
import { setIsOpenSelectWalletModal } from '../../../../Redux/store/reducers/UserSlice';

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
    currentDeposits,
    totalDeposits,
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
    const { account, provider, chainId: selectedChainId } = useAppSelector((state) => state.walletReducer);
    const dispatch = useAppDispatch();

    const canAddToken = useMemo(
        () => selectedChainId !== chainId,
        [selectedChainId],
    );
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
        if (canAddToken && addingToken) {
            dispatch(importToken({ chainId, provider }));
            setAddingToken(false);
        }
    }, [selectedChainId, addingToken]);

    useEffect(() => {
        console.log('n', chainId);
    }, []);

    const buttonValue = useMemo(() => {
        if (localChain === '1') return 'High Gas Fees. Excluded for MVP';
        if (disabled) return 'Not available';
        if (!account) return 'Connect wallet';
        if (
            selectedChainId === '250'
            || selectedChainId === '43114'
            || selectedChainId === '56'
        ) {
            return 'Select';
        }
        return 'Change network';
    }, [account, selectedChainId]);

    const handleMetamaskClick = () => {
        if (!canAddToken) {
            dispatch(changeNetwork(localChain));
            setAddingToken(true);
        } else {
            dispatch(importToken({ chainId: localChain, provider }));
        }
    };

    const handleSelectClick = () => {
        switch (buttonValue) {
        case 'Select':
                openModal!();
            sessionStorage.setItem('card', localName);
            break;
        case 'Change network':
            dispatch(changeNetwork(localChain));
            break;
        case 'Connect wallet':
            dispatch(setWallet({ walletKey: 'MetaMask', chainId }));
            setIsOpenSelectWalletModal();
            break;
        default:
            break;
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
                        style={{ background: bgGradient }}
                    />
                </div>
                <div className={styles.top}>
                    <div className={styles.logo}>
                        <img src={`./images/networks/${icon}`} alt="" />
                    </div>
                    <p className={styles.title}>Synthetic-LP</p>
                </div>
                <div className={styles.heading}>
                    {heading}
                    <div className={styles.addImgWrapper}>
                        <CopyBtn
                            text={networks[chainId].synth}
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
                            <img
                                className={styles.metamaskBtnImg}
                                src={`./images/connectors/${WalletProviderNames.MetaMask}.svg`}
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
                    <p className={styles.sectionTitle}>Current Projected APR</p>
                    <div className={styles.sectionRow}>
                        {apr ? (
                            <p className={styles.sectionValue}>{apr}</p>
                        ) : (
                            <TextLoader bgGradient={bgGradient} />
                        )}
                    </div>
                </div>
                <div className={styles.section}>
                    <p className={styles.sectionTitle}>Current Deposits</p>
                    <div className={styles.sectionRow}>
                        {currentDeposits ? (
                            <p className={styles.sectionValue}>
                                {currentDeposits}
                            </p>
                        ) : (
                            <TextLoader bgGradient={bgGradient} />
                        )}
                        <p className={styles.sectionSubValue}>
                            {totalDeposits}
                        </p>
                    </div>
                </div>
                <div className={styles.section}>
                    <p className={styles.sectionTitle}>Available</p>
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
                        <TextLoader bgGradient={bgGradient} margin="0.87rem 0" />
                    )}
                </div>
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
                        <div className={styles.section}>
                            <p className={styles.sectionTitle}>Your Position</p>
                            <div className={classNames(styles.sectionRow)}>
                                <p className={styles.sectionValue}>
                                    {positions || (
                                        <TextLoader bgGradient={bgGradient} />
                                    )}
                                </p>
                                <p className={styles.sectionSubValue}>
                                    {totalPositions}
                                </p>
                            </div>
                        </div>
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
                            disabled={disabled}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardItem;
