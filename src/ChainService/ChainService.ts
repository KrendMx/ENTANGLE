// React Deps
import { Contract, providers } from 'ethers';

// Config
import { ChainConfig, NETWORKS } from './config';

// Interfaces
import type {
    IChain,
    SynthContracts,
} from './ChainService.interface';

class ChainService {
    public readonly name: IChain;

    public readonly SynthsContractsArray: { [key: string]: Contract } = {};

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
        try {
            let apr = 0;
            switch (id) {
            case '8': {
                const usdValue = await this.getUSDVolume();
                const persec = await contracts.CHEF.joePerSec();
                const joeAddress = await contracts.CHEF.JOE();
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
            case '7': {
                const poolInfo = await contracts.CHEF.poolInfo(id);
                const persec = await contracts.CHEF.cakePerBlock(poolInfo.isRegular);
                const cakeAddress = await contracts.CHEF.CAKE();
                const perSecInStable = (
                    await contracts.ROUTER.getAmountsOut(persec, [
                        cakeAddress,
                        contracts.STABLESYNTCHEF.address,
                    ])
                )[1].toBigInt();
                const totalAlloc = await contracts.CHEF.totalRegularAllocPoint();
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
                const [token0Dec, token1Dec] = [18, 18];
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

            return Number((apr * 100).toFixed(2));
        } catch (e) {
            console.log(e);
            return 0;
        }
    };

    private getCurrenctDeposit = async (
        contracts: SynthContracts,
        id: string,
    ) => {
        try {
            const lpAmount = (
                await contracts.CHEF.userInfo(id, contracts.SYNTHCHEF.address)
            ).amount.toBigInt();
            const reserves = await contracts.PAIR.getReserves();
            const totalSupply = (await contracts.PAIR.totalSupply()).toBigInt();
            let token0Dec = 0;
            let token1Dec = 0;
            switch (id) {
            case '8':
                token0Dec = 6;
                token1Dec = 6;
                break;
            case '67':
                token0Dec = 6;
                token1Dec = 18;
                break;
            case '7':
                token0Dec = 18;
                token1Dec = 18;
                break;
            default:
                break;
            }
            const amount0 = Number(lpAmount * BigInt(reserves[0]))
                / Number(totalSupply)
                / Number(10 ** token0Dec);
            const amount1 = Number(lpAmount * BigInt(reserves[1]))
                / Number(totalSupply)
                / Number(10 ** token1Dec);
            return {
                currentDeposits: Number((amount0 + amount1).toFixed(2)),
                totalDeposits: lpAmount,
            };
        } catch (e) {
            console.log(e);
            return {
                currentDeposits: 0,
                totalDeposits: 0,
            };
        }
    };

    private getRemainData = async (
        contracts: SynthContracts,
    ) => {
        try {
            const available = (await contracts.SYNTH.balanceOf(
                contracts.DEX.address,
            ))
                / 10 ** (await contracts.SYNTH.decimals());
            const totalAvailable = (await contracts.STABLE.balanceOf(
                contracts.DEX.address,
            ))
                / 10 ** (await contracts.STABLE.decimals());
            const price = 1
                / (((await contracts.DEX.rate())
                    / 10 ** (await contracts.DEX.rateDecimals())));
            return {
                available,
                totalAvailable,
                price,
            };
        } catch (e) {
            console.log(e);
            return {
                available: 0,
                totalAvailable: 0,
                price: 0,
            };
        }
    };

    public getCardData = async (id: string) => {
        try {
            const necessaryСontracts: SynthContracts = this.contracts[id];

            const synthObj = (ChainConfig[this.name].SYNTH as any).find(
                (el: any) => el.ID === id,
            );

            const apr = await this.calculateAPR(
                necessaryСontracts,
                synthObj.FARMID,
            );
            const { currentDeposits, totalDeposits } = await this.getCurrenctDeposit(
                necessaryСontracts,
                synthObj.FARMID,
            );
            const { available, totalAvailable, price } = await this.getRemainData(
                necessaryСontracts,
            );
            return {
                apr,
                totalDeposits,
                currentDeposits,
                available,
                totalAvailable,
                price,
            };
        } catch (e) {
            // Намутить обработку
            console.log(e);
            return {
                apr: 0,
                totalDeposits: 0,
                currentDeposits: 0,
                available: 0,
                totalAvailable: 0,
                price: 0,
            };
        }
    };

    public getPersonalData = async (account: string, id: string) => {
        try {
            const necessaryСontracts: SynthContracts = this.contracts[id];

            const dec = await necessaryСontracts.SYNTH.decimals();

            const rate = await necessaryСontracts.DEX.rate();
            const price = 1 / (Number(rate.toBigInt()) / 10 ** 18);

            const accountBalance = await necessaryСontracts.SYNTH.balanceOf(account);
            const totalPositions = Number(accountBalance.toBigInt()) / 10 ** dec;

            const positions = totalPositions * price;

            return {
                positions,
                totalPositions,
            };
        } catch (e) {
            console.log(e);
            return {
                positions: 0,
                totalPositions: 0,
            };
        }
    };

    // Это по другому нужно будет расписать, но пока так
    public buyToken = async (value: number, id: number) => {
        try {
            const contracts: SynthContracts = this.contracts[id];

            const amount = Math.floor(value * 10 ** 6);
            return await contracts.FEE.buy(amount, { gasLimit: 1500000 });
        } catch (e) {
            throw new Error();
        }
    };

    public sellToken = async (value: number, id: string) => {
        try {
            const contracts: SynthContracts = this.contracts[id];

            const amount = Math.floor(value * 10 ** 18);
            return await contracts.FEE.sell(amount, { gasLimit: 1500000 });
        } catch (e) {
            throw new Error();
        }
    };
}

export default ChainService;
