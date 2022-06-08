import React from 'react';
import styles from './style.module.css';
import Select, { Option } from '@/ui-kit/Select/index';
import Input from '@/ui-kit/Input';
import type { IActionProps } from './ActionPanel.interfaces';
import { networks, sortVar } from '@/src/utils/GlobalConst';

const ActionPanel: React.FC<IActionProps> = ({
    search,
    filter,
    sort,
    setFilter,
    setSearch,
    setSort,
}) => {
    const handleChangeFilter = (value: string) => setFilter(value);
    const handleChangeSort = (value: string) => setSort(value);
    const handleChangeSearch = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) =>
        (/^[A-Za-z]{0,}$/.test(target.value)
            ? setSearch(target.value)
            : undefined);

    return (
        <div className={styles.wrapper}>
            <div className={styles.filterWrapper}>
                <Select value={filter} onChange={handleChangeFilter}>
                    <Option value=""> Filter by</Option>
                    {Object.keys(networks).map((el, key: number) => (
                        <Option value={el} key={key}>{networks[el].title}</Option>
                    ))}
                </Select>
            </div>
            <div className={styles.filterWrapper}>
                <Select value={sort} onChange={handleChangeSort}>
                    <Option value="">Sort by</Option>
                    {sortVar.map((el, key: number) => (
                        <>
                            <Option value={el} key={key}>{el}</Option>
                            <Option value={`${el} desk`} key={key}>
                                {`${el} Desk`}
                            </Option>
                        </>
                    ))}
                </Select>
            </div>
            <div className={styles.searchWrapper}>
                <Input
                    placeholder="Search"
                    onChange={handleChangeSearch}
                    value={search}
                    type="text"
                />
            </div>
        </div>
    );
};

export default ActionPanel;
