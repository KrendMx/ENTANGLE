import React, { Children } from 'react';
import classNames from 'classnames';
import { CurrencyLabel } from 'src/UI/Components/SASS.Components/CurrencyLabel';
import type { InfoBlockProps } from './InfoBlock.interfaces';
import { InfoBlockTypes, numberFormatter } from './InfoBlock.constants';

import styles from './style.module.css';
import HintModal from '../HintModal';

const InfoBlock: React.FC<InfoBlockProps> = React.memo(
    ({
        value, type, info, isCurrencyLabel = false, customFilling = false, ...props
    }: InfoBlockProps) => {
        let valueText: string | React.ReactElement = String(value);
        let additionalClass = {};
        let additionalBottomBlock = null;
        let additionalBottomBlockClass = null;
        const additionalValuePrefixBLock = null;

        if (value !== null) {
            switch (type) {
            case InfoBlockTypes.DAYS: {
                valueText = `${value} Days`;
                break;
            }
            case InfoBlockTypes.MONEY: {
                valueText = `$${numberFormatter(value, 4)}`;
                break;
            }
            case InfoBlockTypes.ABOUT_MONEY: {
                valueText = `~$${numberFormatter(value, 4)}`;
                break;
            }
            case InfoBlockTypes.SIMPLE_PERCENTAGE: {
                valueText = `${numberFormatter(value, 4)}%`;
                break;
            }
            case InfoBlockTypes.ABOUT: {
                valueText = `~${numberFormatter(value, 4)}`;
                break;
            }
            case InfoBlockTypes.SIMPLE_TEXT: {
                break;
            }
            case InfoBlockTypes.DIVIDED_NUMBER: {
                const resValue = value
                    .toString()
                    .split('')
                    .reverse()
                    .map((el, i) => {
                        if ((i + 1) % 3 === 0) {
                            return `'${el}`;
                        }
                        return el;
                    })
                    .reverse()
                    .join('');
                valueText = resValue[0] !== '\'' ? resValue : resValue.slice(1);
                break;
            }
            case InfoBlockTypes.BALANCE: {
                valueText = `$${Number(value).toFixed(4)}`;

                const {
                    options: { changeValue = 0, changePeriod = '24h' } = {},
                } = props;
                const sign = changeValue > 0 ? '+' : '-';
                additionalBottomBlockClass = {
                    [styles.blockValueGood]: changeValue > 0,
                    [styles.blockValueBad]: changeValue < 0,
                };
                additionalBottomBlock = (
                    <div className={styles.horisontalWrapper}>
                        <div
                            className={classNames(
                                additionalBottomBlockClass,
                            )}
                        >
                            {`${sign}$${Number(
                                Math.abs(changeValue),
                            ).toFixed(4)}`}
                        </div>
                        <div className={styles.bordered}>
                            {changePeriod}
                        </div>
                    </div>
                );
                break;
            }
            case InfoBlockTypes.PERCENTAGE_MIXED: {
                const sign = value > 0 ? '+' : '';
                additionalClass = {
                    [styles.blockValueGood]: value > 0,
                    [styles.blockValueBad]: value < 0,
                };
                const { options: { changeValue = 0, image = null } = {} } = props;
                const signChange = changeValue > 0 ? '+' : '-';
                additionalBottomBlockClass = {
                    [styles.blockValueGood]: changeValue > 0,
                    [styles.blockValueBad]: changeValue < 0,
                };
                additionalBottomBlock = (
                    <div className={styles.horisontalWrapper}>
                        <div
                            className={classNames(
                                additionalBottomBlockClass,
                            )}
                        />
                    </div>
                );
                valueText = (
                    <div className={styles.linedValue}>
                        {image && (
                            <div className={styles.smallImg}>{image}</div>
                        )}
                        <div style={{ color: '#fff' }}>
                            {`${sign}${value?.toFixed(4)}%`}
                        </div>
                    </div>
                );
                break;
            }
            case InfoBlockTypes.PERCENTAGE: {
                const sign = value > 0 ? '+' : '';
                additionalClass = {
                    [styles.blockValueGood]: value > 0,
                    [styles.blockValueBad]: value < 0,
                };
                valueText = `${sign}${value.toFixed(4)}%`;
                break;
            }
            default: {
                throw new Error('Unexpected block info type');
            }
            }
        } else {
            valueText = '~';
        }

        return (
            <div
                className={classNames(
                    styles.blockWrapper,
                    props?.customWrapperClassName,
                )}
            >
                <div className={styles.gradientContainer}>
                    <div className={styles.gradient} />
                </div>
                {customFilling ? props?.children
                    : (
                        <>
                            <div
                                className={classNames(
                                    styles.blockInfo,
                                    props?.customTitleClassName,
                                )}
                            >
                                {props?.hintText && (
                                    <HintModal>
                                        <p>{props?.hintText}</p>
                                    </HintModal>
                                )}
                                {info}
                            </div>
                            <div
                                className={classNames(
                                    styles.blockValue,
                                    additionalClass,
                                    props?.customValueClassName,
                                )}
                            >
                                {isCurrencyLabel ? <CurrencyLabel {...props?.currencyProps} />
                                    : (
                                        <>
                                            {additionalValuePrefixBLock}
                                            {valueText}
                                        </>
                                    )}
                            </div>

                        </>
                    )}
            </div>
        );
    },
);

export default InfoBlock;
