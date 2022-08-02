import React, { useState } from 'react';
import Image from 'next/image';
import { availableChainsArray, networks, WalletProviderNames } from 'utils/Global/Vars';
import type { availableChains } from 'utils/Global/Types';
import GradientButton from 'UI/ui-kit/GradientButton';
import classNames from 'classnames';
import type { SelectWalletProps } from './WrongNetModal.interface';

import styles from './style.module.css';

const WrongNetModalContent: React.FC<SelectWalletProps> = ({
    selectChain,
    handleClose,
}) => {
    const chains = ['250', '43114', '56'];
    const [selectedChain, setSelectedChain] = useState<string | null>(null);
    return (
        <div className={styles.wrapper}>
            <div className={styles.closeWrapper}>
                <Image
                    width={18}
                    height={18}
                    className={styles.closeImg}
                    onClick={handleClose}
                    quality={100}
                    src="/images/close.svg"
                    alt="closeImg"
                />
            </div>
            <div className={styles.header}>
                <h1 className={styles.headerText}>
                    You&apos;re connected
                    <br />
                    to the wrong network
                </h1>
            </div>
            <div className={styles.additionalText}>
                <p>Please select an available network</p>
            </div>
            <div className={styles.content}>
                {chains.map((i, key) => (
                    <div
                        key={key}
                        className={classNames(styles.walletElement, {
                            [styles.selected]: selectedChain === i,
                        })}
                        onClick={() => setSelectedChain(i)}
                    >
                        <div className={styles.item}>
                            <p className={styles.name}>{networks[i].title}</p>
                            <div className={styles.logo}>
                                <Image
                                    width={24}
                                    height={24}
                                    className={styles.BtnImg}
                                    quality={100}
                                    src={selectedChain === i
                                        ? '/images/checkAsset.svg'
                                        : `/images/alternativeAssets/${networks[i].abbr}.svg`}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.buttonContainer}>
                <GradientButton
                    title="Switch Network"
                    onClick={() => {
                        if (selectedChain) {
                            selectChain(selectedChain as availableChains);
                            handleClose();
                        }
                    }}
                    isWhite
                />
            </div>
        </div>
    );
};

export default WrongNetModalContent;
