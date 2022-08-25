/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';
import styles from './style.module.css';

type HintModalProps = {
    children: JSX.Element;
};

const HintModal: React.FC<HintModalProps> = React.memo(({ children }) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className={styles.modal}>
            <div>
                <div
                    onMouseEnter={() => {
                        setVisible(true);
                    }}
                    onMouseLeave={() => {
                        setVisible(false);
                    }}
                    className={styles.tooltip}
                >
                    <CSSTransition
                        in={visible}
                        timeout={300}
                        unmountOnExit
                        classNames={{
                            enter: styles['alert-enter'],
                            enterActive: styles['alert-enter-active'],
                            exit: styles['alert-exit'],
                            exitActive: styles['alert-exit-active'],
                        }}
                    >
                        <div className={styles.tooltiptext}>{children}</div>
                    </CSSTransition>
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
});

export default HintModal;
