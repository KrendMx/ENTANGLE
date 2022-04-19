// React Deps
// eslint-ignore-entire-file react-hooks/rules-of-hooks

import React, { useMemo, useEffect, useContext } from 'react';
import { Contract, providers, BigNumber } from 'ethers';
import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import { ProviderContext } from '../../context/ProviderContext';

// Ethers Deps

// Config
import { ChainConfig, AdditionalConfig } from './config';

// Interfaces
import type { IChainService, IChain } from './ChainService.interface';

class ChainService implements IChainService {
  public readonly name: IChain;

  public readonly PairContract: Contract;

  public readonly ChefContract: Contract;

  public readonly RouterContract: Contract;

  public readonly SynthContract: Contract;

  public readonly DEXContract: Contract;

  public readonly OppositeToken: IChain;

  private readonly oneJoeDec = BigInt(100e18);

  private readonly secForYear = 31536000;

  // Сontract initialization
  constructor(Chain: IChain) {
    this.name = Chain;
    this.OppositeToken = Chain === 'AVAX' ? 'FTM' : 'AVAX';

    // eslint-disable-next-line react-hooks/rules-of-hooks
    this.PairContract = useMemo(
      () => new Contract(
        AdditionalConfig.CONTRACTS[this.name].PAIR.address,
        AdditionalConfig.CONTRACTS[this.name].PAIR.abi,
        new providers.JsonRpcProvider(ChainConfig[this.name].RPC),
      ),
      [],
    );
    this.ChefContract = useMemo(
      () => new Contract(
        AdditionalConfig.CONTRACTS[this.name].CHEF.address,
        AdditionalConfig.CONTRACTS[this.name].CHEF.abi,
        new providers.JsonRpcProvider(ChainConfig[this.name].RPC),
      ),
      [],
    );
    this.RouterContract = useMemo(
      () => new Contract(
        AdditionalConfig.CONTRACTS[this.name].ROUTER.address,
        AdditionalConfig.CONTRACTS[this.name].ROUTER.abi,
        new providers.JsonRpcProvider(ChainConfig[this.name].RPC),
      ),
      [],
    );
    this.SynthContract = useMemo(
      () => new Contract(
        ChainConfig[this.OppositeToken].CONTRACTS.SYNTH.address,
        ChainConfig[this.OppositeToken].CONTRACTS.SYNTH.abi,
        new providers.JsonRpcProvider(
          ChainConfig[this.OppositeToken].RPC,
        ),
      ),
      [],
    );

    this.DEXContract = useMemo(
      () => new Contract(
        ChainConfig[this.OppositeToken].CONTRACTS.DEX.address,
        ChainConfig[this.OppositeToken].CONTRACTS.DEX.abi,
        new providers.JsonRpcProvider(
          ChainConfig[this.OppositeToken].RPC,
        ),
      ),
      [],
    );
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

  public getCardData = async () => {
    try {
      let apr = null;
      let totalDeposits = null;
      let currentDeposits = null;
      let available = null;
      let totalAvailable = null;
      let price = null;

      const volumeUSD = await this.getUSDVolume();
      const totalSupply = await this.PairContract.totalSupply();
      const [reserve0, reserve1] = await this.PairContract.getReserves();
      const generalLiquidity = reserve0.add(reserve1).div(10 ** 6);

      let totalLpSupply: any;

      const pointers = await this.ChefContract.poolInfo(ChainConfig[this.name].net);
      const { allocPoint } = pointers;

      if (this.name === 'AVAX') {
        totalLpSupply = pointers.totalLpSupply;
      } else {
        totalLpSupply = await this.PairContract.balanceOf(
          AdditionalConfig.CONTRACTS[this.name].CHEF.address,
        );
      }
      const totalAllocPoint = await this.ChefContract.totalAllocPoint();
      const [token, usdc] = await this.RouterContract.getAmountsOut(
        this.oneJoeDec,
        [
          ChainConfig[this.name].forSwap,
          ChainConfig[this.name].CONTRACTS.STABLE.address,
        ],
      );
      const forOneUSD = +(
        token.div(BigInt(1e18)).toNumber() / usdc.div(1e6).toNumber()
      ).toFixed(2);
      const totalLpSupplyDec = totalLpSupply.toNumber();

      const { amount } = await this.ChefContract.userInfo(
        ChainConfig[this.name].net,
        ChainConfig[this.name].forAmount,
      );

      let perSec: any;
      let n: number;
      let r0: number;
      let r1: number;
      let x: number;
      let d0: number;
      let d1: number;

      switch (this.name) {
        case 'AVAX':
          const tokenApr = (BigNumber.from(
            Math.floor(Number(volumeUSD) * 0.003),
          ).toNumber()
                            / generalLiquidity.toNumber())
                        * 100;
          perSec = await this.ChefContract.joePerSec();
          n = +(
            (perSec.div(BigInt(1e18)).toNumber()
                            * this.secForYear
                            * allocPoint.toNumber())
                        / totalAllocPoint.toNumber()
                        / forOneUSD
          ).toFixed(2);
          r0 = reserve0
            .mul(totalLpSupplyDec)
            .div(totalSupply)
            .toNumber();
          r1 = reserve1
            .mul(totalLpSupplyDec)
            .div(totalSupply)
            .toNumber();
          d0 = reserve0.mul(amount).div(totalSupply).toNumber();
          d1 = reserve1.mul(amount).div(totalSupply).toNumber();
          x = (r0 + r1) / 10 ** 6;

          currentDeposits = (d0 + d1) / 10 ** 6;
          apr = ((n / x) * 100 + tokenApr).toFixed(2);

          break;
        case 'FTM':
          perSec = await this.ChefContract.spiritPerBlock();
          n = +(
            (perSec.div(BigInt(1e18)).toNumber()
                            * (365 * 24 * 60 * 60)
                            * allocPoint.toNumber())
                        / totalAllocPoint.toNumber()
                        / forOneUSD
          ).toFixed(2);
          r0 = parseFloat(
            reserve0
              .mul(totalLpSupplyDec)
              .div(totalSupply)
              .div(10 ** 6),
          );
          r1 = parseFloat(
            reserve1
              .mul(totalLpSupplyDec)
              .div(totalSupply)
              .toBigInt(),
          )
                        / 10 ** 18;
          d0 = parseFloat(
            reserve0
              .mul(amount)
              .div(totalSupply)
              .div(10 ** 6),
          );
          d1 = parseFloat(
            reserve1.mul(amount).div(totalSupply).toBigInt(),
          )
                        / 10 ** 18;
          x = r0 + r1;

          currentDeposits = d0 + d1;
          apr = ((n / x) * 100).toFixed(2);
          break;
        default:
          break;
      }

      const synthBalance = await this.SynthContract.balanceOf(
        ChainConfig[this.OppositeToken].CONTRACTS.DEX.address,
      );
      const dec = await this.SynthContract.decimals();
      const rate = await this.DEXContract.rate();
      const OpTokenContract = await new Promise<Contract>(
        async (resolve) => {
          const address = await this.DEXContract.opToken();
          resolve(
            new Contract(
              address,
              AdditionalConfig.CONTRACTS.OP.TOKEN.abi,
              new providers.JsonRpcProvider(
                ChainConfig[this.OppositeToken].RPC,
              ),
            ),
          );
        },
      );
      const opTokenDec = await OpTokenContract.decimals();
      const lp = await OpTokenContract.balanceOf(
        ChainConfig[this.OppositeToken].CONTRACTS.DEX.address,
      );

      totalDeposits = amount.toNumber() / 10 ** 18;
      price = 1 / (Number(rate.toBigInt()) / 10 ** 18);
      available = Number(synthBalance.toBigInt()) / 10 ** dec;
      totalAvailable = lp / 10 ** opTokenDec;

      return {
        apr: `${apr}%`,
        totalDeposits: `${totalDeposits} ${
          ChainConfig[this.name].synthName
        }`,
        currentDeposits: `$${currentDeposits!.toFixed(3)}`,
        available: `${Number(available.toFixed(5))}`,
        totalAvailable: `$${totalAvailable.toFixed(5)}`,
        price: `${Number(price.toFixed(6))}`,
      };
    } catch (e) {
      // Намутить обработку
      console.log(e);
      throw new Error();
    }
  };

  public getPersonalData = async (account: string) => {
    try {
      const dec = await this.SynthContract.decimals();

      const rate = await this.DEXContract.rate();
      const price = 1 / (Number(rate.toBigInt()) / 10 ** 18);

      const accountBalance = await this.SynthContract.balanceOf(account);
      const totalPositions = Number(accountBalance.toBigInt()) / 10 ** dec;

      const positions = totalPositions * price;

      return {
        positions,
        totalPositions: `${Number(totalPositions.toFixed(6))} ${
          ChainConfig[this.name].synthName
        }`,
      };
    } catch (e) {
      // Намутить обработку
      throw new Error();
    }
  };

  // Это по другому нужно будет расписать, но пока так
  public buyToken = async (value: number) => {
    const { provider } = useContext(ProviderContext);
    try {
      const buyContract = new Contract(
        ChainConfig[this.name].CONTRACTS.DEX.address,
        ChainConfig[this.name].CONTRACTS.DEX.abi,
        (provider as Web3Provider).getSigner(),
      );

      const amount = Math.floor(value * 10 ** 6);
      return await buyContract.buy(amount);
    } catch (e) {
      throw new Error();
    }
  };

  public sellToken = async (value: number) => {
    const { provider } = useContext(ProviderContext);
    try {
      const sellContract = new Contract(
        ChainConfig[this.name].CONTRACTS.DEX.address,
        ChainConfig[this.name].CONTRACTS.DEX.abi,
        (provider as Web3Provider).getSigner(),
      );
      // eslint-disable-next-line
            const amount = BigInt(Math.floor(Number(value * Math.pow(10, 18))));
      return await sellContract.sell(amount);
    } catch (e) {
      throw new Error();
    }
  };
}

export default ChainService;
