import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";

export const [walletConnect, hooks] = initializeConnector(
  actions =>
    new WalletConnect({
      actions,
      options: {
        rpc,
      },
    })
);
