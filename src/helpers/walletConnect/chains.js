
import axios from 'axios';

const NFT_API_URL = 'http://93.189.91.137:8080/api/testnetWalletNFTs'

const BNB = {
  name: "BNB",
  symbol: "BNB",
  decimals: 18,
};

const MATIC = {
  name: "MATIC",
  symbol: "MATIC",
  decimals: 18,
};

export const CHAINS = {
  97: {
    urls: [
      "https://endpoints.omniatech.io/v1/bsc/testnet/public/",
      "https://bsctestapi.terminet.io/rpc/",
      "https://data-seed-prebsc-1-s1.binance.org:8545/",
      "https://data-seed-prebsc-2-s3.binance.org:8545/",
      "https://data-seed-prebsc-1-s3.binance.org:8545/",
      "https://data-seed-prebsc-2-s2.binance.org:8545/",
      "https://data-seed-prebsc-1-s2.binance.org:8545/",
      "https://data-seed-prebsc-2-s1.binance.org:8545/",
    ],
    name: "BNB Smart Chain Testnet",
    nativeCurrency: BNB,
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
    // blockExplorerUrls: ["https://explorer.binance.org/smart-testnet"],
  },
  56: {
    urls: ["https://bsc-dataseed.binance.org/"],
    name: "BNB Smart Chain Mainnet",
    nativeCurrency: BNB,
    blockExplorerUrls: ["https://bscscan.com"],
  },
  80001: {
    urls: ["https://rpc.ankr.com/polygon_mumbai"],
    name: "Polygon Mumbai Testnet",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  137: {
    urls: ["https://polygon.rpc.blxrbdn.com"],
    name: "Polygon Mainnet",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://polygonscan.com/"],
  },

};

function isExtendedChainInformation(chainInformation) {
  return !!chainInformation.nativeCurrency;
}

export function getAddChainParameters(chainId) {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

export const URLS = Object.keys(CHAINS).reduce((accumulator, chainId) => {
  const validURLs = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});



export const fetchWalletNFTs = async (addr) => {
  try {

    const response = await axios.get(`${NFT_API_URL}/${addr}`);
    // const response = await axios.get(`${NFT_API_URL}/${addr}?network=BSC_TESTNET`);
    const data = response.data.allNFTs
    return data

  } catch (error) {
    console.error('Error fetching Wallet nft :', error.message);
  }
};




