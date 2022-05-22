import React from 'react';
import Image from 'next/image';

import type { ErrorModalProps } from './ErrorModal.interfaces';
import { MetamaskErrorUserMessages } from './ErrorModal.constants';

import styles from './style.module.css';

const ErrorModalContent: React.FC<ErrorModalProps> = ({
    error,
    handleClose,
}) => {
    const errorText = Object.keys(MetamaskErrorUserMessages).includes(
        String(error.code),
    )
        ? MetamaskErrorUserMessages[error.code]
        : 'Something went wrong.';
    return (
        <div className={styles.wrapper}>
            <div className={styles.closeWrapper}>
                <Image
                    width={20}
                    height={20}
                    className={styles.closeImg}
                    onClick={handleClose}
                    quality={100}
                    src="/images/close.svg"
                    alt="closeImg"
                />
            </div>
            <div className={styles.errorText}>
                Sorry.
                {' '}
                {errorText}
            </div>
        </div>
    );
};

export default ErrorModalContent;
