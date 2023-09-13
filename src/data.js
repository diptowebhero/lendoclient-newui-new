import {
  BLOCKCHAIN_BSC,
  NETWORK_NAME_BSC,
  CHAIN_ID_BSC,
  BLOCK_EXPLORER_BSC,
  CURRENCY_BSC,
  BLOCKCHAIN_POLYGON,
  NETWORK_NAME_POLYGON,
  CHAIN_ID_POLYGON,
  BLOCK_EXPLORER_POLYGON,
  CURRENCY_POLYGON
} from "@src/config";

export const siteLanguages = [
  { lang: "en", direction: "ltr" },
  { lang: "fa", direction: "rtl" },
  { lang: "ar", direction: "rtl" },
  { lang: "fr", direction: "ltr" },
];
export const categories = [
  {
    value: "art",
    label: "Art",
    id: "0a0a737e-2b0a-43b5-ad57-7f805888ae02",
    slug: "art",
  },
  {
    value: "collectibles",
    label: "Collectibles",
    id: "0a0a737e-2b0a-43b5-ad57-7f803888ae02",
    slug: "collectibles",
  },
  {
    value: "photography",
    label: "Photography",
    id: "0a0a737e-2b0a-43b5-ad57-7f801888ae02",
    slug: "photography",
  },
  {
    value: "sports",
    label: "Sports",
    id: "0a0a737e-2b0a-43b5-ad57-7f805188ae02",
    slug: "sports",
  },
  {
    value: "trading Card",
    label: "Trading Card",
    id: "0a0a737e-2b0a-43b5-ad57-7f805288ae02",
    slug: "trading-card",
  },
  {
    value: "Utility",
    label: "Utility",
    id: "0a0a733e-2b0a-43b5-ad57-7f805848ae02",
    slug: "utility",
  },
  {
    value: "Carbon Credit",
    label: "Carbon Credit",
    id: "0a1a737e-2b0a-43b5-ad57-7f805848ae02",
    slug: "carbon-credit",
  },
];


export const networks = [
  {
    blockChain: BLOCKCHAIN_BSC,
    name: NETWORK_NAME_BSC,
    chainId: CHAIN_ID_BSC,
    blockExplorer: BLOCK_EXPLORER_BSC,
    currency: CURRENCY_BSC,
    icon: "/assets/icons/bsc.svg",
    queryName: "BSC"
  },
  {
    blockChain: BLOCKCHAIN_POLYGON,
    name: NETWORK_NAME_POLYGON,
    chainId: CHAIN_ID_POLYGON,
    blockExplorer: BLOCK_EXPLORER_POLYGON,
    currency: CURRENCY_POLYGON,
    icon: "/assets/icons/polygon.png",
    queryName: "POLYGON"
  }
]