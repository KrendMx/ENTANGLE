import React, { useContext } from 'react';
import Image from 'next/image';

import classNames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import type { SuccessModalProps } from './SuccessModal.interface';
import { ProviderContext } from '../../../context/ProviderContext';

import styles from './style.module.css';
import GradientButton from '../../ui-kit/GradientButton';
import { networks } from '../../../src/utils/GlobalConst';

const SuccessModalContent: React.FC<SuccessModalProps> = ({
    transactionInfo,
    handleClose,
}) => {
    const { importToken, chainId } = useContext(ProviderContext);
    const directionText = `You ${transactionInfo.isReceived ? 'received' : 'spent'}:`;
    return (
        <div className={styles.wrapper}>
            <div className={styles.closeWrapper}>
                <img
                    className={styles.closeImg}
                    onClick={handleClose}
                    src="./images/close.svg"
                    alt="closeImg"
                />
            </div>
            <div className={styles.errorText}>Success transaction.</div>
            <div className={classNames(styles.errorText, styles.errorTextContent)}>{directionText}</div>
            <div className={styles.valueTextWrapper}>
                <span className={styles.valueText}>{transactionInfo.value}</span>
                {' '}
                {transactionInfo.symbol}
            </div>
            <div className={styles.btnWrapper}>
                {transactionInfo.isReceived && (
                    <div className={classNames(styles.gradientBtnWrapper, styles.btnActionWrapper, styles.flex1)}>
                        <GradientButton
                            titleElement={(
                                <div className={styles.metamaskBtnWrapper}>
                                    <div>Add to MetaMask</div>
                                    <img
                                        className={styles.metamaskBtnImg}
                                        src="./images/connectors/metamask.svg"
                                        alt=""
                                    />
                                </div>
                            )}
                            onClick={() => {
                                importToken();
                            }}
                            title=""
                        />
                        <CopyToClipboard text={networks[chainId].synth}>
                            <div className={styles.copyWrapper}>
                                <img
                                    className={styles.metamaskBtnImg}
                                    src="./images/copy.svg"
                                    alt="Copy synth address"
                                />
                            </div>
                        </CopyToClipboard>
                    </div>
                )}
                <div className={styles.gradientBtnWrapper}>
                    <GradientButton
                        onClick={() => {
                            handleClose();
                        }}
                        title="Ok"
                    />
                </div>
            </div>

        </div>
    );
};

export default SuccessModalContent;
