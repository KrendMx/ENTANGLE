import React from 'react';
import classNames from 'classnames';
import type { InfoBlockProps } from './InfoBlock.interfaces';
import { InfoBlockTypes, numberFormatter } from './InfoBlock.constants';

import styles from './style.module.css';

const InfoBlock: React.FC<InfoBlockProps> = ({
    value,
    type,
    info,
    ...props
}: InfoBlockProps) => {
    let valueText: string | React.ReactElement = String(value);
    let additionalClass = {};
    let additionalBottomBlock = null;
    let additionalBottomBlockClass = null;
    const additionalValuePrefixBLock = null;

    if (value !== null) {
        switch (type) {
        case InfoBlockTypes.MONEY: {
            valueText = `$${numberFormatter(value, 4)}`;
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
                        className={classNames(additionalBottomBlockClass)}
                    >
                        {`${sign}$${Number(Math.abs(changeValue)).toFixed(
                            4,
                        )}`}

                    </div>
                    <div className={styles.bordered}>{changePeriod}</div>
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
                        className={classNames(additionalBottomBlockClass)}
                    />
                </div>
            );
            valueText = (
                <div className={styles.linedValue}>
                    {image && (
                        <div className={styles.smallImg}>{image}</div>
                    )}
                    <div>{`${sign}${value.toFixed(4)}%`}</div>
                    <div className={styles.smallText}>
                        (
                        {signChange}
                        $
                        {Number(Math.abs(changeValue)).toFixed(4)}
                        )
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
        <div className={styles.blockWrapper}>
            <div className={styles.blockInfo}>{info}</div>
            <div className={classNames(styles.blockValue, additionalClass)}>
                {additionalValuePrefixBLock}
                {valueText}
            </div>
            {additionalBottomBlock}
        </div>
    );
};

export default InfoBlock;
