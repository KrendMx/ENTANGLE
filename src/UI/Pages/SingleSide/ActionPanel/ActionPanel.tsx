import React from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'src/UI/ui-kit/Input';
import Select, { Option } from 'src/UI/ui-kit/Select';
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
    return (
        <div className={styles.wrapper}>
            <div className={styles.searchWrapper}>
                <Input
                    placeholder={`${t('search')} name`}
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
                    customClassName={styles.cutomClassName}
                >
                    <Option value="">Network</Option>
                    <Option value="Network">Network</Option>
                </Select>
                <Select
                    onChange={setTimeStatus}
                    value={timeStatus}
                    customClassName={styles.cutomClassName}
                >
                    <Option value="">All</Option>
                    {timaStatusValues.map((el, i) => (
                        <Option value={el} key={i}>{`${el} days`}</Option>
                    ))}
                </Select>
            </div>
        </div>
    );
};
