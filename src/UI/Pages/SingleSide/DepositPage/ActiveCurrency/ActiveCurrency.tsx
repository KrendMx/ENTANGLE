import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { availableSingleSideNetworks } from 'src/utils/Global/Vars';
import styles from './style.module.css';
import type { IAssetsSelectorProps } from './ActiveCurrency.interfaces';

export const ActiveCurrency: React.FC<IAssetsSelectorProps> = (props) => {
    const { assets, activeAsset, changeActiveAssets } = props;
    return (
        <div
            className={styles.wrapper}
            style={
                {
                    '--assets-count': assets.filter((el) => el).length,
                } as React.CSSProperties
            }
        >
            {assets
                .filter((el) => el)
                .map((el, i) => (
                    <div
                        key={i}
                        className={classNames(styles.card, {
                            [styles.active]: activeAsset.includes(el),
                        })}
                        onClick={() => {
                            changeActiveAssets(el);
                        }}
                        style={
                            activeAsset.includes(el)
                                ? {
                                    backgroundImage: `linear-gradient(90deg, 
                                        ${availableSingleSideNetworks[el].mainColor} 30%, rgba(15, 19, 12, 0.05) 100%)`,
                                }
                                : null
                        }
                    >
                        <span>
                            <Image
                                src={availableSingleSideNetworks[el].mainIcon}
                                alt=""
                                quality={100}
                                width={40}
                                height={40}
                            />
                            <span>
                                <p>Name</p>
                                <p>{availableSingleSideNetworks[el].abbr}</p>
                            </span>
                        </span>
                    </div>
                ))}
        </div>
    );
};
