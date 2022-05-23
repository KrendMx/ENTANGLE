import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './style.module.css';
import { NAVIGATE, SOCIALS } from './Footer.constant';

const Footer = () => (
    <footer className={styles.wrapper}>
        <div className={styles.content}>
            <Link href="/" passHref>
                <span className={styles.logo}>
                    <Image width={205} height={38} quality={100} src="/images/logo.svg" alt="" />
                </span>
            </Link>
            <nav className={styles.navigate}>
                {NAVIGATE.map(({ title, to }, key) => (
                    <Link key={key} href={to} passHref>
                        <span className={classNames(styles.link)}>
                            {title}
                        </span>
                    </Link>
                ))}
            </nav>
            <div className={styles.connection}>
                {SOCIALS.map(({ to, icon }, key) => (
                    <a key={key} href={to} target="_blank" rel="noreferrer">
                        <Image width={20} height={20} quality={100} src={icon} alt="" />
                    </a>
                ))}
            </div>
        </div>
        <p className={styles.product}>
            2022. Entangle. All rights reserved
        </p>
    </footer>
);

export default Footer;
