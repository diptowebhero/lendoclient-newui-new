import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "@src/styles";
import LocaleDirectionContainer from "@containers/localeDirectionContainer";
import { Fragment } from "react";
import NextNProgress from "nextjs-progressbar";
import Web3ModalContainer from "@src/containers/web3modal";
import LoadingContainer from "@src/containers/globalLoading";
import AccountBalanceWalletDrawerContainer from "@src/containers/accountBalanceWalletDrawer";
import PWA from "@src/components/pwa";
import { hooks, metaMask } from "@src/components/wallet/connectors/metamask";
import { useEffect, useState } from "react";
import { notification } from "antd";
import { DEFAULT_CHAIN_ID } from "@src/config";
import { getAddChainParameters } from "@src/helpers/walletConnect/chains";
import { isAuth } from "@src/helpers/authUtils";
import UserContainer from "@src/containers/userContainer";
import { useRouter } from "next/router";
import IsWalletConnectedContainer from "@src/containers/isWalletConnected";
import { isEmpty } from "lodash";
import detectEthereumProvider from "@metamask/detect-provider";
import message from "@src/helpers/message";
import { networks } from "@src/data";
import getCurrentNetwork from "@src/helpers/getCurrentNetwork";

const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

function MyApp({ Component, pageProps }) {
  const chainId = useChainId();
  const accounts = useIsActive();
  const [error, setError] = useState(undefined);
  const defaultNetwork = parseInt(DEFAULT_CHAIN_ID);
  const router = useRouter();
  const network = getCurrentNetwork()

  const activateMetamask = async () => {
    try {
      await metaMask.activate(getAddChainParameters(parseInt(networks[0].chainId)));
    } catch (e) {
      console.log(e);
      if (e?.code) {
        message("error", e?.message);
      }
      setError(e);
    }
  };

  useEffect(() => {
    // if (isAuth()) {
    void metaMask.connectEagerly().catch(() => { });
    // }
  }, []);
  useEffect(() => {
    if (chainId !== undefined && chainId !== null) {
      if (chainId !== parseInt(networks[0].chainId) && chainId !== parseInt(networks[1].chainId)) {
        notification.destroy();
        notification.warning({
          message: "",
          maxCount: 1,
          duration: 0,
          placement: "bottomRight",
          className: "change-network-message",
          description: `You're using other network in yout wallet, To use lendochain, please switch to ${networks[0].name} or ${networks[1].name}. to change it, please click here!`,
          onClick: () => {
            activateMetamask();
          },
        });
      } else {
        notification.destroy();
      }
    }
  }, [chainId, accounts, networks]);

  const { asPath, isReady } = router;

  useEffect(() => {
    if (!isReady) return;

    const controller = new AbortController();
    if (network.blockChain !== undefined) {
      router.query.blockChain = network.blockChain;
      router.replace({
        query: { ...router.query, blockChain: network.blockChain },
      });

    }
    return () => {
      // cancel requests if the inputs change
      controller.abort();
    };

  }, [isReady, asPath, network]);

  return (
    <Fragment>
      <PWA />
      <NextNProgress height={6} color={theme.colors.primary} />
      <LocaleDirectionContainer.Provider>
        <Web3ModalContainer.Provider>
          <IsWalletConnectedContainer.Provider>
            <AccountBalanceWalletDrawerContainer.Provider>
              <LoadingContainer.Provider>
                <UserContainer.Provider>
                  <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <Component {...pageProps} />
                  </ThemeProvider>
                </UserContainer.Provider>
              </LoadingContainer.Provider>
            </AccountBalanceWalletDrawerContainer.Provider>
          </IsWalletConnectedContainer.Provider>
        </Web3ModalContainer.Provider>
      </LocaleDirectionContainer.Provider>
    </Fragment>
  );
}

export default appWithTranslation(MyApp);
