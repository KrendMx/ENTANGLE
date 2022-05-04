import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { networks } from '../../../src/utils/GlobalConst';
import { setChainId } from '../../../Redux/store/reducers/WalletSlice';

import styles from './style.module.css';
import { useAppSelector } from '../../../Redux/store/hooks/redux';
import type { ChainIdType } from '../../../Redux/types';

const ChangeNetwork = () => {
    const [openList, setOpenList] = useState(false);
    const { provider, chainId } = useAppSelector((state) => state.walletReducer);

    useEffect(() => {
    }, []);

    const handleClick = (chainIdEl: ChainIdType) => {
        setChainId({ chainId: chainIdEl, provider });
        console.log({ chainId: chainIdEl, provider });
    };

    return (
        <div className={styles.wrapper}>
            {networks[chainId]?.icon ? (
                <div className={styles.selected}>
                    {networks[chainId]?.title}
                    <img
                        src={`./images/networks/${networks[chainId]?.icon}`}
                        alt=""
                    />
                </div>
            ) : (
                <div className={styles.selected}>
                    {networks['250']?.title}
                    <img src="./images/networks/fantom.svg" alt="" />
                </div>
            )}

            <div
                className={classNames(styles.list, {
                    [styles.openList]: openList,
                })}
            >
                {(Object.keys(networks) as Array<keyof typeof networks>).map(
                    (chainIdEl: keyof typeof networks) => (
                        <div
                            className={styles.network}
                            onClick={() => handleClick(chainIdEl)}
                            key={chainIdEl}
                        >
                            <p>{networks[chainIdEl].title}</p>
                            <img
                                src={`./images/networks/${networks[chainIdEl].icon}`}
                                alt=""
                            />
                        </div>
                    ),
                )}
            </div>
        </div>
    );
};

export default ChangeNetwork;
