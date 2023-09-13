import { metaMask } from "@src/components/wallet/connectors/metamask";
import { useRouter } from "next/router";
import { ROUTE_HOME } from "@src/routes";
import AccountBalanceWalletDrawerContainer from "@src/containers/accountBalanceWalletDrawer";
export default function useLogout() {
  const accountBalanceWalletDrawerContainerContext =
    AccountBalanceWalletDrawerContainer.useContainer();
  const router = useRouter();
  if (metaMask?.deactivate) {
    void metaMask.deactivate();
  } else {
    void metaMask.resetState();
    accountBalanceWalletDrawerContainerContext.set(false);
    router.replace(ROUTE_HOME);
  }
}
