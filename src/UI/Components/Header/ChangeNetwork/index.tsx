import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { networks } from 'utils/Global/Vars';
import { useDispatch } from 'react-redux';
import { useStore } from 'core/store';
import type { availableChains } from 'utils/Global/Types';

import styles from './style.module.css';

const ChangeNetwork = () => {
    const [openList] = useState(false);

    const { store, actions, asyncActions } = useStore((store) => ({
        CardEntity: store.CardsEntity,
        WalletEntity: store.WalletEntity,
    }));
    const dispatch = useDispatch();

    const { chainId, provider } = store.WalletEntity;
    const { setDefaultCardData } = actions.Card;
    const { changeNetwork } = asyncActions.Wallet;

    const handleClick = (chainIdEl: availableChains) => {
        dispatch(setDefaultCardData());
        dispatch(changeNetwork({ chainId: chainIdEl, provider }));
    };

    return (
        <div className={styles.wrapper}>
            {chainId in networks ? (
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
                    Undefined Chain
                    <i
                        className="fa fa-question-circle fa-2x"
                        aria-hidden="true"
                        style={{ color: '#fff', marginRight: '.3rem' }}
                    />
                </div>
            )}

            <div
                className={classNames(styles.list, {
                    [styles.openList]: openList,
                })}
            >
                {(Object.keys(networks) as Array<keyof typeof networks>)
                    .filter((el) => el !== '1')
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
