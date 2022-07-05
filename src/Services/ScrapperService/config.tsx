const SCRAPPER_CONFIG = {
    'BSC': {
        url: 'https://pancakeswap.finance/farms',
        path: 'div[id="table-container"]/div[1]/table/tbody/tr/td[4]/div/div/div[2]/div/div',
    },
    'FTM': {
        url: 'https://app.spiritswap.finance/#/farms/allfarms',
        path: '*[@id="wrapper"]/div/div[14]/div[3]/div/div[2]',
    },
    'ETH': {
        url: 'https://curve.fi/pools',
        path: 'a[href="/saave"] > td:nth-child(2) > div.base-apr > span > span:nth-child(1)',
    },
    'AVAX': {
        url: 'https://traderjoexyz.com/home#/',
        path: '*[@id="root"]/div/div[2]/div[4]/div[1]/div[1]/div[3]/div[2]',
    },
} as const;

export default SCRAPPER_CONFIG;
