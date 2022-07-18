import type { availableSingleSideChains } from 'src/utils/Global/Types';

interface IDepositeProps {
    query: {
        first: availableSingleSideChains;
        second: availableSingleSideChains;
        time: string;
    };
}

interface IDepositeStore {
    activeAssets: string;
    activeTab: string;
}
export type { IDepositeProps, IDepositeStore };
