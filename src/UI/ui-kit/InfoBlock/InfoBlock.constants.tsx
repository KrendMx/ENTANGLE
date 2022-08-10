const enum InfoBlockTypes {
    MONEY,
    PERCENTAGE,
    BALANCE,
    PERCENTAGE_MIXED,
    ABOUT_MONEY,
    SIMPLE_PERCENTAGE,
    ABOUT,
}

/**
 * Format numbers && add postfix letter
 * @function
 * @param {number} num - unformatted number
 * @param {number} digits - digits count after point delimiter
 */
function numberFormatter(num: number, digits: number = 2) {
    const item = [
        { value: 1e9, symbol: 'B' },
        { value: 1e6, symbol: 'M' },
        { value: 1e3, symbol: 'K' },
        { value: 1, symbol: '' },
    ].find((i) => num >= i.value);
    return item ? (num / item.value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + item.symbol : '0';
}

export { InfoBlockTypes, numberFormatter };
