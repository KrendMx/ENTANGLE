import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './style.module.css';

type TextGroupStakeProps = {
    title: string;
    value: string;
    hintText?: string;
};

const TextGroupStake: React.FC<TextGroupStakeProps> = ({
    title,
    value,
    hintText,
}) => (
    <div className={classNames(styles.formItem, styles.shareText)}>
        <div className={styles.iBlock}>
            <p>{title}</p>
            {hintText && (
                <Image
                    src="/images/i.svg"
                    width={13}
                    height={13}
                    quality={100}
                    alt="extra"
                />
            )}
        </div>
        <p>{value}</p>
    </div>
);

export default TextGroupStake;
