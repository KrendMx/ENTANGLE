import React, { useState } from 'react';
import styles from './style.module.css';
import Select, { Option } from '../../ui-kit/Select';
import Input from '../../ui-kit/Input';

const ActionPanel = () => {
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');

    const handleChangeFilter = (value: string) => setFilter(value);
    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    return (
        <div className={styles.wrapper}>
            <div className={styles.filterWrapper}>
                <Select value={filter} onChange={handleChangeFilter}>
                    <Option value=""> Filter by</Option>
                    <Option value="l1">L1-Chain</Option>
                </Select>
            </div>
            <div className={styles.searchWrapper}>
                <Input
                    placeholder="Search"
                    onChange={handleChangeSearch}
                    value={search}
                    type="text"
                >
                    <img
                        className={styles.searchIcon}
                        src="./images/searchIcon.svg"
                        alt=""
                    />
                </Input>
            </div>
        </div>
    );
};

export default ActionPanel;
