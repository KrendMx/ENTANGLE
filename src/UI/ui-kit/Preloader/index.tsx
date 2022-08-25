import React from 'react';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';

import styles from './styles.module.css';

type PreloaderProps = {
  isVisible: boolean,
  timeout?: number,
}

const Preloader: React.FC<PreloaderProps> = React.memo(({ isVisible, timeout = 1000 }) => (
    <CSSTransition
        in={isVisible}
        timeout={timeout}
        unmountOnExit
        classNames={{ exit: styles.preloaderExitActive }}
    >
        <div className={styles.preloader}>
            <div className={styles.background} />
            <Image width={205} height={50} quality={100} src="/images/logo.svg" alt="Logo" />
        </div>
    </CSSTransition>
));

export default Preloader;
