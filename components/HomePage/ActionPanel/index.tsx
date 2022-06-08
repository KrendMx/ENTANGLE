import React from 'react';
import classNames from 'classnames';
import styles from './style.module.css';
import Select, { Option } from '@/ui-kit/Select/index';
import Input from '@/ui-kit/Input';
import type { IActionProps } from './ActionPanel.interfaces';
import { networks } from '@/src/utils/GlobalConst';
import { useAppSelector } from '@/src/Redux/store/hooks/redux';

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

    const sortVariable = [
        { stateName: 'APR', title: 'APR' },
        { stateName: 'staked', title: 'Value of LPs Staked' },
    ];
    const { sortingObject } = useAppSelector((state) => state.appReducer);

    return (
        <div className={styles.wrapper}>
            <div className={styles.filterWrapper}>
                <Select
                    value={filter}
                    onChange={handleChangeFilter}
                    customClassName={styles.filterWrapperSelect}
                >
                    <Option value=""> Filter by</Option>
                    {Object.keys(networks).map((el, key: number) => (
                        <Option value={el} key={key}>{networks[el].title}</Option>
                    ))}
                </Select>
                <Select
                    value={sort}
                    onChange={handleChangeSort}
                    customClassName={styles.filterWrapperSelect}
                    disabled={Object.keys(sortingObject).length < 5}
                >
                    <Option value="">Sort by</Option>
                    {sortVariable.map((el, key: number) => (
                        <Option
                            value={el.stateName}
                            key={key}
                            extraSymbol={(
                                <div
                                    className={
                                        classNames(
                                            styles.checkbox,
                                            el.stateName === sort ? styles.activeCheckbox : null,
                                        )
                                    }
                                />
                            )}
                        >
                            {el.title}

                        </Option>
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
