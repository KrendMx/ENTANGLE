import React from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'UI/ui-kit/Input';
import Select, { Option } from 'UI/ui-kit/Select';
import type { IActionPanelProps } from './ActionPanel.interfaces';
import styles from './style.module.css';

export const ActionPanel: React.FC<IActionPanelProps> = (props) => {
    const {
        search,
        network,
        timeStatus,
        setNetwork,
        setSearch,
        setTimeStatus,
    } = props;

    const hangleChangeSearch = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(target.value);
    };

    const timaStatusValues: string[] = ['10', '30', '90'];

    const { t } = useTranslation('index');
    const { t: tSsas } = useTranslation('ssas');
    return (
        <div className={styles.wrapper}>
            <div className={styles.searchWrapper}>
                <Input
                    wrapperCustomClassName={styles.customInput}
                    placeholder={`${t('search')} ${tSsas('name')}`}
                    onChange={hangleChangeSearch}
                    value={search}
                    type="text"
                />
            </div>
            <div className={styles.filterWrapper}>
                <Select
                    onChange={setNetwork}
                    value={network}
                    disabled
                    isCenter
                >
                    <Option value="">{tSsas('Network')}</Option>
                    <Option value="Network">{tSsas('Network')}</Option>
                </Select>
                <Select
                    onChange={setTimeStatus}
                    value={timeStatus}
                    isCenter
                >
                    <Option value="">{tSsas('all')}</Option>
                    {timaStatusValues.map((el, i) => (
                        <Option value={el} key={i}>
                            {`${el} ${tSsas(
                                'days',
                            )}`}

                        </Option>
                    ))}
                </Select>
            </div>
        </div>
    );
};
