import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import ScrollLock from 'react-scrolllock';
import styles from './styles.module.css';
import Dropout from './Dropout';
import { ProviderContext } from '../../context/ProviderContext';
import ChangeNetwork from './ChangeNetwork';
import { MenuBtn } from './MenuBtn/MenuBtn';

const Header = () => {
  const { account, setWallet, removeWallet } = useContext(ProviderContext);

  const connect = () => account || setWallet('MetaMask');
  const disconnect = () => removeWallet();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const wallet = localStorage.getItem('wallet');
    if (wallet) {
      connect();
    }
  });

  const networkBtns = (
      <div
          className={classNames(styles.dashboard, styles.networkBtnsWrapper)}
      >
          <ChangeNetwork />
          {!account ? (
              <div
                  onClick={connect}
                  className={classNames(
                    styles.dashboardItem,
                    styles.connectButton,
                  )}
              >
                  Connect Wallet
              </div>
          ) : (
              <Dropout
                  title={
                        account
                          ? `${account.slice(0, 4)}...${account.slice(-4)}`
                          : 'Connect Wallet'
                    }
                  wrapperClassName={classNames(
                    styles.dashboardItem,
                    styles.justifyCenter,
                  )}
                  wrapperListClassName={styles.dashboardList}
                  wrapperTextClassName={styles.connectButtonText}
                  wrapperPickerClassName={styles.connectButtonPicker}
              >
                  <>
                      <Link href="/profile">
                          <div className={styles.linkBtn}>
                              <div>Profile</div>
                              <img src="./images/person.svg" alt="" />
                          </div>
                      </Link>
                      <div className={styles.linkBtn} onClick={disconnect}>
                          <div>Disconnect</div>
                          <img src="./images/logout.svg" alt="" />
                      </div>
                  </>
              </Dropout>
          )}
      </div>
  );
  const langSwitcher = (
      <Dropout
          title="ENG"
          wrapperListClassName={styles.langList}
          arrowImg={<img src="./images/arrowIconSmallWhite.svg" alt="" />}
      >
          <p>ENG</p>
      </Dropout>
  );
  return (
      <>
          <header
              className={classNames(styles.header, {
                [styles.isOpen]: isOpen,
                [styles.isClose]: !isOpen,
              })}
          >
              <div className="container">
                  <div className={styles.wrapper}>
                      <div className={styles.menuHeaderWrapper}>
                          {/* @ts-ignore */}
                          <Link href="/" className={styles.logo}>
                              <img src="./images/logo.svg" alt="" />
                          </Link>
                      </div>
                      <div
                          className={classNames(styles.menuWrapper, {
                            [styles.isOpen]: isOpen,
                            [styles.isClose]: !isOpen,
                          })}
                      >
                          <div className={styles.selectorsWrapper}>
                              <Dropout
                                  title="Synthetic LP Vaults"
                                  wrapperClassName={classNames(
                                    styles.heading,
                                    styles.syntheticSelect,
                                  )}
                              >
                                  <>
                                      <Link href="/">
                                          <p className={styles.dropItem}>
                                              Buy & Sell Synth-LP
                                          </p>
                                      </Link>
                                      <p>
                                          Mint & Burn Synth-LP
                                          <span className={styles.soonText}>
                                              (soon)
                                          </span>
                                      </p>
                                  </>
                              </Dropout>
                              <nav
                                  className={classNames(
                                    styles.navigate,
                                    styles.directionColumn,
                                  )}
                              >
                                  <Dropout title="enUSD">
                                      <>
                                          <p>
                                              Mint enUSD
                                              <span className={styles.soonText}>
                                                  (soon)
                                              </span>
                                          </p>
                                          <p>
                                              Burn enUSD
                                              <span className={styles.soonText}>
                                                  (soon)
                                              </span>
                                          </p>
                                      </>
                                  </Dropout>
                                  <Dropout title="STAKE">
                                      <>
                                          <p>
                                              Entangle
                                              <span className={styles.soonText}>
                                                  (soon)
                                              </span>
                                          </p>
                                          <p>
                                              Stablecoins
                                              <span className={styles.soonText}>
                                                  (soon)
                                              </span>
                                          </p>
                                      </>
                                  </Dropout>
                              </nav>
                              {networkBtns}
                              <div
                                  className={classNames(
                                    styles.mdBlock,
                                    styles.hidden,
                                    styles.alignStart,
                                  )}
                              >
                                  {langSwitcher}
                              </div>
                          </div>
                      </div>
                      <div className={styles.rightSideMenuWrappper}>
                          {networkBtns}
                          <div
                              className={classNames(
                                styles.mdHidden,
                                styles.block,
                              )}
                          >
                              {langSwitcher}
                          </div>
                          <div className={styles.menuBtnWrapper}>
                              <MenuBtn
                                  onOpen={() => {
                                    setIsOpen(true);
                                  }}
                                  onClose={() => {
                                    setIsOpen(false);
                                  }}
                              />
                          </div>
                      </div>
                  </div>
              </div>
          </header>
          <div className={styles.headerHeight} />
          {isOpen && (
          <ScrollLock>
              <div />
          </ScrollLock>
          )}
      </>
  );
};

export default Header;
