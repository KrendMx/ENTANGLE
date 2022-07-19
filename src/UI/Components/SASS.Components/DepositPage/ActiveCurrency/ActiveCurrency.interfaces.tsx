import type { availableSingleSideChains } from 'src/utils/Global/Types';

interface IAssetsSelectorProps {
    assets: availableSingleSideChains[];
    activeAsset: string;
    changeActiveAssets: (x: availableSingleSideChains) => void;
    gradientBackground?: boolean;
}
export type { IAssetsSelectorProps };
