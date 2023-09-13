import { BLOCK_EXPLORER, BLOCK_EXPLORER_POLYGON, BLOCK_EXPLORER_BSC } from "@src/config";

export default function blockExplorerLink(id, type, contractAddress, blockChain) {
  let blockExplorer = blockChain === "POLYGON" ? BLOCK_EXPLORER_POLYGON : BLOCK_EXPLORER_BSC
  if (type === "tx") {
    return `${blockExplorer}tx/${id}`;
  } else if (type === "token") {
    return `${blockExplorer}token/${contractAddress}?a=${id}`;
  } else if (type === "address") {
    return `${blockExplorer}address/${id}`;
  }
}
