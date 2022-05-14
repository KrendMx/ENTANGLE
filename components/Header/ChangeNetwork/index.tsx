import React, { useState } from 'react';
import classNames from 'classnames';

import { networks } from '../../../src/utils/GlobalConst';
import { useAppDispatch, useAppSelector } from '../../../Redux/store/hooks/redux';
import type { availableChains } from '../../../src/utils/GlobalConst';

import styles from './style.module.css';
import { changeNetwork } from '../../../Redux/store/reducers/ActionCreators';

const ChangeNetwork = () => {
    const [openList, setOpenList] = useState(false);
    const { chainId } = useAppSelector((state) => state.walletReducer);
    const dispatch = useAppDispatch();

    const handleClick = (chainIdEl: availableChains) => dispatch(changeNetwork(chainIdEl));

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
                {(Object.keys(networks) as Array<keyof typeof networks>)
                    .sort((a, b) => networks[a].order - networks[b].order)
                    .map((chainIdEl: availableChains) => (
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
                    ))}
            </div>
        </div>
    );
};

export default ChangeNetwork;
