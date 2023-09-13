import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core";
import {
  hooks as metaMaskHooks,
  metaMask,
} from "@src/components/wallet/connectors/metamask";
import {
  hooks as networkHooks,
  network,
} from "@src/components/wallet/connectors/network";
import {
  hooks as walletConnectHooks,
  walletConnect,
} from "@src/components/wallet/connectors/walletConnect";
import { getName } from "@src/helpers/walletConnect/getName";

const connectors = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [network, networkHooks],
];

function Child() {
  const { connector } = useWeb3React();
  return null;
}

export default function ProviderExample() {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Child />
    </Web3ReactProvider>
  );
}
