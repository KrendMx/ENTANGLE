import React from 'react';
import classNames from 'classnames';
import styles from './style.module.css';

type ITabs = {
    activeTab: number;
    switchHandler: (idx: number) => void;
    buttons: string[];
}

const Tabs: React.FC<ITabs> = ({ switchHandler, activeTab, buttons }) => (
    <div className={styles.tabsBg}>
        <div className={styles.tabsWrapper}>
            {buttons.map((title, idx) => (
                <div
                    key={title}
                    onClick={() => switchHandler(idx)}
                    className={classNames(styles.tabWrapper, {
                        [styles.active]: idx === activeTab,
                    })}
                >
                    <p className={styles.tab}>{title}</p>
                </div>
            ))}
        </div>
    </div>
);
export default Tabs;
