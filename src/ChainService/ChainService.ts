import { Contract, providers } from 'ethers';
import { ChainConfig, NETWORKS } from './config';
import type {
    IChainService,
} from './ChainService.interface';
import { networks } from '../utils/GlobalConst';

class ChainService implements IChainService {
    public static readonly SynthsContractsArray: { [key: string]: Contract } = {};

    static contracts: any = (() => {
        const contracts = {};
        for (const name of Object.values(ChainConfig)) {
            const config = name.SYNTH;
            for (const el of config) {
                const keys = Object.keys(el.CONTRACTS);
                contracts[el.ID] = {};
                contracts[el.ID].farmid = config[0].FARMID;
                for (let i = 0; i < keys.length; i++) {
                    contracts[el.ID][keys[i] as any] = new Contract(
                        el.CONTRACTS[
                            keys[i] as keyof typeof el.CONTRACTS
                        ].address,
                        el.CONTRACTS[keys[i] as keyof typeof el.CONTRACTS].abi,
                        new providers.JsonRpcProvider(
                            NETWORKS[
                                el.CONTRACTS[
                                    keys[i] as keyof typeof el.CONTRACTS
                                ].chainId
                            ].rpc,
                        ),
                    );
                }
            }
        }
        return contracts;
    })();

    public static getTVDForBuyAndSell = async () => {
        const finalArr = [];
        for (const key in ChainService.contracts) {
            finalArr.push(
                Number(
                    (await ChainService.contracts[key].SYNTHCHEF.deposits(
                        key,
                        ChainService.contracts[key].farmid,
                    ))
                        / 10
                            ** Number(
                                await ChainService.contracts[
                                    key
                                ].STABLESYNTCHEF.decimals(),
                            ),
                ),
            );
        }
        return Math.round(finalArr.reduce((pr, cr) => Number(pr) + Number(cr)));
    };

    private static createProvider = (chainId: keyof typeof networks) =>
        new providers.JsonRpcProvider(networks[chainId].rpc);

    public static getTPForBuyAndSell = async () => {
    };
}

export default ChainService;
