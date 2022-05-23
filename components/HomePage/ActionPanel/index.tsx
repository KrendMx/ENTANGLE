import React from 'react';
import Image from 'next/image';
import styles from './style.module.css';
import Select, { Option } from '@/ui-kit/Select';
import Input from '@/ui-kit/Input';
import type { IActionProps } from './ActionPanel.interfaces';
import { networks } from '@/src/utils/GlobalConst';

const ActionPanel: React.FC<IActionProps> = ({
    search,
    filter,
    setFilter,
    setSearch,
}) => {
    const handleChangeFilter = (value: string) => setFilter(value);
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
            <div className={styles.searchWrapper}>
                <Input
                    placeholder="Search"
                    onChange={handleChangeSearch}
                    value={search}
                    type="text"
                >
                    <button type="submit">
                        <Image
                            width={23}
                            height={23}
                            quality={100}
                            className={styles.searchIcon}
                            src="/images/searchIcon.svg"
                            alt=""
                        />
                    </button>
                </Input>
            </div>
        </div>
    );
};

export default ActionPanel;
