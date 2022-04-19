import React from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './styles.module.css';

type PreloaderProps = {
  isVisible: boolean,
  timeout?: number,
}

const Preloader: React.FC<PreloaderProps> = ({ isVisible, timeout = 1000 }) => (
    <CSSTransition
        in={isVisible}
        timeout={timeout}
        unmountOnExit
        classNames={{ exit: styles.preloaderExitActive }}
    >
        <div className={styles.preloader}>
            <img src="./images/logo.svg" alt="Logo" />
        </div>
    </CSSTransition>
);

export default Preloader;
