import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';

import { useAppSelector } from '@/src/Redux/store/hooks/redux';
import styles from './style.module.css';
import GradientButton from '@/ui-kit/GradientButton/index';
import Input from '@/ui-kit/Input/index';
import Tabs from '@/ui-kit/Tabs/index';

type SidebarProps = {
    handleClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ handleClose }) => {
    const { activeCard } = useAppSelector((state) => state.appReducer);

    const [activeTab, setActiveTab] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>();
    const [exchangeRateSynt, setExchangeRateSynt] = useState<number>(1);
    const [exchangeRateInUSDT, setExchangeRateInUSDT] = useState<number>(1.376);
    const [exchangeRateInUSDC, setExchangeRateInUSDC] = useState<number>(1.376);
    const [synthBalance, setSynthBalance] = useState<number | string>(
        '168\'000',
    );

    const buttons = ['Mint', 'Burn'];

    const modal = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClick = (e: MouseEvent) =>
            modal.current && !modal.current.contains((e.target as Node)) && handleClose();

        window.addEventListener('mousedown', handleClick);

        return () => window.removeEventListener('mousedown', handleClick);
    }, []);

    const handleChangeValue = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(target.value);
    };

    return (
        <CSSTransition
            in={!!activeCard}
            timeout={100}
            unmountOnExit
            classNames={{
                enter: styles.sidebarEnter,
                enterActive: styles.sidebarEnterActive,
                exit: styles.sidebarExit,
                exitActive: styles.sidebarExitActive,
            }}
        >

            <div className={styles.sidebar} ref={modal}>
                <div className={styles.wrapper}>
                    <div className={styles.topBg}>
                        <div
                            className={styles.bg}
                            style={{ background: activeCard?.bgGradient }}
                        />
                    </div>
                    <div className={styles.top}>
                        <button className={styles.closeButtonMobile} onClick={() => { handleClose(); }}>
                            <Image
                                src="/images/close.svg"
                                quality={100}
                                alt=""
                                width={20}
                                height={20}
                            />
                        </button>
                        <div className={styles.logo}>
                            <Image
                                width={60}
                                height={60}
                                quality={100}
                                src={`/images/networks/${activeCard?.icon}`}
                                alt=""
                            />
                        </div>
                        <p className={styles.title}>Synthetic-LP</p>
                    </div>
                    <div className={styles.heading}>
                        {activeCard?.heading}
                        <div className={styles.addImgWrapper}>
                            <Image
                                src="/images/i.svg"
                                width={16}
                                height={16}
                                quality={100}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <p className={styles.sectionTitle}>
                        Current Projected APR
                    </p>
                    <div className={styles.sectionRow}>
                        {activeCard?.apr ? (
                            <p className={styles.sectionValue}>
                                {activeCard?.apr}
                            </p>
                        ) : null}
                    </div>
                </div>
                <div className={styles.section}>
                    <p className={styles.sectionTitle}>Synth Balance</p>
                    <div className={styles.sectionRow}>
                        {activeCard?.apr ? (
                            <p className={styles.sectionValue}>
                                {`${synthBalance} Synth LP`}
                            </p>
                        ) : null}
                    </div>
                </div>
                <div className={styles.section}>
                    <Tabs
                        buttons={buttons}
                        activeTab={activeTab}
                        switchHandler={(idx: number) => setActiveTab(idx)}
                    />
                </div>
                <div className={styles.section}>
                    <div className={styles.searchWrapper}>
                        <Input
                            placeholder="Enter SynthLP"
                            onChange={handleChangeValue}
                            value={inputValue}
                            type="number"
                            getMax={() => {}}
                        />
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.valueCurrency}>
                        <p
                            className={`${styles.white} ${styles.sectionTitle}`}
                        >
                            Exchange rate
                        </p>
                        <p
                            className={`${styles.white} ${styles.sectionTitle}`}
                        >
                            {`${exchangeRateSynt} SynthLP`}
                            <br />
                            <span
                                className={`${styles.subsidiaryText} ${styles.lightGray}`}
                            >
                                {`=${exchangeRateInUSDT} USDT`}
                            </span>
                        </p>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.valueCurrency}>
                        <p
                            className={`${styles.white} ${styles.sectionTitle} ${styles.textRight}`}
                        >
                            Exchange rate
                        </p>
                        <p
                            className={`${styles.white} ${styles.sectionTitle}  ${styles.textRight}`}
                        >
                            {`${exchangeRateInUSDT} USDT`}
                            <br />
                            <span
                                className={`${styles.subsidiaryText} ${styles.lightGray}`}
                            >
                                {`=${exchangeRateInUSDC} USDC`}
                            </span>
                        </p>
                    </div>
                </div>
                <div className={styles.section}>
                    <GradientButton
                        title={buttons[activeTab]}
                        onClick={() => {}}
                    />
                </div>
            </div>
        </CSSTransition>
    );
};

// eslint-disable-next-line react/display-name

export default Sidebar;
