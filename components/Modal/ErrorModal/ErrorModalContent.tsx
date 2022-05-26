import React from 'react';
import Image from 'next/image';

import type { ErrorModalProps } from './ErrorModal.interfaces';
import { MetamaskErrorUserMessages } from './ErrorModal.constants';

import styles from './style.module.css';

const ErrorModalContent: React.FC<ErrorModalProps> = ({
    error,
    handleClose,
}) => (
    <div className={styles.wrapper}>
        <div className={styles.closeWrapper}>
            <Image
                width={15}
                height={15}
                className={styles.closeImg}
                onClick={handleClose}
                quality={100}
                src="/images/close.svg"
                alt="closeImg"
            />
        </div>
        <div className={styles.content}>
            <div className={styles.warning}>
                <Image
                    width={49}
                    height={49}
                    quality={100}
                    src="/images/warning.svg"
                    alt="warning"
                />
            </div>
            <div className={styles.errorText}>
                <h3>{MetamaskErrorUserMessages[error?.code]?.head || error?.head}</h3>
                <h5>{MetamaskErrorUserMessages[error?.code]?.message || error?.message}</h5>
            </div>
        </div>
    </div>
);

export default ErrorModalContent;
