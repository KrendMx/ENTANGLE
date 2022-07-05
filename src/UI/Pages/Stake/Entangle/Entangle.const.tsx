const VALIDATOR_DATA = [
    {
        name: 'Validator Alpha',
        date: '22 March 2021',
        delegated: '735\'688',
    },
    {
        name: 'Validator Beta',
        date: '03 June 2021',
        delegated: '123\'456',
    },
] as const;

const STAKE_DATE = ['no lock', '3 Months', '6 Months', '1 Year'];

export {
    VALIDATOR_DATA,
    STAKE_DATE,
};
