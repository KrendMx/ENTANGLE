import React from 'react';
import Image from 'next/image';

import classNames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import GradientButton from 'UI/ui-kit/GradientButton';
import { networks, synths } from 'utils/Global/Vars';
import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import styles from './style.module.css';
import type { SuccessModalProps } from './SuccessModal.interface';

const SuccessModalContent: React.FC<SuccessModalProps> = ({
    transactionInfo,
    handleClose,
}) => {
    const dispatch = useDispatch();
    const { store, asyncActions } = useStore((store) => ({
        WalletEntity: store.WalletEntity,
    }));

    const { chainId, provider } = store.WalletEntity;
    const { importToken } = asyncActions.Wallet;

    return (
        <div className={styles.wrapper}>
            <div className={styles.closeWrapper}>
                <div className={styles.imgWrapper}>
                    <Image
                        src="/images/modal/secured.svg"
                        width={230}
                        height={236}
                        quality={100}
                        alt="secured-icon"
                    />
                </div>
                <div className={styles.closeImgWrapper}>
                    <Image
                        width={16}
                        height={16}
                        className={styles.closeImg}
                        onClick={handleClose}
                        quality={100}
                        src="/images/close.svg"
                        alt="closeImg"
                    />
                </div>
            </div>
            <div className={styles.errorText}>Success transaction!</div>
            <div className={styles.valueTextWrapper}>
                <span className={styles.valueText}>
                    You will recieve
                    {' '}
                    {transactionInfo.value}
                    {' '}
                    {transactionInfo.symbol}
                </span>
            </div>
            <div className={styles.btnWrapper}>
                <div
                    className={classNames(
                        styles.gradientBtnWrapper,
                        styles.btnActionWrapper,
                        styles.flex1,
                    )}
                >
                    <GradientButton
                        titleElement={(
                            <div className={styles.metamaskBtnWrapper}>
                                <div className={styles.metamaskText}>Add to MetaMask</div>
                                <Image
                                    width={24}
                                    height={24}
                                    className={styles.metamaskBtnImg}
                                    quality={100}
                                    src="/images/connectors/MetaMask.svg"
                                    alt=""
                                />
                            </div>
                        )}
                        onClick={() => {
                            const synthAddress = synths[chainId][sessionStorage.getItem('card')];
                            dispatch(
                                importToken({
                                    synthAddress,
                                    provider,
                                }),
                            );
                        }}
                        title=""
                    />
                </div>
                <div className={styles.gradientBtnWrapper}>
                    <GradientButton
                        onClick={() => {
                            handleClose();
                        }}
                        title="Ok"
                        titleClass={styles.metamaskBtnWrapper}
                    />
                </div>
            </div>
        </div>
    );
};

export default SuccessModalContent;
