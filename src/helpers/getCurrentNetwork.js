import { hooks, metaMask } from "@src/components/wallet/connectors/metamask";
import { networks } from "@src/data";
import { getAddChainParameters } from "./walletConnect/chains";

const {
  useChainId
} = hooks;

function getCurrentNetwork() {
  const chainId = useChainId();
  let currentNetwork = networks.filter(function (item) {
    return parseInt(item.chainId) === parseInt(chainId);
  });
  return currentNetwork && currentNetwork.length ? currentNetwork[0] : [];
}

export async function switchNetwork(chainId) {
  let result = await metaMask.activate(getAddChainParameters(parseInt(chainId)));
  return result;
}

export default getCurrentNetwork;
