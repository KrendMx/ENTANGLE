import type { availableSingleSideChains } from '@/src/utils/GlobalConst';

interface IAssetsSelectorProps {
    assets: availableSingleSideChains[];
    activeAsset: string;
    changeActiveAssets: (x: availableSingleSideChains) => void;
    gradientBackground?: boolean;
}
export type { IAssetsSelectorProps };
