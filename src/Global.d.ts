import type { providers } from 'ethers';

declare module '*.module.css';

declare global {
  interface Window {
    ethereum: providers.ExternalProvider<{isCoin98: boolean; isCoinbaseWallet: boolean}>;
  }
}
export {};
