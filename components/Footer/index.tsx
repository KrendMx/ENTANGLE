import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './style.module.css';

const Footer = () => {
  const navigate = [
    {
      title: 'HOME',
      to: '/',
    },
    {
      title: 'ABOUT',
      to: '/about',
    },
    {
      title: 'BLOG',
      to: '/blog',
    },
    {
      title: 'WHITEPAPPER',
      to: '/whitepapper',
    },
    {
      title: 'CONTACT',
      to: '/contact',
    },
  ];
  const socials = [
    {
      icon: './images/socialNetworks/telegram.svg',
      to: '/',
    },
    {
      icon: './images/socialNetworks/twitter.svg',
      to: '/',
    },
    {
      icon: './images/socialNetworks/discord.svg',
      to: '/',
    },
  ];

  return (
      <footer className={styles.wrapper}>
          <div className={styles.content}>
              <Link href="/">
                  <span className={styles.logo}>
                      <img src="./images/logo.svg" alt="" />
                  </span>
              </Link>
              <nav className={styles.navigate}>
                  {navigate.map(({ title, to }, key) => (
                      <Link key={key} href={to}>
                          <span className={classNames(styles.link)}>
                              {title}
                          </span>
                      </Link>
                  ))}
              </nav>
              <div className={styles.connection}>
                  {socials.map(({ to, icon }, key) => (
                      <a key={key} href={to} target="_blank" rel="noreferrer">
                          <img src={icon} alt="" />
                      </a>
                  ))}
              </div>
          </div>
          <p className={styles.product}>
              2022. Entangle. All rights reserved
          </p>
      </footer>
  );
};

export default Footer;
