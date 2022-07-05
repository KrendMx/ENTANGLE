import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
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
    const handleChangeFilter = (value: string) => {
        if (Object.prototype.hasOwnProperty.call(networks, value) || value === '') {
            setFilter(value);
        }
    };
    const handleChangeSort = (value: string) => {
        if (value === 'apr' || value === 'available' || value === '') {
            if (value === sort) {
                setSort(`${value} desk`);
            } else {
                setSort(value);
            }
        }
    };
    const handleChangeSearch = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) =>
        (/^[A-Za-z]{0,}$/.test(target.value)
            ? setSearch(target.value)
            : undefined);

    const sortVariable = [
        { stateName: 'apr', title: 'apr' },
        { stateName: 'available', title: 'valueLP' },
    ];
    const cardState = useAppSelector((state) => state.cardDataReducer);

    const isDisabled = ():boolean => {
        for (const key in cardState) {
            if (cardState[key].apr === null) {
                return true;
            }
        }
        return false;
    };

    const { t } = useTranslation('index');

    return (
        <div className={styles.wrapper}>
            <div className={styles.filterWrapper}>
                <Select
                    value={filter}
                    onChange={handleChangeFilter}
                    customClassName={styles.filterWrapperSelect}
                >
                    <Option value="">{t('sortBy')}</Option>
                    {Object.keys(networks).map((el, key: number) => (
                        <Option value={el} key={key}>{networks[el].title}</Option>
                    ))}
                </Select>
                <Select
                    value={sort}
                    onChange={handleChangeSort}
                    customClassName={styles.filterWrapperSelect}
                    disabled={isDisabled()}
                >
                    <Option value="">{t('filterBy')}</Option>
                    {sortVariable.map((el, key: number) => (
                        <Option
                            state={sort}
                            value={el.stateName}
                            key={key}
                            extraSymbol={(
                                <div style={{ padding: '0px 8px' }}>
                                    <Image
                                        alt=""
                                        quality={100}
                                        src="/images/selectArrowIcon.svg"
                                        width={10}
                                        height={10}
                                    />
                                </div>
                            )}
                        >
                            {t(el.title)}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className={styles.searchWrapper}>
                <Input
                    placeholder={t('search')}
                    onChange={handleChangeSearch}
                    value={search}
                    type="text"
                />
            </div>
        </div>
    );
};

export default ActionPanel;
