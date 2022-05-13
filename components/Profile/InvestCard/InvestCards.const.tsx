type CardValues = {
    price: string;
    profit: string;
}

const CardsOrder = {
    'Price increase': (a: CardValues, b: CardValues) => (Number(a.price) < Number(b.price) ? 1 : -1),
    'Price decrease': (a: CardValues, b: CardValues) => (Number(a.price) < Number(b.price) ? -1 : 1),
    'Profit increase': (a: CardValues, b: CardValues) => (Number(a.profit) < Number(b.profit) ? 1 : -1),
    'Profit decrease': (a: CardValues, b: CardValues) => (Number(a.profit) < Number(b.profit) ? -1 : 1),
};

export { CardsOrder };
