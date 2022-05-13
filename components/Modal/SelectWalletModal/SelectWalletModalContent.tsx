import React from 'react';
import Image from 'next/image';
import type { SelectWalletProps } from './SelectWalletModal.interface';

import styles from './style.module.css';
import { WalletProviderNames } from './SelectWalletModal.constants';

const SelectWalletModalContent: React.FC<SelectWalletProps> = ({
    selectWallet,
    handleClose,
}) => (
    <div className={styles.wrapper}>
        <div className={styles.closeWrapper}>
            <img
                className={styles.closeImg}
                onClick={handleClose}
                src="./images/close.svg"
                alt="closeImg"
            />
        </div>
        <div className={styles.errorText}>Select wallet connector.</div>
        <div className={styles.walletWrapper}>
            {Object.keys(WalletProviderNames).map((i) => (
                <div key={i}>
                    <div
                        className={styles.BtnWrapper}
                        onClick={() => {
                            selectWallet(i as keyof typeof WalletProviderNames);
                            handleClose();
                        }}
                    >
                        <img
                            className={styles.BtnImg}
                            src={`./images/connectors/${i}.svg`}
                            alt=""
                        />
                        <div className={styles.BtnText}>MetaMask</div>
                    </div>
                </div>
            ))}
            <div>
                <div className={styles.BtnWrapper}>
                    <img
                        className={styles.BtnImg}
                        src="./images/connectors/WalletConnect.svg"
                        alt=""
                    />
                    <div className={styles.BtnText}>WalletConnect</div>
                    <div className={styles.BtnText}>(soon)</div>
                </div>
            </div>
        </div>
    </div>
);

export default SelectWalletModalContent;
