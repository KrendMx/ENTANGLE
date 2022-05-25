import React from 'react';
import Image from 'next/image';

import classNames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import type { SuccessModalProps } from './SuccessModal.interface';

import styles from './style.module.css';
import GradientButton from '@/ui-kit/GradientButton';
import { networks, synths } from '@/src/utils/GlobalConst';
import { useAppSelector, useAppDispatch } from '@/src/Redux/store/hooks/redux';
import { importToken } from '@/src/Redux/store/reducers/ActionCreators';

const SuccessModalContent: React.FC<SuccessModalProps> = ({
    transactionInfo,
    handleClose,
}) => {
    const dispatch = useAppDispatch();
    const { chainId, provider } = useAppSelector((state) => state.walletReducer);
    const directionText = `You ${transactionInfo.isReceived ? 'received' : 'spent'}:`;
    return (
        <div className={styles.wrapper}>
            <div className={styles.closeWrapper}>
                <Image
                    width={20}
                    height={20}
                    className={styles.closeImg}
                    onClick={handleClose}
                    quality={100}
                    src="/images/close.svg"
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
                                    <Image
                                        width={30}
                                        height={30}
                                        className={styles.metamaskBtnImg}
                                        quality={100}
                                        src="/images/connectors/MetaMask.svg"
                                        alt=""
                                    />
                                </div>
                            )}
                            onClick={() => {
                                const synthAddress = synths[chainId][sessionStorage.getItem('card')];
                                dispatch(importToken({ chainId, synthAddress, provider }));
                            }}
                            title=""
                        />
                        <CopyToClipboard text={networks[chainId].synth}>
                            <div className={styles.copyWrapper}>
                                <Image
                                    width={30}
                                    height={30}
                                    className={styles.metamaskBtnImg}
                                    quality={100}
                                    src="/images/copy.svg"
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
