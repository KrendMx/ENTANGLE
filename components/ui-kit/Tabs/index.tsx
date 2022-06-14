import React from 'react';
import classNames from 'classnames';
import styles from './style.module.css';

type ITabs = {
    activeTab: number;
    switchHandler: (idx: number) => void;
    buttons: string[];
    customClassTabName?: React.HTMLAttributes<HTMLDivElement>['className'];
    customClassButtonName?: React.HTMLAttributes<HTMLDivElement>['className'];
};

const Tabs: React.FC<ITabs> = ({
    switchHandler,
    activeTab,
    buttons,
    ...props
}) => (
    <div
        className={classNames(styles.tabsBg, {
            [props?.customClassTabName]: props?.customClassTabName,
        })}
    >
        <div className={styles.tabsWrapper}>
            {buttons.map((title, idx) => (
                <div
                    key={title}
                    onClick={() => switchHandler(idx)}
                    className={classNames(styles.tabWrapper, {
                        [styles.active]: idx === activeTab,
                        [props?.customClassButtonName]: props?.customClassButtonName && idx === activeTab,
                    })}
                >
                    <p className={styles.tab}>{title}</p>
                </div>
            ))}
        </div>
    </div>
);
export default Tabs;
