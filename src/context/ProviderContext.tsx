import { Contract, ethers } from 'ethers';
import type { ReactNode } from 'react';
import React, {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from 'react';
import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import type { IAccountState, IProviderContext, payDataType } from './types';
import toChainId from '../utils/toChainId';
import ethereumNetworksConfig from './ethereumNetworksConfig';
import type { ErrorI } from '../../components/Modal/ErrorModal/ErrorModal.interfaces';
import ErrorModal from '../../components/Modal/ErrorModal/ErrorModal';
import SuccessModal from '../../components/Modal/SuccessModal/SuccessModal';
import { ServiceProvider } from './ServiceContext';
import { MainService, MockService } from '../Service';
import { opToken } from '../utils/abi/index';
import { networks } from '../utils/GlobalConst';
import type { TransactionInfo } from '../../components/Modal/SuccessModal/SuccessModal.interface';
import SelectWalletModal from '../../components/Modal/SelectWalletModal/SelectWalletModal';
import { WalletProviderNames } from '../../components/Modal/SelectWalletModal/SelectWalletModal.constants';

export const ProviderContext = createContext<IProviderContext>(
    {} as IProviderContext,
);

const ProviderContextWrapper: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [error, setError] = useState<null | ErrorI>(null);
    const [errorStack, setErrorStack] = useState<ErrorI[]>([]);
    const [sucInfo, setSucInfo] = useState<null | TransactionInfo>(null);
    const [isOpenSelectWalletModal, setIsOpenSelectWalletModal] = useState<boolean>(false);
    const [preLoader, setPreloader] = useState<boolean>(true);

    const getSameErrorsCountFromStack = useCallback(
        (code: number) => errorStack.slice(-3).reduce((a: number, errorStackItem: ErrorI) => {
            if ((errorStackItem.code as number) === code) {
                return a + 1;
            }
            return a;
        }, 0),
        [errorStack],
    );

    const initState = {
        walletKey: null,
        provider: null,
        account: null,
        deposit: new Map(),
        positionSum: new Map(),
        profits: new Map(),
        chainId: '250',
        txLoading: false,
        preLoader: true,
    } as const;

    const initStatePayData = {
        '250': {
            price: null,
            available: null,
            totalAvailable: null,
        },
        '43114': {
            price: null,
            available: null,
            totalAvailable: null,
        },
        '56': {
            price: null,
            available: null,
            totalAvailable: null,
        },
    };

    const [state, setState] = useReducer(
        (stateAcc: IAccountState, newState: Partial<IAccountState>) => ({
            ...stateAcc,
            ...newState,
        }),
        initState,
    );
    const [payData, setPayData] = useReducer(
        (stateAcc: payDataType, newState: Partial<payDataType>) => ({
            ...stateAcc,
            ...newState,
        }),
        initStatePayData,
    );

    const setProfit = (n: number, change: number, key: string) => {
        setState({
            profits: new Map(state.profits.set(key, { value: n, change })),
        });
    };

    const getProfit = (key: string) => {
        if (key && state.profits.has(key)) {
            return state.profits.get(key) || { value: 0.0, change: 0.0 };
        }
        return { value: 0.0, change: 0.0 };
    };

    const setPositionSum = (n: number, key: string) => {
        setState({ positionSum: new Map(state.positionSum.set(key, n)) });
    };

    const setDeposit = (n: number, key: string) => {
        setState({ deposit: new Map(state.deposit.set(key, n)) });
    };

    const getDeposit = (key: string) => {
        if (key && state.deposit.has(key)) {
            return state.deposit.get(key) || 0;
        }
        return 0;
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
                if (switchError.code === 4902 || switchError.code === -32603) {
                    try {
                        await provider.send('wallet_addEthereumChain', [
                            ethereumNetworksConfig[chainId],
                        ]);
                    } catch (addError) {
                        console.log(switchError);
                    }
                } else {
                    throw switchError;
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
        return null;
    };

    const getAllowance = async (
        contractAddress: string,
        dexAddress: string,
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
        return null;
    };

    const removeWallet = async () => {
        setState({ ...initState, chainId: state.chainId });
        localStorage.removeItem('wallet');
    };

    const errorHandler = (e: ErrorI, returnValue: any) => {
        setErrorStack([...errorStack, e]);
        if ((e.code as number) === -32002) {
            localStorage.removeItem('wallet');
            return returnValue;
        }
        setError(e);
        return returnValue;
    };

    const getProvider = (isSuppressErrors = false) => {
        let provider: Web3Provider | null = null;

        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
        } catch (e) {
            if (!isSuppressErrors) {
                errorHandler(
                    // @ts-ignore
                    { code: '-1', message: 'missingProvider' } as ErrorI,
                    [],
                );
            }
        }
        return provider;
    };

    useEffect(() => {
        setState({ provider: getProvider(true) });
    }, []);

    const setWallet = async (walletKey: string) => {
        const provider = getProvider();
        if (!provider) {
            return;
        }

        if (
            walletKey === WalletProviderNames.MetaMask
            && !window.ethereum.isMetaMask
        ) { return; }
        if (walletKey === 'Coin98' && !window.ethereum.isCoin98) return;
        if (walletKey === 'CoinBase' && !window.ethereum.isCoinbaseWallet) { return; }

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
        const prepareChainId = (chainId: number) => parseInt(
            chainId.toString(),
            10,
        ).toString() as IAccountState['chainId'];

        const afterChange = () => {
            const chainId = prepareChainId(networkData.chainId);
            setState({
                provider,
                account,
                chainId,
                walletKey,
            });
        };

        const avalibleChains = Object.keys(networks);
        if (avalibleChains.includes(prepareChainId(networkData.chainId))) {
            afterChange();
        } else {
            await changeNetwork(state.chainId, provider).finally(afterChange);
        }
        setPreloader(false);
        localStorage.setItem('wallet', walletKey);
    };

    const setChainID = async (chainId: IAccountState['chainId']) => {
        await changeNetwork(chainId, state.provider).then(() => {
            const provider = getProvider();
            if (!provider) {
                return;
            }
            setState({
                ...state,
                chainId,
                provider,
            });
        });
    };

    const setChainIDAsync = async (
        chainId: IAccountState['chainId'],
    ): Promise<any> => changeNetwork(chainId, state.provider).then(() => {
        const provider = getProvider();
        if (!provider) {
            return;
        }
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

    useEffect(() => {
        setState({ provider: getProvider(true) });
    }, [state.chainId]);

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const providerValue = {
        ...state,
        setDeposit,
        getDeposit,
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
        getProfit,
        setProfit,
        setIsOpenSelectWalletModal,
        getSameErrorsCountFromStack,
        setSucInfo,
        setPayData,
        setPreloader,
        preLoader,
        payData,
    };

    const service = useMemo(
        () => (Number(process.env.NEXT_PUBLIC_REACT_APP_IS_MOCK_API) === 1
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
                {isOpenSelectWalletModal && (
                    <SelectWalletModal
                        selectWallet={(walletProviderName) => setWallet(walletProviderName)}
                        handleClose={() => {
                            setIsOpenSelectWalletModal(false);
                        }}
                    />
                )}
            </ServiceProvider>
        </ProviderContext.Provider>
    );
};

export default ProviderContextWrapper;
