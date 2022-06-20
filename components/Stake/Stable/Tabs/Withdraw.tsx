import React, { useReducer } from "react";
import Image from 'next/image';
import classNames from "classnames";
import styles from './style.module.css'

import type {IWithdrawState, WithdrawProps} from './Tabs.interfaces';
import GradientButton from "@/ui-kit/GradientButton";
import Input from "@/ui-kit/Input";
import SyntSelect from "@/ui-kit/SynteticSelector";

const Withdraw: React.FC<WithdrawProps> = ({ token }) => {
    const [state, dispatch] = useReducer(
        (oldState: IWithdrawState, newState: Partial<IWithdrawState>) => ({
            ...oldState,
            ...newState,
        }),
        {
            network: '',
            usdcAmount: '',
            getUsdc: '',
        },
    );
    return (
        <>
        <div
            className={styles.wrapper}
            style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
        >
            <div className={classNames(styles.actionCard)}>
                <div>
                    <p
                        className={classNames(
                            styles.sectionTitle,
                            styles.white,
                        )}
                    >
                        Enter amount of enUSD
                    </p>
                    <SyntSelect
                        currenc={state.network}
                        handleChange={() => {}}
                        currencSymbol="EnUSD"
                    />
                </div>
                <div>
                    <p
                        className={classNames(
                            styles.sectionTitle,
                            styles.white,
                        )}
                    >
                        Repay EnUSD Amount
                    </p>
                    <Input
                        type="number"
                        placeholder="Enter amount of EnUSD"
                        onChange={() => {}}
                    />
                </div>
            </div>
            <div className={classNames(styles.actionCard)}>
                <div className={styles.arrow}>
                    <Image
                        src="/images/Arrow.svg"
                        width={100}
                        height={100}
                        quality={100}
                        alt="arrow-icon"
                    />
                </div>
                <div>
                    <p
                        className={classNames(
                            styles.sectionTitle,
                            styles.white,
                        )}
                    >
                        Unlocked Synth-LP
                    </p>

                    <Input type="number" placeholder="Unlocked Synth-LP" onChange={() => {}} />
                </div>
            </div>
        </div>
        <div className={styles.helper}>
            <GradientButton title="Withdraw" onClick={() => {}} />
        </div>
    </>
    )
}

export default Withdraw;