import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { networks } from '../../../src/utils/GlobalConst';
import { useAppDispatch, useAppSelector } from '../../../Redux/store/hooks/redux';
import type { availableChains } from '../../../src/utils/GlobalConst';

import styles from './style.module.css';
import { changeNetwork } from '../../../Redux/store/reducers/ActionCreators';

const ChangeNetwork = () => {
    const [openList] = useState(false);
    const { chainId, provider } = useAppSelector((state) => state.walletReducer);
    const dispatch = useAppDispatch();

    const handleClick = (chainIdEl: availableChains) => dispatch(changeNetwork({ chainId: chainIdEl, provider }));

    return (
        <div className={styles.wrapper}>
            {networks[chainId]?.icon ? (
                <div className={styles.selected}>
                    {networks[chainId]?.title}
                    <Image
                        src={`/images/networks/${networks[chainId]?.icon}`}
                        width={32}
                        height={32}
                        quality={100}
                        alt=""
                    />
                </div>
            ) : (
                <div className={styles.selected}>
                    {networks['43114']?.title}
                    <Image src="/images/networks/avalanche.svg" width={32} height={32} quality={100} alt="" />
                </div>
            )}

            <div
                className={classNames(styles.list, {
                    [styles.openList]: openList,
                })}
            >
                {(Object.keys(networks) as Array<keyof typeof networks>)
                    .sort((a, b) => networks[a].order - networks[b].order)
                    .map((chainIdEl: availableChains) => (
                        <div
                            className={styles.network}
                            onClick={() => handleClick(chainIdEl)}
                            key={chainIdEl}
                        >
                            <p>{networks[chainIdEl].title}</p>
                            <Image
                                src={`/images/networks/${networks[chainIdEl].icon}`}
                                width={20}
                                height={20}
                                quality={100}
                                alt=""
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ChangeNetwork;
