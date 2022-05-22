import React from 'react';
import styles from './style.module.css';
import Select, { Option } from '../../ui-kit/Select';
import Input from '../../ui-kit/Input';
import type { IActionProps } from './ActionPanel.interfaces';

const ActionPanel: React.FC<IActionProps> = ({
    search, filter, setFilter, setSearch,
}) => {
    const handleChangeFilter = (value: string) => setFilter(value);
    const handleChangeSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        (/^[A-Za-z]{0,}$/.test(target.value) ? setSearch(target.value) : undefined);

    return (
        <div className={styles.wrapper}>
            <div className={styles.filterWrapper}>
                <Select value={filter} onChange={handleChangeFilter}>
                    <Option value=""> Filter by</Option>
                    <Option value="43114">Avalanche</Option>
                    <Option value="250">Fantom</Option>
                    <Option value="56">Binance</Option>
                    <Option value="1">Ethereum</Option>
                </Select>
            </div>
            <div className={styles.searchWrapper}>
                <Input
                    placeholder="Search"
                    onChange={handleChangeSearch}
                    value={search}
                    type="text"
                >
                    <button type="submit">
                        <img
                            className={styles.searchIcon}
                            src="./images/searchIcon.svg"
                            alt=""
                        />
                    </button>
                </Input>
            </div>
        </div>
    );
};

export default ActionPanel;
