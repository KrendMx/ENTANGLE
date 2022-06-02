import { Contract, providers } from 'ethers';
import QueryRequests from './queryRequests';
import { GRAPH_CONFIG } from './config';
import type {
    IQueryResponse,
    IGraphService,
    IConfiguredBuyTransactionsData,
} from './GraphService.interfaces';
import type { TransactionHistoryEntity } from '../context/ServiceContext/ServiceContext.interfaces';
import synthAbi from './abi/synth.json';
import type { availableChains } from '../utils/GlobalConst';
import { networks, namesConfig } from '../utils/GlobalConst';

class GraphService implements IGraphService {
    private account;

    constructor(account: string) {
        this.account = account;
    }

    private createProvider = (chainId: keyof typeof networks) =>
        new providers.JsonRpcProvider(networks[chainId].rpc);

    private createContracts = (data: {
        chainId: keyof typeof networks;
        address: string;
        abi: any;
    }): Contract =>
        new Contract(data.address, data.abi, this.createProvider(data.chainId));

    public getBuyTransactions = async (): Promise<
        IConfiguredBuyTransactionsData[]
    > => {
        const configuredData: IConfiguredBuyTransactionsData[] = [];
        const chainNames = Object.keys(GRAPH_CONFIG);
        for (const chain of chainNames) {
            for (const netId of chainNames[chain]) {
                const localProvider = this.createProvider(netId);
                const contract = this.createContracts({
                    chainId: netId,
                    address: this.account,
                    abi: synthAbi,
                });
                const { data: BuyData }: { data: IQueryResponse } = await QueryRequests.getGraphDataBuyData(
                    this.account,
                    chainNames[chain][netId],
                );
                for (let i = 0; i < BuyData.data.exchanges.length; i++) {
                    if (BuyData.data.exchanges[i]) {
                        const date = new Date(
                            (
                                await localProvider.getBlock(
                                    BuyData.data.exchanges[i].block,
                                )
                            ).timestamp,
                        );
                        configuredData.push({
                            price:
                                Number(BuyData.data.exchanges[i].amount)
                                / Number(await contract.dec()),
                            date,
                        });
                    }
                }
            }
        }
        return configuredData.sort((a, b) => (a.date > b.date ? 1 : -1));
    };

    public getAllTransactions = async () => {
        const configuredData: TransactionHistoryEntity[] = [];
        const chainNames = Object.keys(GRAPH_CONFIG);
        for (const chain of chainNames) {
            const netIds = Object.keys(GRAPH_CONFIG[chain]);
            for (const netId of netIds) {
                const contract = this.createContracts({
                    chainId: namesConfig[chain] as availableChains,
                    address: this.account,
                    abi: synthAbi,
                });
                const { data: BuyData }: { data: IQueryResponse } = await QueryRequests.getGraphDataBuyData(
                    this.account,
                    GRAPH_CONFIG[chain][netId].url,
                );
                const { data: SellData }: { data: IQueryResponse } = await QueryRequests.getGraphDataTxData(
                    GRAPH_CONFIG[chain][netId].fee,
                    GRAPH_CONFIG[chain][netId].url,
                );
                const max = Math.max(
                    SellData.data.exchanges?.length,
                    BuyData.data.exchanges?.length,
                );
                if (max !== 0) {
                    for (let i = 0; i < max; i++) {
                        if (SellData.data.exchanges[i]) {
                            const user = (await contract.provider.getTransaction(SellData.data.exchanges[i].id)).from;
                            if (user.toLowerCase() === this.account) {
                                const time = (
                                    await contract.provider.getBlock(
                                        Number(SellData.data.exchanges[i].block),
                                    )
                                ).timestamp;
                                configuredData.push({
                                    type: 'sell',
                                    amount: (
                                        Number(SellData.data.exchanges[i].amount)
                                    / 10 ** 18
                                    ).toString(),
                                    crypto: Number(netId as availableChains),
                                    time: time * 1000,
                                });
                            }
                        }
                        if (BuyData.data.exchanges[i]) {
                            const time = (
                                await contract.provider.getBlock(
                                    Number(BuyData.data.exchanges[i].block),
                                )
                            ).timestamp;
                            configuredData.push({
                                type: 'buy',
                                amount: (
                                    Number(BuyData.data.exchanges[i].amount)
                                        / 10 ** 18
                                ).toString(),
                                crypto: Number(netId as availableChains),
                                time: time * 1000,
                            });
                        }
                    }
                }
            }
        }
        return configuredData.sort((a, b) => (a.time > b.time ? 1 : -1));
    };
}

export default GraphService;
