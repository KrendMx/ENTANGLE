import type { availableChains, availableNames } from 'utils/Global/Types';
import { networks } from 'utils/Global/Vars';
import type {
    ICardUnit,
    CardValues,
    balances,
} from 'UI/Components/Profile.Components/InvestCard/InvestCard.interfaces';

const CardsOrder = {
    'Price increase': (a: CardValues, b: CardValues) =>
        (Number(a.price) < Number(b.price) ? 1 : -1),
    'Price decrease': (a: CardValues, b: CardValues) =>
        (Number(a.price) < Number(b.price) ? -1 : 1),
    'Profit increase': (a: CardValues, b: CardValues) =>
        (Number(a.profit) < Number(b.profit) ? 1 : -1),
    'Profit decrease': (a: CardValues, b: CardValues) =>
        (Number(a.profit) < Number(b.profit) ? -1 : 1),
};

function detectedChainId(chainName: string): availableChains {
    for (const key in networks) {
        if (networks[key].abbr === chainName) {
            return key as availableChains;
        }
    }
}

const generateInitState = (balances: balances) => {
    const res: ICardUnit[] = [];
    for (const name in balances) {
        for (const chain in balances[name]) {
            if (balances[name][chain].positions > 0) {
                res.push({
                    chainId: chain as availableChains,
                    description: networks[chain].description,
                    positions: balances[name][chain].positions,
                    price: balances[name][chain].price,
                    bgGradient: networks[detectedChainId(name)].bgGradient,
                    cardType: 'Synthetic-LP',
                    cardTypeLabelColor:
                        networks[detectedChainId(name)].cardTypeLabelColor,
                    cardTypeLabelBg:
                        networks[detectedChainId(name)].cardTypeLabelBg,
                    currencyName: name as availableNames,
                });
            }
        }
    }
    return res;
};

export { CardsOrder, generateInitState };
