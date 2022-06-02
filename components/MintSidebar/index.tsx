import React, { ForwardedRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useAppSelector } from '@/src/Redux/store/hooks/redux';
import styles from './style.module.css';
import GradientButton from '../ui-kit/GradientButton';
import Input from '../ui-kit/Input';

type PropTypes = {
    parentRef: any;
};

const Sidebar: React.FC<PropTypes> = ({ parentRef }) => {
    const { activeCard } = useAppSelector((state) => state.appReducer);

    const [activeTab, setActiveTab] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>();

    const handleChangeValue = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(target.value);
    };

    const buttons = ['Mint', 'Burn'];

    return (
        <div ref={parentRef} className={styles.sidebarContainer}>
            <div
                className={`${
                    !activeCard ? styles.sidebarClose : styles.sidebar
                } ${styles.sidebarOpening}`}
            >
                <div className={styles.wrapper}>
                    <div className={styles.topBg}>
                        <div
                            className={styles.bg}
                            style={{ background: activeCard?.bgGradient }}
                        />
                    </div>
                    <div className={styles.top}>
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
                    <p className={styles.sectionTitle}>Current Projected APR</p>
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
                                168’000 Synth LP
                            </p>
                        ) : null}
                    </div>
                </div>
                <div className={styles.tabsBg}>
                    <div className={styles.tabsWrapper}>
                        {buttons.map((title, idx) => (
                            <div
                                key={title}
                                onClick={() => setActiveTab(idx)}
                                className={classNames(styles.tabWrapper, {
                                    [styles.active]: idx === activeTab,
                                })}
                            >
                                <p className={styles.tab}>{title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.searchWrapper}>
                        <Input
                            placeholder="Enter SynthLP"
                            onChange={handleChangeValue}
                            value={inputValue}
                            type="number"
                        >
                            <button type="submit">
                                <p className={styles.submitText}>max</p>
                            </button>
                        </Input>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.valueCurrency}>
                        <p className={`${styles.white} ${styles.sectionTitle}`}>
                            Exchange rate
                        </p>
                        <p className={`${styles.white} ${styles.sectionTitle}`}>
                            1 SynthLP
                            <br />
                            <span
                                className={`${styles.subsidiaryText} ${styles.lightGray}`}
                            >
                                {' '}
                                = 1&apos;356 USDT
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
                            1&apos;376 USDT
                            <br />
                            <span
                                className={`${styles.subsidiaryText} ${styles.lightGray}`}
                            >
                                {' '}
                                =1&apos;376 USDC
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
        </div>
    );
};

// eslint-disable-next-line react/display-name
const SidebarRow = React.forwardRef((_props: any, ref) => (
    <Sidebar parentRef={ref} />
));

export default SidebarRow;
