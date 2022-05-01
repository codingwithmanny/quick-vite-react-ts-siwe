// Imports
// ========================================================
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { providers } from 'ethers';
import { Provider as WagmiProvider, createClient, chain, defaultChains, Connector } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

// Types
// ========================================================
/**
 * 
 */
type ConnectorsConfig = { chainId?: number }

/**
 * 
 */
type ProviderConfig = { chainId?: number; connector?: Connector }

// Config
// ========================================================
/**
 * 
 */
const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY as string

/**
 * 
 */
const etherscanApiKey = import.meta.env.VITE_ETHERSCAN_API_KEY as string

/**
 * 
 */
const infuraId = import.meta.env.VITE_INFURA_ID as string;

/**
 * 
 */
const appName = import.meta.env.VITE_APP_NAME as string;

/**
 * 
 */
const chains = defaultChains;

/**
 * 
 */
const defaultChain = chain.mainnet;

/**
 * 
 * @param chainId 
 * @returns 
 */
const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId)

/**
 * 
 * @param param0 
 * @returns 
 */
const connectors = ({ chainId }: { chainId?: number; }) => {
  // RPC
  const rpcUrls = chains.find((x) => x.id === chainId)?.rpcUrls ?? chain.mainnet.rpcUrls;

  // Return options
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true }
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true
      }
    }),
    new CoinbaseWalletConnector({
      options: {
        appName,
        jsonRpcUrl: `${rpcUrls.alchemy}/${infuraId}`
      }
    })
  ]
}

/**
 * 
 * @param param0 
 * @returns 
 */
const provider = ({ chainId }: ProviderConfig) =>
  providers.getDefaultProvider(
    isChainSupported(chainId) ? chainId : defaultChain.id,
    {
      alchemy: alchemyApiKey,
      etherscan: etherscanApiKey,
      infura: infuraId,
    },
  );

/**
 * 
 * @param param0 
 * @returns 
 */
const webSocketProvider = ({ chainId }: ConnectorsConfig) =>
  isChainSupported(chainId)
    ? new providers.InfuraWebSocketProvider(chainId, infuraId)
    : undefined

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
})

// Main Render
// ========================================================
ReactDOM.render(
  <React.StrictMode>
    <WagmiProvider
      client={client}
    >
      <App />
    </WagmiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
