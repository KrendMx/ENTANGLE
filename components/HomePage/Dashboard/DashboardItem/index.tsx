import React, {
    useContext, useEffect, useMemo, useState,
} from 'react';
import classNames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './style.module.css';
import GradientButton from '../../../ui-kit/GradientButton';
import TextLoader from '../../../ui-kit/TextLoader/TextLoader';
import { ProviderContext } from '../../../../context/ProviderContext';
import type { ContainerStateType } from './containers/types';
import { networks } from '../../../../src/utils/GlobalConst';

type DashboardItemProps = {
    chainId: '250' | '43114';
    bgGradient: string;
    icon: string;
    heading: string;
    description: string;
    priceCurrency: string;
    disabled: boolean;
    openModal?: () => void;
} & ContainerStateType;

const DashboardItem: React.FC<DashboardItemProps> = (props) => {
    const {
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
    } = props;
    const {
        account,
        chainId: selectedChainId,
        setChainID,
        importToken,
        setChainIDAsync,
        setWallet,
    } = useContext(ProviderContext);

    const localChain = chainId === '43114' ? '250' : '43114';

    const canAddToken = useMemo(() => (selectedChainId !== chainId), [selectedChainId]);
    const [addingToken, setAddingToken] = useState(false);

    useEffect(() => {
        if (canAddToken && addingToken) {
            importToken();
            setAddingToken(false);
        }
    }, [selectedChainId, addingToken]);

    const buttonValue = useMemo(() => {
        if (disabled) return 'Not available';
        if (!account) return 'Connect wallet';
        if (selectedChainId !== '43114' && selectedChainId !== '250') return 'Change network';
        if (selectedChainId !== chainId) return 'Select';
        return 'Change network';
    }, [account, selectedChainId]);

    const handleMetamaskClick = () => {
        if (!canAddToken) {
            setChainIDAsync(localChain).then(() => {
                setTimeout(() => {
                    setAddingToken(true);
                }, 1000);
            });
        } else {
            importToken();
        }
    };
    const handleSelectClick = () => {
        switch (buttonValue) {
        case 'Select':
                openModal!();
            break;
        case 'Change network':
            setChainID(localChain);
            break;
        case 'Connect wallet':
            setWallet('MetaMask');
            break;
        default:
            break;
        }
    };

    return (
        <div className={styles.overlayWrapper}>
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
                        <CopyToClipboard text={networks[chainId].synth}>
                            <img className={styles.metamaskBtnImg} src="./images/copy.svg" alt="Copy synth address" />
                        </CopyToClipboard>
                    </div>
                    <div className={styles.addImgWrapper} onClick={handleMetamaskClick}>
                        <img className={styles.metamaskBtnImg} src="./images/connectors/metamask.svg" alt="Add to MetaMask" />
                    </div>
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
                    <div
                        className={classNames(
                            styles.sectionRow,
                            styles.sectionAvailable,
                        )}
                    >
                        {totalAvailable ? (
                            <>
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
                            </>
                        ) : (
                            <TextLoader bgGradient={bgGradient} />
                        )}
                    </div>
                    <div
                        style={{ background: rowGradient }}
                        className={styles.rowGradient}
                    />
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
                <div className={styles.section}>
                    <p className={styles.sectionTitle}>Your Position</p>
                    {account ? (
                        <div
                            className={classNames(styles.sectionRow)}
                        >
                            <p className={styles.sectionValue}>
                                {positions || (
                                    <TextLoader bgGradient={bgGradient} />
                                )}
                            </p>
                            <p className={styles.sectionSubValue}>
                                {totalPositions}
                            </p>
                        </div>
                    ) : (
                        <div className={styles.section}>
                            <p className={styles.sectionError}>
                                Connect Your Metamask wallet
                            </p>
                        </div>
                    )}
                </div>
                <div className={styles.section}>
                    <p className={styles.sectionTitle}>Real Time Yield</p>
                    <div className={styles.sectionRow}>
                        {price ? (
                            <p className={styles.sectionValue}>+$15</p>
                        ) : (
                            <TextLoader bgGradient={bgGradient} />
                        )}
                    </div>
                </div>
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
