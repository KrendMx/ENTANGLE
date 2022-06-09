import { Contract, providers } from 'ethers';
import Loader from '../ui-kit/Loader';
import { ChainConfig, NETWORKS } from '@/src/ChainService/config';

const SortArray = ['Price increase', 'Price decrease', 'Profit increase', 'Profit decrease'] as const;

const calculatePosPrice = async (account: string, key: string, i: number) => {
    const synthContract = new Contract(
        ChainConfig[key].SYNTH[
            i
        ].CONTRACTS.SYNTH.address,
        ChainConfig[key].SYNTH[i].CONTRACTS.SYNTH.abi,
        new providers.JsonRpcProvider(
            NETWORKS[
                ChainConfig[key].SYNTH[
                    i
                ].CONTRACTS.SYNTH.chainId
            ].rpc,
        ),
    );
    const dexContract = new Contract(
        ChainConfig[key].SYNTH[
            i
        ].CONTRACTS.DEX.address,
        ChainConfig[key].SYNTH[i].CONTRACTS.DEX.abi,
        new providers.JsonRpcProvider(
            NETWORKS[
                ChainConfig[key].SYNTH[
                    i
                ].CONTRACTS.DEX.chainId
            ].rpc,
        ),
    );
    const dec = await synthContract.decimals();
    const price = 1
    / (((await dexContract.rate())
        / 10 ** (await dexContract.rateDecimals())));
    const accountBalance = await synthContract.balanceOf(
        account,
    );
    const synthPosition = Number(accountBalance.toBigInt()) / 10 ** dec;
    const positions = synthPosition * price;

    return {
        price,
        positions,
    };
};

const loader = (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '100px 0',
            fontSize: '3rem',
        }}
    >
        <Loader />
    </div>
);

export { SortArray, calculatePosPrice, loader };
