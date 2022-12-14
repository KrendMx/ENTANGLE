// React Deps
import { Contract, providers } from 'ethers';
import { Notification } from 'src/libs/Notification';

// Config
import type { availableNames } from 'utils/Global/Types';
import { ChainConfig, NETWORKS } from '../ChainService/config';

// Interfaces
import type { ICardService, SynthContracts } from './CardSerivce.interfaces';

export class CardService implements ICardService {
    public readonly name: availableNames;

    public readonly SynthsContractsArray: { [key: string]: Contract } = {};

    private readonly secForYear = 31536000;

    private readonly contracts: any = {};

    // Сontract initialization
    constructor(Chain: availableNames) {
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

    /*
        Calculation of Current Deposit relative
        to the number of lp tokens and the number
        of tokens in reserves
    */

    private getCurrentDeposit = async (
        contracts: SynthContracts,
        id: string,
    ) => {
        try {
            if (this.name === 'ETH' || this.name === 'ELRD') {
                return {
                    currentDeposits: 0,
                    totalDeposits: 0,
                };
            }
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
            case '26':
                token0Dec = 18;
                token1Dec = 18;
                break;
            case '100':
                token0Dec = 18;
                token1Dec = 18;
                break;
            default:
                Notification.error('Error', 'Unexpected id while "getCurrentDeposit"');
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
        }
    };

    /*
        Small calculations of additional data
    */

    private getRemainData = async (contracts: SynthContracts) => {
        console.log(await contracts.DEX.rate(), 'DEX');
        console.log(contracts.SYNTH, 'SYNTH');
        try {
            const available = (await contracts.SYNTH.balanceOf(contracts.DEX.address))
                / 10 ** (await contracts.SYNTH.decimals());
            const totalAvailable = (await contracts.STABLE.balanceOf(contracts.DEX.address))
                / 10 ** (await contracts.STABLE.decimals());
            const price = ((await contracts.SYNTH.price())
                   / (10 ** (await contracts.SYNTH.decimals())));
            return {
                available: 10,
                totalAvailable: 10,
                price: 19,
            };
        } catch (e) {
            console.log(e);
        }
    };

    public getCardData = async (id: string) => {
        try {
            const aprs = {
                'AVAX': 2.50,
                'FTM': 11.36,
                'BSC': 1.09,
                'ETH': 15.40,
            } as const;
            const necessaryContracts: SynthContracts = this.contracts[id];

            const synthObj = (ChainConfig[this.name].SYNTH as any).find(
                (el: any) => el.ID === id,
            );

            const {
                currentDeposits,
                totalDeposits,
            } = await this.getCurrentDeposit(
                necessaryContracts,
                synthObj.FARMID,
            );

            const {
                available,
                totalAvailable,
                price,
            } = await this.getRemainData(necessaryContracts);
            return {
                apr: aprs[this.name],
                totalDeposits,
                currentDeposits,
                available,
                totalAvailable,
                price,
            };
        } catch (e) {
            console.log(e);
        }
    };

    /*
        Counting the user's personal data relative to the user wallet
    */

    public getPersonalData = async (account: string, id: string) => {
        try {
            const necessaryContracts: SynthContracts = this.contracts[id];

            const dec = await necessaryContracts.SYNTH.decimals();

            const rate = await necessaryContracts.DEX.rate();
            const price = 1 / (Number(rate.toBigInt()) / 10 ** 18);

            const accountBalance = await necessaryContracts.SYNTH.balanceOf(
                account,
            );
            const totalPositions = Number(accountBalance.toBigInt()) / 10 ** dec;

            const positions = totalPositions * price;

            return {
                positions,
                totalPositions,
            };
        } catch (e) {
            console.log(e);
        }
    };
}
