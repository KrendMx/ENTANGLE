import type { availableChains, availableNames } from 'utils/Global/Types';
import { networks } from 'utils/Global/Vars';
import type { ICardUnit, CardValues } from 'UI/Components/Profile.Components/InvestCard/InvestCard.interfaces';

const CardsOrder = {
    'Price increase': (a: CardValues, b: CardValues) => (Number(a.price) < Number(b.price) ? 1 : -1),
    'Price decrease': (a: CardValues, b: CardValues) => (Number(a.price) < Number(b.price) ? -1 : 1),
    'Profit increase': (a: CardValues, b: CardValues) => (Number(a.profit) < Number(b.profit) ? 1 : -1),
    'Profit decrease': (a: CardValues, b: CardValues) => (Number(a.profit) < Number(b.profit) ? -1 : 1),
};

const generateInitState = (balances) => {
    const res: ICardUnit[] = [];
    const names = Object.keys(balances);
    for (const name of names) {
        const chains = Object.keys(balances[name]);
        for (const chain of chains) {
            if (balances[name][chain].positions > 0) {
                res.push({
                    chainId: (chain as availableChains),
                    description: networks[chain].description,
                    positions: balances[name][chain].positions,
                    price: balances[name][chain].price,
                    bgGradient: networks[chain].bgGradient,
                    cardType: 'Synthetic-LP',
                    cardTypeLabelColor: networks[chain].cardTypeLabelColor,
                    cardTypeLabelBg: networks[chain].cardTypeLabelBg,
                    currencyName: (name as availableNames),
                });
            }
        }
    }
    return res;
};

export { CardsOrder, generateInitState };
