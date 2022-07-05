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
        <div className={styles.header}>
            <h1 className={styles.headerText}>Connect to a Wallet</h1>
            <div className={styles.closeWrapper}>
                <Image
                    width={14}
                    height={14}
                    className={styles.closeImg}
                    onClick={handleClose}
                    quality={100}
                    src="/images/close.svg"
                    alt="closeImg"
                />
            </div>
        </div>
        <div className={styles.content}>
            {Object.keys(WalletProviderNames).map((i, key) => (
                <div
                    key={key}
                    className={styles.walletElement}
                    onClick={() => {
                        selectWallet(i as keyof typeof WalletProviderNames);
                        handleClose();
                    }}
                >
                    <p className={styles.name}>{WalletProviderNames[i]}</p>
                    <div className={styles.logo}>
                        <Image
                            width={32}
                            height={32}
                            className={styles.BtnImg}
                            quality={100}
                            src={`/images/connectors/${i}.svg`}
                            alt=""
                        />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default SelectWalletModalContent;
