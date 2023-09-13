import { useTranslation } from "next-i18next";
import { getAddChainParameters } from "@src/helpers/walletConnect/chains";
import Web3ModalContainer from "@src/containers/web3modal";
import { DEFAULT_CHAIN_ID } from "@src/config";
import { getRequest, postRequest } from "@src/helpers/api";
import { API_URL_GENERATE_NOUNCE, API_URL_MATAMASK_AUTH } from "./const";
import detectEthereumProvider from "@metamask/detect-provider";
import { Fragment, useEffect, useState } from "react";
import { hooks, metaMask } from "@src/components/wallet/connectors/metamask";
import { saveCookie } from "@src/helpers/cookie";
import { KEY_USER, KEY_TOKEN } from "@src/config";
import message from "@src/helpers/message";
import { Spin } from "antd";
import UserContainer from "@src/containers/userContainer";
import { SITE_URL } from "@src/config";
import { isAuth, removeCredentials } from "@src/helpers/authUtils";
import IsWalletConnectedContainer from "@src/containers/isWalletConnected";
import getCurrentNetwork from "@src/helpers/getCurrentNetwork";

const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

export default function WalletCard({
  className,
  icon,
  name,
  connector,
  chainId,
  isActivating,
  isActive,
  error,
  setError,
  accounts,
  provider,
}) {
  const [t, i18n] = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const web3ModalContext = Web3ModalContainer.useContainer();
  const isWalletConnected = IsWalletConnectedContainer.useContainer();
  const userData = UserContainer.useContainer();
  const defaultNetwork = parseInt(DEFAULT_CHAIN_ID);
  const [loginPending, setLoginPending] = useState(false);
  const network = getCurrentNetwork();


  useEffect(() => {
    if (accounts && accounts?.length !== 0) {
      setLoginPending(true);
      if (loginPending !== true) login(accounts);
    }
  }, [accounts]);
 
  
  const login = async account => {
    setLoading(true);
    const publicAddress = account[0].toLowerCase();
    const provider = await detectEthereumProvider();
    try {
      const responseApiNounce = await postRequest(API_URL_GENERATE_NOUNCE, {
        publicAddress,
      });
      const from = publicAddress;
      const msg = responseApiNounce.data.message;
      const signature = await provider.request({
        method: "personal_sign",
        params: [msg, from, ""],
      });
      const responseApiAuthMetamask = await postRequest(API_URL_MATAMASK_AUTH, {
        publicAddress,
        signature,
        blockChain: network.blockChain,
      });

      console.log("responseApiAuthMetamask -- ", responseApiAuthMetamask)

      saveCookie(KEY_TOKEN, responseApiAuthMetamask.data.accessToken);
      saveCookie(KEY_USER, JSON.stringify(responseApiAuthMetamask.data.user));
      userData.set(responseApiAuthMetamask.data.user);
      isWalletConnected.set(true);
      setLoading(false);
      web3ModalContext.set(false);
      message("success", t("welcome dear!"));
      window.location.reload();
    } catch (e) {
      console.log("here", e);
      if (e?.code) {
        message("error", e.message);
      }
      setLoading(false);
      userData.set({});
      removeCredentials();
    }
  };



  const activateMetamask = async () => {
    try {
      setLoading(true);
      const provider = await detectEthereumProvider();
      await connector.activate(getAddChainParameters(defaultNetwork));
      if (isAuth() === false && accounts && accounts?.length !== 0) {
        login(accounts);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      if (e?.code) {
        message("error", e?.message);
      } else {
        message("error", t("Metamask is not installed!"));
      }
      setError(e);
    }
  };



  return (
    <Fragment>
      {loading ? (
        <Spin />
      ) : (
        <li className={className}>
          <div className="content" onClick={() => activateMetamask()}>
            <img src={icon} />
            <span>{t(name)}</span>
          </div>
        </li>
      )}
    </Fragment>
  );
}



