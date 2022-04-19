import React from 'react';

import type { ErrorModalProps } from './ErrorModal.interfaces';
import { MetamaskErrorUserMessages } from './ErrorModal.constants';

import styles from './style.module.css';

const ErrorModalContent: React.FC<ErrorModalProps> = ({ error, handleClose }) => {
  const errorText = Object.keys(MetamaskErrorUserMessages).includes(String(error.code)) ? MetamaskErrorUserMessages[error.code] : 'Something went wrong.';
  return (
      <div className={styles.wrapper}>
          <div className={styles.closeWrapper}>
              <img
                  className={styles.closeImg}
                  onClick={handleClose}
                  src="./images/close.svg"
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
