import React from 'react';
import classNames from 'classnames';
import styles from './style.module.css';

const Loader = () => (
    <div className={classNames(styles.loader, styles.loader1)}>
        <div className={classNames(styles.loaderOutter)} />
        <div className={classNames(styles.loaderInner)} />
    </div>
);

export default Loader;
