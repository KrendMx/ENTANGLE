import type { ChangeEvent } from 'react';
import React, { useMemo, useReducer } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import TokenSelect, { TokenOption } from 'UI/ui-kit/TokenSelect';
import GradientButton from 'UI/ui-kit/GradientButton';
import Input from 'UI/ui-kit/Input';
import { ethers } from 'ethers';

import Tabs from 'UI/ui-kit/Tabs';
import Typography from 'UI/ui-kit/Typography';
import MiniButton from 'UI/ui-kit/MiniButton';
import { Arrow } from 'src/UI/ui-kit/Arrow';
import TextGroup from 'src/UI/ui-kit/TextGrop';
import type { ILockState } from '../Tabs.interfaces';
import styles from '../style.module.css';

const Lock: React.FC<{validators: string[]}> = ({ validators }) => {
    const [state, dispatch] = useReducer(
        (oldState: ILockState, newState: Partial<ILockState>) => ({
            ...oldState,
            ...newState,
        }),
        {
            network: '',
            activeValidator: '',
            usdcAmount: '',
            lockPeriod: 0,
            apr: '25',
            apr24: '92',
            activeButtonRepay: '',
        },
    );

    const miniButtons = ['25%', '50%', '100%'] as const;

    const { t } = useTranslation('stable');
    const { t: tEnt } = useTranslation('entangle');

    const inputChangeHandler = ({
        target,
    }: ChangeEvent<HTMLInputElement>): void => {
        if (target.value === '' && state.usdcAmount.length === 1) {
            dispatch({ usdcAmount: '' });
            return;
        }
        if (/^[1-9]\d*(\.\d+)?$/.test(target.value)) {
            dispatch({ usdcAmount: target.value });
        }
    };

    return (
        <div
            className={styles.wrapper}
        >
            <div className={classNames(styles.actionCard)}>
                <div>
                    <TokenSelect
                        defaultLabel={`${tEnt('SelectValidator')}`}
                        value={state.activeValidator}
                        onChange={(value: string) =>
                            dispatch({ activeValidator: value })}
                        title={`${tEnt('SelectValidator')}`}
                        withBalance={false}
                        showHashImage
                        showPayModal={false}
                        selectedTitle="title"
                        showImage={false}
                        customSelectedLabel={state.activeValidator}
                    >
                        {validators.map((el, idx) => (
                            <TokenOption value={el} key={idx} isImage={false} isHashImage>
                                {el}
                            </TokenOption>
                        ))}
                    </TokenSelect>
                </div>
                <div>
                    <TextGroup
                        title={`${tEnt('ENTGLapr')}`}
                        value="25%"
                        hintText="Test"
                        customClassNameTitle={styles.textTitle}
                        customClassNameValue={styles.textValue}
                    />
                    <TextGroup
                        title={tEnt('YourShare')}
                        value="0.11%"
                        customClassNameWrapper={styles.mgt}
                        customClassNameTitle={styles.textTitle}
                        customClassNameValue={styles.textValue}
                    />
                </div>
            </div>
            <div className={classNames(styles.actionCard)}>
                <Arrow />
                <div>
                    <div className={classNames(styles.mgb)}>
                        <Typography type="textBody">
                            {`${tEnt('StakeEntangleTokens')}`}
                        </Typography>
                    </div>
                    <Input
                        type="number"
                        min="0"
                        value={state.usdcAmount}
                        placeholder={`${t('enterAmount')}`}
                        onChange={inputChangeHandler}
                    />
                    <div className={styles.miniButtonsGroup}>
                        {miniButtons.map((el, idx) => (
                            <MiniButton
                                key={idx}
                                title={el}
                                clickHandler={() => {}}
                                active={el === state.activeButtonRepay}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.helper}>
                    <GradientButton
                        isWhite
                        title={`${tEnt('Stake')}`}
                        onClick={() => {}}
                    />
                </div>
            </div>
        </div>
    );
};

export default Lock;
