import { message } from "antd";
// import { networkParams } from "@src/helpers/walletConnect/networks";

export const truncateAddressLarge = address => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};
export const truncateAddress = account => {
  if (!account) return "No Account";
  return `${account.slice(0, 6)}...${account.slice(
    account.length - 4,
    account.length
  )}`;
};

export const toHex = num => {
  const val = Number(num);
  return "0x" + val.toString(16);
};
// export const switchChain = async (library, chainId) => {
//   try {
//     await library.provider.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: toHex(chainId) }],
//     });
//   } catch (switchError) {
//     if (switchError.code === 4902) {
//       try {
//         await library.provider.request({
//           method: "wallet_addEthereumChain",
//           params: [networkParams[toHex(chainId)]],
//         });
//       } catch (error) {
//         message.info(error.message);
//       }
//     }
//   }
// };
export const setProvider = type => {
  window.localStorage.setItem("lendochain_wallet_provider", type);
};
export const getProvider = (connectors, activate) => {
  const provider = window.localStorage.getItem("lendochain_wallet_provider");
  if (provider) activate(connectors[provider]);
};
export const removeProvider = () => {
  window.localStorage.setItem("provider", undefined);
};
