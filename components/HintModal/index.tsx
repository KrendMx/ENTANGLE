/* eslint-disable jsx-a11y/alt-text */
import React, { Children, useState } from 'react';
import Image from 'next/image';
import styles from './style.module.css';

type Props = {
    children: JSX.Element,
  };

const HintModal: React.FC<Props> = (props) => {
    const { children } = props;
    const [vis, setVis] = useState<boolean>(false);

    return (
        <div className={styles.modal}>
            <div>
                <div
                    onMouseEnter={() => { setVis(true); }}
                    onMouseLeave={() => { setVis(false); }}
                    className={styles.addImgWrapper}
                >
                    <Image
                        src="/images/question.svg"
                        width={14}
                        height={14}
                        quality={100}
                        alt=""
                    />
                    {vis ? (
                        <div className={styles.textBlock}>
                            {children}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default HintModal;
