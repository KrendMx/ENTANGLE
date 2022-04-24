import { Contract, ethers } from 'ethers';
import type { ReactNode } from 'react';
import React, {
    createContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from 'react';
import type { IAccountState, IProviderContext } from './types';
import { toChainId } from '../src/utils';
import ethereumNetworksConfig from './ethereumNetworksConfig';
import type { ErrorI } from '../components/Modal/ErrorModal/ErrorModal.interfaces';
import ErrorModal from '../components/Modal/ErrorModal/ErrorModal';
// eslint-disable-next-line import/no-cycle
import SuccessModal from '../components/Modal/SuccessModal/SuccessModal';
import { ServiceProvider } from './ServiceContext';
import { MainService, MockService } from '../components/Service';
import { opToken } from '../components/HomePage/Dashboard/DashboardItem/containers/abi';
import { networks } from '../src/utils/GlobalConst';
import type { TransactionInfo } from '../components/Modal/SuccessModal/SuccessModal.interface';

export const ProviderContext = createContext<IProviderContext>(
    {} as IProviderContext,
);

const ProviderContextWrapper: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [error, setError] = useState<null | ErrorI>(null);
    const [sucInfo, setSucInfo] = useState<null | TransactionInfo>(null);

    const initState = {
        walletKey: null,
        provider: null,
        account: null,
        positionSum: new Map(),
        chainId: '250',
        txLoading: false,
    } as const;

    const [state, setState] = useReducer(
        (stateAcc: IAccountState, newState: Partial<IAccountState>) => ({
            ...stateAcc,
            ...newState,
        }),
        initState,
    );

    const setPositionSum = (n: number, key: string) => {
        setState({ positionSum: new Map(state.positionSum.set(key, n)) });
    };

    const getPositionSum = (key?: string): number => {
        if (key && state.positionSum.has(key)) {
            return state.positionSum.get(key) || 0;
        }
        let sum = 0;
        state.positionSum.forEach((value) => {
            sum += value;
        });
        return sum;
    };
    const changeAccount = (accounts: string[]) => setState({ account: accounts[0] });
    const chainChange = (chainId: string) => setState({
        chainId: parseInt(
            chainId,
            16,
        ).toString() as IAccountState['chainId'],
    });
    const disconnect = () => console.log('wallet disconnect');

    const changeNetwork = async (
        chainId: IAccountState['chainId'],
        provider: IAccountState['provider'],
    ) => {
        if (provider) {
            try {
                await provider.send('wallet_switchEthereumChain', [
                    { chainId: toChainId(chainId) },
                ]);
            } catch (switchError: any) {
                if (switchError.code === 4902) {
                    try {
                        await provider.send('wallet_addEthereumChain', [
                            ethereumNetworksConfig[chainId],
                        ]);
                    } catch (addError) {
                        console.log(switchError);
                    }
                }
            }
        }
    };

    const importToken = async () => {
        if (state.provider) {
            const options = {
                type: 'ERC20',
                options: {
                    address: networks[state.chainId].synth,
                    symbol: 'SYNTH',
                    decimals: 18,
                },
            };
            try {
                // @ts-ignore
                await state.provider.send('wallet_watchAsset', options);
            } catch (switchError: any) {
                if (switchError.code === 4902) {
                    try {
                        await state.provider.send('wallet_addEthereumChain', [
                            ethereumNetworksConfig[state.chainId],
                        ]);
                    } catch (addError) {
                        console.log(switchError);
                    }
                }
            }
        }
    };

    // eslint-disable-next-line consistent-return
    const approve = async (tokenAddress: string, dexAddress: string) => {
        if (state.provider) {
            const contract = new Contract(
                tokenAddress,
                opToken,
                state.provider.getSigner(),
            );

            const data = await contract.approve(
                dexAddress,
                '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            );
            return data;
        }
    };

    const getAllowance = async (
        contractAddress: string,
        dexAddress: string,
        // eslint-disable-next-line consistent-return
    ) => {
        if (state.provider) {
            const contract = new Contract(
                contractAddress,
                opToken,
                state.provider.getSigner(),
            );

            const data = await contract.allowance(state.account, dexAddress);

            return data;
        }
    };

    const removeWallet = async () => {
        setState({ ...initState, chainId: state.chainId });
        localStorage.removeItem('wallet');
    };

    const setWallet = async (walletKey: string) => {
        const errorHandler = (e: ErrorI, returnValue: any) => {
            setError(e);
            return returnValue;
        };

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        if (walletKey === 'MetaMask' && !window.ethereum.isMetaMask) return;
        if (walletKey === 'Coin98' && !window.ethereum.isCoin98) return;
        if (walletKey === 'CoinBase' && !window.ethereum.isCoinbaseWallet) {
            return;
        }

        const account = (
            await provider
                .send('eth_requestAccounts', [])
                .catch((e: ErrorI) => errorHandler(e, []))
        )[0] || null;
        if (!account) {
            return;
        }

        const networkData = await provider
            .getNetwork()
            .catch((e: ErrorI) => errorHandler(e, null));
        if (!networkData) {
            return;
        }

        await changeNetwork(state.chainId, provider).finally(() => {
            const chainId = parseInt(
                networkData.chainId.toString(),
                10,
            ).toString() as IAccountState['chainId'];
            setState({
                provider,
                account,
                chainId,
                walletKey,
            });
        });
        localStorage.setItem('wallet', '1');
    };

    const setChainID = async (chainId: IAccountState['chainId']) => {
        await changeNetwork(chainId, state.provider);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setState({
            ...state,
            chainId,
            provider,
        });
    };

    const setChainIDAsync = async (
        chainId: IAccountState['chainId'],
    ): Promise<any> => changeNetwork(chainId, state.provider).then(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setState({
            ...state,
            chainId,
            provider,
        });
    });

    const changeLoadingTx = async (value: boolean) => {
        setState({
            ...state,
            txLoading: value,
        });
    };

    useEffect(() => {
        if (state.walletKey) {
            const eventProvider = window.ethereum;
            eventProvider.on('disconnect', disconnect);
            eventProvider.on('accountsChanged', changeAccount);
            eventProvider.on('chainChanged', chainChange);
            return () => {
                const removeEventKey = 'removeListener';
                eventProvider[removeEventKey]('disconnect', disconnect);
                eventProvider[removeEventKey]('accountsChanged', changeAccount);
                eventProvider[removeEventKey]('chainChanged', chainChange);
            };
        }
        return () => {};
    }, [state.walletKey]);

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const providerValue = {
        ...state,
        setWallet,
        removeWallet,
        setChainID,
        approve,
        setChainIDAsync,
        importToken,
        getAllowance,
        changeLoadingTx,
        setPositionSum,
        getPositionSum,
        setSucInfo,
    };

    const service = useMemo(
        () => (Number(process.env.REACT_APP_IS_MOCK_API) === 1
            ? new MockService()
            : new MainService()),
        [],
    );

    return (
        <ProviderContext.Provider value={providerValue}>
            <ServiceProvider value={service}>
                {children}
                {error && (
                    <ErrorModal
                        error={error}
                        handleClose={() => {
                            setError(null);
                        }}
                    />
                )}
                {sucInfo && (
                    <SuccessModal
                        transactionInfo={sucInfo}
                        handleClose={() => {
                            setSucInfo(null);
                        }}
                    />
                )}
            </ServiceProvider>
        </ProviderContext.Provider>
    );
};

export default ProviderContextWrapper;
