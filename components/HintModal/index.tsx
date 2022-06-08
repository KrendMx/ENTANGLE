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
                    className={styles.addImgWrapper}
                >
                    <Image
                        src="/images/i.svg"
                        width={14}
                        height={14}
                        quality={100}
                        alt=""
                    />
                    {visible ? (
                        <div
                            className={styles.textBlock}
                        >
                            {children}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default HintModal;
