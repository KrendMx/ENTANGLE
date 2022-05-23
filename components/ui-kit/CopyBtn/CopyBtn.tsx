import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './styles.module.css';

type CopyBtnProps = {
    onCopy?: () => any;
    wrapperClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    text: string;
};

const CopyBtn: React.FC<CopyBtnProps> = ({
    onCopy = () => {},
    text,
    wrapperClassName,
}) => {
    const [wasBeCopied, setWasBeCopied] = useState<boolean>(false);
    const [wasSaw, setWasSaw] = useState<boolean>(false);

    useEffect(() => {
        if (wasBeCopied) {
            setWasSaw(false);
            const timer = setTimeout(() => setWasBeCopied(false), 3000);
            return () => {
                clearTimeout(timer);
            };
        }
        return () => {};
    }, [wasBeCopied]);

    return (
        <CopyToClipboard
            onCopy={() => {
                setWasBeCopied(true);
                onCopy();
            }}
            text={text}
        >
            <div
                className={classNames(wrapperClassName, styles.copyWrapper)}
                onMouseEnter={() => {
                    setWasSaw(true);
                }}
                onMouseLeave={() => {
                    setWasSaw(false);
                    setWasBeCopied(false);
                }}
            >
                <div
                    className={classNames(styles.upHover, {
                        [styles.showUpHover]: wasSaw,
                        [styles.hideUpHover]: !wasSaw,
                    })}
                >
                    Copy token adress
                </div>
                <div
                    className={classNames(styles.upHover, {
                        [styles.showUpHover]: wasBeCopied,
                        [styles.hideUpHover]: !wasBeCopied,
                    })}
                >
                    Token address copied
                </div>
                <Image
                    width={18}
                    height={18}
                    className={styles.img}
                    quality={100}
                    src="/images/copy.svg"
                    alt="Copy synth address"
                />
            </div>
        </CopyToClipboard>
    );
};

export default CopyBtn;
