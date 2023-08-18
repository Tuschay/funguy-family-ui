import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { polygon } from 'viem/chains';
// import type { Chain } from 'wagmi';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

// const stealthTest: Chain = {
//   id: 29_556,
//   name: 'StealthTest',
//   network: 'stealthtest',
//   // iconUrl: 'https://example.com/icon.svg',
//   // iconBackground: '#fff',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Ether',
//     symbol: 'ETH',
//   },
//   rpcUrls: {
//     default: {
//       http: [
//         'https://18d22e6b-3d6f-4d6a-9ca3-32c135ee98a4.ethereum.staging-42.nameless.io',
//       ],
//     },
//     public: {
//       http: [
//         'https://18d22e6b-3d6f-4d6a-9ca3-32c135ee98a4.ethereum.staging-42.nameless.io',
//       ],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'StealthTest',
//       url: 'https://staging-app.nameless.io/Icckden49XZIlXc0pOVY1z9W2wG2/18d22e6b-3d6f-4d6a-9ca3-32c135ee98a4/logs/eth',
//     },
//     etherscan: {
//       name: 'StealthTest',
//       url: 'https://staging-app.nameless.io/Icckden49XZIlXc0pOVY1z9W2wG2/18d22e6b-3d6f-4d6a-9ca3-32c135ee98a4/logs/eth',
//     },
//   },
//   testnet: false,
// };

const { chains, provider } = configureChains(
  [
    polygon,
    // mainnet,
    // goerli,
    // stealthTest,
  ],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'FunguyFamily',
  projectId: 'FUNGUY_FAMILY',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      chains={chains}
      theme={darkTheme({
        accentColor: 'black',
      })}
    >
      <Component {...pageProps} />
    </RainbowKitProvider>
  </WagmiConfig>
);

export default MyApp;
