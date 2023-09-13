import { useState } from "react";
import { createContainer } from "unstated-next";

function useWeb3Modal() {
  let [open, setOpen] = useState(false);
  let set = visibleStatus => setOpen(visibleStatus);
  return { open, set };
}
let Web3ModalContainer = createContainer(useWeb3Modal);
export default Web3ModalContainer;
