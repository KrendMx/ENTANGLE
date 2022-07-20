/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import styles from './style.module.css';
import { NAVIGATE, SOCIALS } from './Footer.constant';

const Footer = () => {
    const { t } = useTranslation('footer');

    return (
        <footer className={styles.wrapper}>
            <div className={styles.content}>
                <Link href="/pages" passHref>
                    <span className={styles.logo}>
                        <Image
                            width={205}
                            height={38}
                            quality={100}
                            src="/images/logo.svg"
                            alt=""
                        />
                    </span>
                </Link>
                <nav className={styles.navigate}>
                    <span>
                        <Link passHref href="/">
                            <p className={styles.mainLink}>Synthetic Vaults</p>
                        </Link>
                    </span>
                    <span>
                        <p className={styles.mainLink}>EnUSD</p>
                        <Link passHref href="/borrow">
                            <p className={styles.addLink}>Borrow</p>
                        </Link>
                    </span>
                    <span>
                        <p className={styles.mainLink}>Stake</p>
                        <Link passHref href="/stake-entangle">
                            <p className={styles.addLink}>Entangle</p>
                        </Link>
                        <Link passHref href="/stake-stablecoin">
                            <p className={styles.addLink}>Stablecoin</p>
                        </Link>
                        <Link passHref href="/single-side-staking">
                            <p className={styles.addLink}>SSAS</p>
                        </Link>
                    </span>
                    <span>
                        <Link passHref href="https://docs.entangle.fi/">
                            <p className={styles.mainLink}>Whitepape</p>
                        </Link>
                    </span>
                </nav>
                <div className={styles.connection}>
                    {SOCIALS.map(({ to, icon }, key) => (
                        <a key={key} href={to} target="_blank" rel="noreferrer">
                            <Image
                                width={20}
                                height={20}
                                quality={100}
                                src={icon}
                                alt=""
                            />
                        </a>
                    ))}
                </div>
            </div>
            <p className={styles.product}>{`2022. Entangle. ${t('rule')}`}</p>
        </footer>
    );
};

export default Footer;
