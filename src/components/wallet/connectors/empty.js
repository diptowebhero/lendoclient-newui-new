import { initializeConnector } from "@web3-react/core";
import { EMPTY } from "@web3-react/empty";

export const [empty, hooks] = initializeConnector(() => EMPTY);
