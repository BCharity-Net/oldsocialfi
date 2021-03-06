import '../styles.css'

import { ApolloProvider } from '@apollo/client'
import SiteLayout from '@components/SiteLayout'
import { providers } from 'ethers'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import NextNprogress from 'nextjs-progressbar'
import { ALCHEMY_ID } from 'src/constants'
import { chain, Connector, Provider } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

import client from '../apollo'

const supportedChains = [chain.polygonTestnetMumbai]
const defaultChain = chain.polygonTestnetMumbai

type ConnectorsConfig = { chainId?: number }

const connectors = ({ chainId }: ConnectorsConfig) => {
  const rpcUrl =
    supportedChains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    defaultChain.rpcUrls[0]

  return [
    new InjectedConnector({
      chains: supportedChains,
      options: { shimDisconnect: true }
    }),
    new WalletConnectConnector({
      options: {
        infuraId: ALCHEMY_ID,
        chainId: chain.polygonTestnetMumbai.id
      }
    }),
    new WalletLinkConnector({
      options: {
        appName: 'BCharity',
        jsonRpcUrl: `${rpcUrl}/${ALCHEMY_ID}`
      }
    })
  ]
}

type ProviderConfig = { chainId?: number; connector?: Connector }
const provider = ({ chainId }: ProviderConfig) =>
  new providers.AlchemyProvider(chainId, ALCHEMY_ID)

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider
      autoConnect
      connectorStorageKey="bcharity.wallet"
      connectors={connectors}
      provider={provider}
    >
      <ApolloProvider client={client}>
        <ThemeProvider defaultTheme="light" attribute="class">
          <Head>
            <title>BCharity</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, viewport-fit=cover"
            />
          </Head>
          <SiteLayout>
            <NextNprogress
              color="#8b5cf6"
              height={2}
              options={{ showSpinner: false }}
              showOnShallow
            />
            <Component {...pageProps} />
          </SiteLayout>
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  )
}

export default App
