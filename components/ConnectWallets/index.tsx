import { useContext } from 'react';
import { ProviderContext } from '../../context/ProviderContext';

const ConnectWallets = () => {
  const wallets = ['MetaMask', 'Coin98', 'CoinBase', 'WalletConnect'] as const;
  const { setWallet, account, chainId } = useContext(ProviderContext);

  const connectWallet = (key: string) => () => {
    setWallet(key);
  };

  return (
      <div>
          <h2>
              chainId:
              {chainId}
          </h2>
          <h3>
              account:
              {account}
          </h3>
          { wallets.map((key) => (<button onClick={connectWallet(key)} key={key}>{key}</button>))}
      </div>
  );
};

export default ConnectWallets;
