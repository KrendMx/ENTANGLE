import type { ChangeEvent } from 'react';
import React, { useReducer, useMemo } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import GradientButton from 'UI/ui-kit/GradientButton';
import Input from 'UI/ui-kit/Input';
import TokenSelect, { TokenOption } from 'UI/ui-kit/TokenSelect';
import { networks } from 'utils/Global/Vars';
import Typography from 'UI/ui-kit/Typography';
import MiniButton from 'UI/ui-kit/MiniButton';
import { Arrow } from 'src/UI/ui-kit/Arrow';
import TextGroup from 'src/UI/ui-kit/TextGrop';
import type { IWithdrawState, WithdrawProps } from '../Tabs.interfaces';
import styles from '../style.module.css';

const Withdraw: React.FC<{validators: string[]}> = ({ validators }) => {
    const [state, dispatch] = useReducer(
        (oldState: IWithdrawState, newState: Partial<IWithdrawState>) => ({
            ...oldState,
            ...newState,
        }),
        {
            network: '',
            usdcAmount: '',
            getUsdc: '',
            activeValidator: '',
            activeButtonRepay: '',
        },
    );

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
    const miniButtons = ['25%', '50%', '100%'];

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
                        showPayModal={false}
                        showImage={false}
                        showHashImage
                        customSelectedLabel={state.activeValidator}
                        selectedTitle="title"
                    >
                        {validators.map((el, idx) => (
                            <TokenOption value={el} key={idx} isImage={false} isHashImage>
                                {el}
                            </TokenOption>
                        ))}
                    </TokenSelect>
                </div>
                <div className={classNames(styles.mgt)}>
                    <TextGroup
                        title={tEnt('AvaiableForWithdraw')}
                        value="-"
                        hintText="Test text"
                        customClassNameWrapper={styles.mgt2}
                        customClassNameTitle={styles.textTitle}
                        customClassNameValue={styles.textValue}
                    />
                    <TextGroup
                        title={tEnt('YourShare')}
                        value="0.011%"
                        customClassNameWrapper={classNames(styles.mgt2, styles.disabled)}
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
                            {tEnt('Withdraw Entangle Tokens')}
                        </Typography>
                    </div>
                    <Input
                        type="cut"
                        placeholder={tEnt('EnterAmount')}
                        onChange={() => {}}
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
                <div className={classNames(styles.helper)}>
                    <GradientButton
                        title={t('withdraw')}
                        onClick={() => {}}
                        isWhite
                    />
                </div>
            </div>
        </div>
    );
};

export default Withdraw;
