import classNames from 'classnames';
import React from 'react';
import styles from './style.module.css';

type MiniButtonProps = {
    title: string;
    active: boolean;
    clickHandler: () => void;
};

const MiniButton: React.FC<MiniButtonProps> = React.memo(({ title, clickHandler, active }) => (
    <button
        type="button"
        onClick={clickHandler}
        className={classNames(styles.miniButton, {
            [styles.active]: active,
        })}
    >
        <div className={styles.container}>{title}</div>
    </button>
));

export default MiniButton;
