import { useState } from "react";
import { createContainer } from "unstated-next";

function isWalletConnected() {
  let [isConnected, setIsConnected] = useState(false);
  let set = connected => setIsConnected(connected);
  return { isConnected, set };
}
let IsWalletConnectedContainer = createContainer(isWalletConnected);
export default IsWalletConnectedContainer;
