import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { VALIDATOR_DATA, STAKE_DATE } from './Entangle.conts';

import Tabs from '@/ui-kit/Tabs';
import Input from '@/ui-kit/Input';
import ValidatorBar from './ValidatorBar';
import GradientButton from '@/components/ui-kit/GradientButton';
import MiniButton from '@/ui-kit/MiniButton/index';
import Select, { Option } from '@/ui-kit/Select/index';
import GlowLine from '@/ui-kit/GlowLine';
import Typography from '@/ui-kit/Typography';
import StakeTextArea from '@/ui-kit/StakeTextArea/index';

import styles from './style.module.css';

const EntangleStacking: React.FC = () => {
    const [amount, setAmount] = useState<string>();
    const [activeTab, setActiveTab] = useState(0);
    const [stakeDate, setStakeDate] = useState<string>('no lock');
    const [dropValue, setDropValue] = useState<string>('alpha');

    const handleChangeValidatorDrop = (value: string) => setDropValue(value);

    const getMax = () => setAmount('100');

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.description}>
                    <Typography type="title">Entangle Staking</Typography>
                    <GlowLine />
                    <p className={styles.descriptItem}>
                        Be part of securing the Entangle Framework by delegating
                        your Entangle Tokens to your Validator of choice.
                    </p>
                    <p className={styles.descriptItem}>
                        Receive an appreciation on Entangle Tokens & Governance
                        Rights in return and take part in deciding the future of
                        Entangle
                    </p>
                    <div className={styles.graphData}>
                        <div>
                            <div className={styles.graphText}>
                                <StakeTextArea title="Total EN Staked">
                                    13&apos;000&apos;000
                                </StakeTextArea>
                                <p className={styles.cur}>EN</p>
                            </div>
                            <Image
                                src="/images/fakeGraphs/ent-stake.svg"
                                width={250}
                                height={144}
                                quality={100}
                                alt="fake-graph"
                            />
                        </div>
                        <div className={styles.validatorData}>
                            <div className={styles.desItem}>
                                <StakeTextArea title="Active Validators">
                                    32
                                </StakeTextArea>
                            </div>
                            <div className={styles.desItem}>
                                <StakeTextArea title="AVG Validators Uptime">
                                    99.98%
                                </StakeTextArea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.stakeForm}>
                    <Tabs
                        switchHandler={(idx: number) => setActiveTab(idx)}
                        activeTab={activeTab}
                    />
                    <div className={styles.formItem}>
                        <Select
                            value={dropValue}
                            onChange={handleChangeValidatorDrop}
                        >
                            <Option value="alpha">Validator Alpha</Option>
                            <Option value="beta">Validator Beta</Option>
                        </Select>
                    </div>
                    <div
                        className={classNames(
                            styles.formItem,
                            styles.miniButtonsContainer,
                        )}
                    >
                        {STAKE_DATE.map((el, idx) => (
                            <MiniButton
                                title={el}
                                active={stakeDate === el}
                                clickHandler={() => setStakeDate(el)}
                                key={idx}
                            />
                        ))}
                    </div>
                    <Input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={({ target }) => setAmount(target.value)}
                        title="Stake Entangle Tokens"
                        getMax={getMax}
                    />
                    <div className={styles.formItem}>
                        <StakeTextArea title="ENT Stacking APR">
                            30%
                        </StakeTextArea>
                    </div>
                    <div
                        className={classNames(
                            styles.formItem,
                            styles.shareText,
                        )}
                    >
                        <p>Your share of Validator&apos;s pool</p>
                        <p>0.011%</p>
                    </div>
                    <GradientButton title="Stake Entangle" onClick={() => {}} />
                </div>
            </div>
            <div className={styles.validators}>
                {VALIDATOR_DATA.map((el, idx) => (
                    <ValidatorBar
                        key={idx}
                        title={el.name}
                        date={el.date}
                        delegated={el.delegated}
                    />
                ))}
            </div>
        </div>
    );
};

export default EntangleStacking;
