import { Contract, providers } from 'ethers';
import { getGraphData } from './GraphService.constant';
import { GRAPH_CONFIG } from './config';
import type {
    IQueryResponse,
    IGraphService,
    IConfiguredBuyTransactionsData,
} from './GraphService.interfaces';
import type { TransactionHistoryEntity } from '../context/ServiceContext/ServiceContext.interfaces';
import synthAbi from './abi/synth.json';
import type { availableChains } from '../utils/GlobalConst';
import { networks } from '../utils/GlobalConst';

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
                const { data: BuyData }: { data: IQueryResponse } = await getGraphData(
                    this.account,
                    chainNames[chain][netId],
                    'buy',
                );
                for (let i = 0; i < BuyData.data.exchange.length; i++) {
                    if (BuyData.data.exchange[i]) {
                        const date = new Date(
                            (
                                await localProvider.getBlock(
                                    BuyData.data.exchange[i].block,
                                )
                            ).timestamp,
                        );
                        configuredData.push({
                            price:
                                Number(BuyData.data.exchange[i].amount)
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
        console.log(chainNames);
        for (const chain of chainNames) {
            console.log(GRAPH_CONFIG[chain]);
            const netIds = Object.keys(GRAPH_CONFIG[chain]);
            for (const netId of netIds) {
                console.log(netId);
                const localProvider = this.createProvider(netId as availableChains);
                const contract = this.createContracts({
                    chainId: netId as availableChains,
                    address: this.account,
                    abi: synthAbi,
                });
                const { data: BuyData }: { data: IQueryResponse } = await getGraphData(
                    this.account,
                    GRAPH_CONFIG[chain][netId],
                    'buy',
                );
                const { data: SellData }: { data: IQueryResponse } = await getGraphData(
                    this.account,
                    GRAPH_CONFIG[chain][netId],
                    'sell',
                );
                const max = Math.max(
                    SellData.data.exchange.length,
                    BuyData.data.exchange.length,
                );
                for (let i = 0; i < max; i++) {
                    if (SellData.data.exchange[i]) {
                        const time = (
                            await localProvider.getBlock(
                                SellData.data.exchange[i].block,
                            )
                        ).timestamp;
                        configuredData.push({
                            type: 'sell',
                            amount: (
                                Number(SellData.data.exchange[i].amount)
                                / Number(await contract.dec())
                            ).toString(),
                            crypto: Number(netId as availableChains),
                            time,
                        });
                    }
                    if (BuyData.data.exchange[i]) {
                        const time = (
                            await localProvider.getBlock(
                                BuyData.data.exchange[i].block,
                            )
                        ).timestamp;
                        configuredData.push({
                            type: 'buy',
                            amount: (
                                Number(BuyData.data.exchange[i].amount)
                                / Number(await contract.dec())
                            ).toString(),
                            crypto: Number(netId as availableChains),
                            time,
                        });
                    }
                }
            }
        }
        return configuredData.sort((a, b) => (a.time > b.time ? 1 : -1));
    };
}

export default GraphService;
