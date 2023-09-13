import { useState } from "react";
import { createContainer } from "unstated-next";

function useAccountBalanceWalletDrawer() {
  let [open, setOpen] = useState(false);
  let set = visibleStatus => setOpen(visibleStatus);
  return { open, set };
}
let AccountBalanceWalletDrawerContainer = createContainer(
  useAccountBalanceWalletDrawer
);
export default AccountBalanceWalletDrawerContainer;
