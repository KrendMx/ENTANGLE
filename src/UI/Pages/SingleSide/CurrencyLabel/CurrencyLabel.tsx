import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import type { availableSingleSideChains } from 'src/utils/Global/Types';
import { availableSingleSideNetworks } from 'src/utils/Global/Vars';
import styles from './style.module.css';

type ICurrencyLabelProps = {
    chainId: availableSingleSideChains;
    value: string;
    isImage?: boolean;
};

export const CurrencyLabel: React.FC<ICurrencyLabelProps> = ({
    chainId,
    value,
    isImage = true,
}) => (
    <div className={styles.wrapper}>
        {isImage ? (
            <Image
                src={availableSingleSideNetworks[chainId].mainIcon}
                height={32}
                width={32}
                quality={100}
                alt=""
            />
        ) : null}
        {value === 'awaiting' ? (
            <p
                className={classNames(styles.awaitingTitle, {
                    [styles.padding]: isImage,
                })}
            >
                Awaiting Deposit
            </p>
        ) : (
            <p
                className={classNames({
                    [styles.padding]: isImage,
                })}
            >
                {`${value} ${availableSingleSideNetworks[chainId].abbr}`}

            </p>
        )}
    </div>
);
