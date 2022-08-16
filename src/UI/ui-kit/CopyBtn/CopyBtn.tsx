import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import classNames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './styles.module.css';

type CopyBtnProps = {
    onCopy?: () => any;
    wrapperClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
    text: string;
    width?: number;
    height?: number;
};

const CopyBtn: React.FC<CopyBtnProps> = React.memo(({
    onCopy = () => {},
    text,
    wrapperClassName,
    width,
    height,
}) => {
    const [wasBeCopied, setWasBeCopied] = useState<boolean>(false);
    const [wasSaw, setWasSaw] = useState<boolean>(false);

    const { t } = useTranslation('index');

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
                    {t('copy')}
                </div>
                <div
                    className={classNames(styles.upHover, {
                        [styles.showUpHover]: wasBeCopied,
                        [styles.hideUpHover]: !wasBeCopied,
                    })}
                >
                    {t('copied')}
                </div>
                <Image
                    width={width || 18}
                    height={height || 18}
                    className={styles.img}
                    quality={100}
                    src="/images/copy.svg"
                    alt="Copy synth address"
                />
            </div>
        </CopyToClipboard>
    );
});

export default CopyBtn;
