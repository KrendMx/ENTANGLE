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
                        <Image
                            width={32}
                            height={32}
                            className={styles.BtnImg}
                            quality={100}
                            src={`/images/connectors/${i}.svg`}
                            alt=""
                        />
                        <div className={styles.BtnText}>
                            {WalletProviderNames[i]}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default SelectWalletModalContent;
