import React from 'react';
import classNames from 'classnames';
import styles from './style.module.css';

type TabsProps = {
    activeTab: number;
    isBlack?: boolean;
    switchHandler: (idx: number) => void;
    buttons: string[];
    customClassTabName?: React.HTMLAttributes<HTMLDivElement>['className'];
    customClassButtonName?: React.HTMLAttributes<HTMLDivElement>['className'];
};

const Tabs: React.FC<TabsProps> = ({
    switchHandler,
    activeTab,
    buttons,
    isBlack = false,
    ...props
}) => (
    <div
        className={classNames(styles.tabsBg, {
            [props?.customClassTabName]: props?.customClassTabName,
            [styles.blackTabBg]: isBlack,
        })}
    >
        <div className={styles.tabsWrapper}>
            {buttons.map((title, idx) => (
                <div
                    key={title}
                    onClick={() => switchHandler(idx)}
                    className={classNames(styles.tabWrapper, {
                        [isBlack ? styles.activeBlack : styles.active]: idx === activeTab,
                        [props?.customClassButtonName]: props?.customClassButtonName && idx === activeTab,

                    })}
                >
                    <p className={isBlack ? styles.blackTab : styles.tab}>{title}</p>
                </div>
            ))}
        </div>
    </div>
);
export default Tabs;
