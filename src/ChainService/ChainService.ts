// React Deps
import React, { useContext } from 'react';
import { Contract, providers, BigNumber } from 'ethers';
import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import { ProviderContext } from '../../context/ProviderContext';

// Config
import { ChainConfig, AdditionalConfig, NETWORKS } from './config';

// Interfaces
import type {
    IChainService,
    IChain,
    keyType,
    SynthContracts,
} from './ChainService.interface';

class ChainService {
    public readonly name: IChain;

    public readonly SynthsContractsArray: { [key: string]: Contract } = {};

    private readonly oneJoeDec = BigInt(100e18);

    private readonly secForYear = 31536000;

    private readonly contracts: any = {};

    // Сontract initialization
    constructor(Chain: IChain) {
        this.name = Chain;
        const config = ChainConfig[this.name].SYNTH;
        for (const el of config) {
            const keys = Object.keys(el.CONTRACTS);
            this.contracts[el.ID] = {};
            for (let i = 0; i < keys.length; i++) {
                this.contracts[el.ID][keys[i] as any] = new Contract(
                    el.CONTRACTS[keys[i] as keyof typeof el.CONTRACTS].address,
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

    // USD price for AVAX calculations
    private getUSDVolume = async (): Promise<string> => {
        const { volumeUSD } = await fetch(
            'https://api.thegraph.com/subgraphs/name/traderjoe-xyz/exchange',
            {
                headers: {
                    accept: '*/*',
                    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                    'content-type': 'application/json',
                    'sec-ch-ua':
                        '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Linux"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'cross-site',
                },
                referrer: 'https://traderjoexyz.com/',
                referrerPolicy: 'strict-origin-when-cross-origin',
                // eslint-disable-next-line max-len
                body: '{"operationName":"filteredPairsQuery","variables":{"dateAfter":1648746000,"first":1,"pairIds":["0x2a8a315e82f85d1f0658c5d66a452bbdd9356783"]},"query":"query filteredPairsQuery($pairIds: [String]!, $first: Int!, $dateAfter: Int! = 1622419200) {\\n  pairs(first: $first, where: {id_in: $pairIds}) {\\n    id\\n    name\\n    token0Price\\n    token1Price\\n    token0 {\\n      id\\n      symbol\\n      decimals\\n      __typename\\n    }\\n    token1 {\\n      id\\n      symbol\\n      decimals\\n      __typename\\n    }\\n    reserve0\\n    reserve1\\n    reserveUSD\\n    volumeUSD\\n    hourData(first: 24, where: {date_gt: $dateAfter}, orderBy: date, orderDirection: desc) {\\n      untrackedVolumeUSD\\n      volumeUSD\\n      date\\n      volumeToken0\\n      volumeToken1\\n      __typename\\n    }\\n    timestamp\\n    __typename\\n  }\\n}\\n"}',
                method: 'POST',
                mode: 'cors',
                credentials: 'omit',
            },
        )
            .then((res) => res.json())
            .then((obj) => obj.data.pairs[0]);

        return volumeUSD;
    };

    // calculate apr by farm id
    private calculateAPR = async (contracts: SynthContracts, id: string) => {
        let apr = 0;
        switch (id) {
        case '8': {
            const usdValue = await this.getUSDVolume();
            const persec = await contracts.CHEF.joePerSec();
            const joeAddress = await contracts.CHEF.joe();
            const perSecInStable = (
                await contracts.ROUTER.getAmountsOut(persec, [
                    joeAddress,
                    contracts.STABLESYNTCHEF.address,
                ])
            )[1].toBigInt();
            const totalAlloc = await contracts.CHEF.totalAllocPoint();
            const poolInfo = await contracts.CHEF.poolInfo(id);
            const rewardPerYear = (perSecInStable
                        * BigInt(this.secForYear)
                        * poolInfo.allocPoint.toBigInt())
                    / totalAlloc.toBigInt()
                    / BigInt(10 ** (await contracts.STABLESYNTCHEF.decimals()));
            const balance = (
                await contracts.PAIR.balanceOf(contracts.CHEF.address)
            ).toBigInt();
            const reserves = await contracts.PAIR.getReserves();
            const totalSupply = (
                await contracts.PAIR.totalSupply()
            ).toBigInt();
            const [token0Dec, token1Dec] = [6, 6];
            const amount0 = (balance * BigInt(reserves[0]))
                    / totalSupply
                    / BigInt(10 ** token0Dec);
            const amount1 = (balance * BigInt(reserves[1]))
                    / totalSupply
                    / BigInt(10 ** token1Dec);
            apr = Number(rewardPerYear) / Number(amount0 + amount1)
                    + (Number(usdValue) * 0.003) / Number(amount0 + amount1);
            break;
        }
        case '67': {
            const persec = await contracts.CHEF.spiritPerBlock();
            const spiritAddress = await contracts.CHEF.spirit();
            const perSecInStable = (
                await contracts.ROUTER.getAmountsOut(persec, [
                    spiritAddress,
                    contracts.STABLESYNTCHEF.address,
                ])
            )[1].toBigInt();
            const totalAlloc = await contracts.CHEF.totalAllocPoint();
            const poolInfo = await contracts.CHEF.poolInfo(id);
            const rewardPerYear = (perSecInStable
                        * BigInt(this.secForYear)
                        * poolInfo.allocPoint.toBigInt())
                    / totalAlloc.toBigInt()
                    / BigInt(10 ** (await contracts.STABLESYNTCHEF.decimals()));
            const balance = (
                await contracts.PAIR.balanceOf(contracts.CHEF.address)
            ).toBigInt();
            const reserves = await contracts.PAIR.getReserves();
            const totalSupply = (
                await contracts.PAIR.totalSupply()
            ).toBigInt();
            const [token0Dec, token1Dec] = [6, 18];
            const amount0 = (balance * BigInt(reserves[0]))
                    / totalSupply
                    / BigInt(10 ** token0Dec);
            const amount1 = (balance * BigInt(reserves[1]))
                    / totalSupply
                    / BigInt(10 ** token1Dec);
            apr = Number(rewardPerYear) / Number(amount0 + amount1);
            break;
        }
        default:
            break;
        }

        return apr;
    };

    public getCardData = async (id: string) => {
        console.log(id);
        try {
            const necessaryСontracts = this.contracts[id];

            const synthObj = (ChainConfig[this.name].SYNTH as any).find(
                (el: any) => el.ID === id,
            );

            const apr = await this.calculateAPR(necessaryСontracts, synthObj.FARMID);
            const totalDeposits = 0;
            const currentDeposits = 0;
            const available = 0;
            const totalAvailable = 0;
            const price = 0;

            //         return {
            //             apr,
            //             totalDeposits,
            //             currentDeposits,
            //             available,
            //             totalAvailable,
            //             price,
            //         };
        } catch (e) {
            // Намутить обработку
            console.log(e);
            throw new Error();
        }
    };

    // public getPersonalData = async (account: string) => {
    //     try {
    //         const dec = await this.SynthContract.decimals();

    //         const rate = await this.DEXContract.rate();
    //         const price = 1 / (Number(rate.toBigInt()) / 10 ** 18);

    //         const accountBalance = await this.SynthContract.balanceOf(account);
    //         const totalPositions = Number(accountBalance.toBigInt()) / 10 ** dec;

    //         const positions = totalPositions * price;

    //         return {
    //             positions,
    //             totalPositions,
    //         };
    //     } catch (e) {
    //         // Намутить обработку
    //         throw new Error();
    //     }
    // };

    // // Это по другому нужно будет расписать, но пока так
    // public buyToken = async (value: number) => {
    //     const { provider } = useContext(ProviderContext);
    //     try {
    //         const buyContract = new Contract(
    //             ChainConfig[this.name].CONTRACTS.DEX.address,
    //             ChainConfig[this.name].CONTRACTS.DEX.abi,
    //             (provider as Web3Provider).getSigner(),
    //         );

    //         const amount = Math.floor(value * 10 ** 6);
    //         return await buyContract.buy(amount);
    //     } catch (e) {
    //         throw new Error();
    //     }
    // };

    // public sellToken = async (value: number) => {
    //     const { provider } = useContext(ProviderContext);
    //     try {
    //         const sellContract = new Contract(
    //             ChainConfig[this.name].CONTRACTS.DEX.address,
    //             ChainConfig[this.name].CONTRACTS.DEX.abi,
    //             (provider as Web3Provider).getSigner(),
    //         );
    //         // eslint-disable-next-line
    //         const amount = BigInt(Math.floor(Number(value * Math.pow(10, 18))));
    //         return await sellContract.sell(amount);
    //     } catch (e) {
    //         throw new Error();
    //     }
    // };
}

export default ChainService;
