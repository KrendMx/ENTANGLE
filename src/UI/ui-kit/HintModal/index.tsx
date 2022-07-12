/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './style.module.css';

type Props = {
    children: JSX.Element,
  };

const HintModal: React.FC<Props> = ({ children }) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className={styles.modal}>
            <div>
                <div
                    onMouseEnter={() => { setVisible(true); }}
                    onMouseLeave={() => { setVisible(false); }}
                    className={styles.tooltip}
                >
                    {visible ? (
                        <div
                            className={styles.tooltiptext}
                        >
                            {children}
                        </div>
                    ) : null}
                    <Image
                        src="/images/i.svg"
                        width={15}
                        height={15}
                        quality={100}
                        alt=""
                    />

                </div>
            </div>
        </div>
    );
};

export default HintModal;
