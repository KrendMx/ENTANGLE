import React from 'react';
import classNames from 'classnames';
import styles from './style.module.css';

type PagerProps = {
    selectedPage: number;
    pageCount: number;
    onPageChange: (page: number) => any;
};
const Pager: React.FC<PagerProps> = ({
    selectedPage,
    pageCount,
    onPageChange,
}) => {
    const maxPagesCount = 5;
    const cantForward = selectedPage === pageCount;
    const cantBackward = selectedPage === 1;
    const shift = 2;
    const selectPage = (n: number) => {
        onPageChange(n);
    };
    const dots = (
        <div className={styles.block}>
            <div>...</div>
        </div>
    );
    const middleLength = pageCount - shift <= pageCount ? pageCount - shift : pageCount;

    const aroundShift = Math.floor(maxPagesCount / 2);

    let counts = pageCount !== 1
        && Array.from({ length: middleLength }, (_, i) => (
            <div
                onClick={() => {
                    selectPage(i + shift);
                }}
                className={classNames(styles.block, {
                    [styles.selected]: i + shift === selectedPage,
                })}
                key={i}
            >
                <div>{i + shift}</div>
            </div>
        ));

    let isLeftDot = false;
    let isRightDot = false;
    if (counts) {
        if (selectedPage - shift - aroundShift > 0) {
            counts = counts.slice(
                selectedPage - shift - aroundShift,
                selectedPage - shift - aroundShift + maxPagesCount,
            );
            isRightDot = selectedPage - shift - aroundShift + maxPagesCount + 2
                < pageCount;
            isLeftDot = selectedPage - shift - aroundShift > 0;
        } else {
            counts = counts.slice(0, maxPagesCount);
            isRightDot = maxPagesCount + shift < pageCount;
        }
    }
    const firstPage = (
        <div
            onClick={() => {
                selectPage(1);
            }}
            className={classNames(styles.block, {
                [styles.selected]: selectedPage === 1,
            })}
        >
            <div>1</div>
        </div>
    );

    const lastPage = pageCount !== 1 && (
        <div
            onClick={() => {
                selectPage(pageCount);
            }}
            className={classNames(styles.block, {
                [styles.selected]: selectedPage === pageCount,
            })}
        >
            <div>{pageCount}</div>
        </div>
    );

    return (
        <div className={styles.root}>
            <div
                onClick={
                    !cantBackward
                        ? () => {
                            selectPage(selectedPage - 1);
                        }
                        : undefined
                }
                className={classNames(styles.block, {
                    [styles.disabled]: cantBackward,
                })}
            >
                <div>&lt;</div>
            </div>
            {firstPage}
            {isLeftDot && dots}
            {counts}
            {isRightDot && dots}
            {lastPage}
            <div
                onClick={
                    !cantForward
                        ? () => {
                            selectPage(selectedPage + 1);
                        }
                        : undefined
                }
                className={classNames(styles.block, {
                    [styles.disabled]: cantForward,
                })}
            >
                <div>&gt;</div>
            </div>
        </div>
    );
};

export default Pager;
