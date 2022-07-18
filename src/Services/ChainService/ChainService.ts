import { Contract, providers } from 'ethers';
import axios from 'axios';
import { ChainConfig, NETWORKS } from './config';
import type {
    chefDataType,
    IChainService,
} from './ChainService.interface';
import type { shefEvent } from '../GraphService/GraphService.interfaces';
import { CHEF_CONFIG } from '../GraphService/config';

export class ChainService implements IChainService {
    public static readonly SynthsContractsArray: { [key: string]: Contract } = {};

    public static contracts: any = (() => {
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

    public static getChefContractData = async (eventType: shefEvent, url: string, labels: string) => {
        const body = {
            query: `{${eventType} {${labels}}}`,
        };
        return axios.post(url, body);
    };

    public static getDataForTRA = async (): Promise<any> => {
        const finalObject = {};
        const event: shefEvent[] = ['deposites', 'withdraws', 'compounds'];
        for (const keyUrl in CHEF_CONFIG) {
            finalObject[keyUrl] = {};
            for (const keyEvent of event) {
                finalObject[keyUrl][keyEvent] = (await this.getChefContractData(
                    keyEvent,
                    CHEF_CONFIG[keyUrl].url,
                    keyEvent !== 'compounds' ? 'id, address, amount' : 'id, address, amountStable',
                )).data.data[keyEvent];
            }
        }
        return finalObject;
    };

    private static getSumValueFromContract = async (key: string): Promise<number> => {
        if (ChainService.contracts[key].SYNTHCHEF) {
            return Number(
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
            );
        }
    };

    public static getTVDForBuyAndSell = async (): Promise<number> => {
        const finalArr = [];
        for (const key in ChainService.contracts) {
            finalArr.push(await ChainService.getSumValueFromContract(key));
        }
        return Math.round(finalArr.filter((el) => el).reduce((pr, cr) => Number(pr) + Number(cr)));
    };

    public static getTRAForBuyAndSell = async () => {
        const id = [
            { key: '67', name: 'FTM' },
            { key: '8', name: 'AVAX' },
            { key: '7', name: 'BSC' },
        ] as const;
        const finalArr: number[] = [];
        const chefData: Promise<chefDataType> = await ChainService.getDataForTRA();
        for (const key of id) {
            let sumWithdraw: number = 0;
            let sumMarkInvestition: number = 0;
            const startInvestition: number = Number(chefData[key.name].deposites[0].amount);
            let sumDeposited: number = 0;
            if (Object.keys(chefData[key.name].withdraws).length > 0) {
                sumWithdraw = Object.values(chefData[key.name].withdraws).map((el: any) => Number(el.amount))
                    .reduce((p, c) => p + c) as number;
            }
            if (Object.keys(chefData[key.name].compounds).length > 0) {
                sumMarkInvestition = Number(chefData[key.name]
                    .compounds[chefData[key.name].compounds.length - 1].amountStable);
            }
            if (Object.keys(chefData[key.name].deposites).length > 0) {
                sumDeposited = Object.values(chefData[key.name].deposites)
                    .map((el: any) => Number(el.amount))
                    .reduce((p, c) => p + c);
            }
            finalArr.push(((sumMarkInvestition + sumWithdraw)
                - (startInvestition + sumDeposited)) / (10
                    ** Number(
                        await ChainService.contracts[
                            key.key
                        ]?.STABLESYNTCHEF.decimals(),
                    )));
        }
        return finalArr.reduce((p, c) => p + c).toFixed(3);
    };
}
