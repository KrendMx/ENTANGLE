type helperType = {[key: string]: number};

interface ICardEntityState {
    apr: helperType;
    available: helperType;
    prices: helperType;
}

export type {
    ICardEntityState,
    helperType,
};
