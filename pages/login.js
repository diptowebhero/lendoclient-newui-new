import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Web3ModalContainer from "@src/containers/web3modal";
import { Fragment, useEffect } from "react";
import { isAuth } from "@src/helpers/authUtils";
import { Router, useRouter } from "next/router";
import { ROUTE_ACCOUNT, ROUTE_HOME } from "@src/routes";
import MetaMaskCard from "@src/components/wallet/walletModal/walletCards/metamask";
import Style from "@src/partials/login/style";
import UserContainer from "@src/containers/userContainer";
import { isEmpty } from "lodash";

export default function Login() {
  const [t, i18n] = useTranslation("common");
  const web3ModalContext = Web3ModalContainer.useContainer();
  const userData = UserContainer.useContainer();
  const router = useRouter();
  // useEffect(() => {
  //   if (isAuth()) {
  //     router.replace(ROUTE_HOME);
  //   } else {
  //     // web3ModalContext.set(true);
  //   }
  // }, []);

  useEffect(() => {
    if (!isEmpty(userData.user)) {
      router.replace(ROUTE_ACCOUNT);
    }
  }, [userData.user]);

  const renderFarm = () => {
    if (!userData.user) {
      return (
        <Fragment>
          <p>
            {t(
              "By connecting your wallet, you agree to our Terms of Service and our Privacy Policy."
            )}
          </p>
          <ul>
            <MetaMaskCard />
          </ul>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <h3>{t("you're logged in, redirect to home ...")}</h3>
        </Fragment>
      );
    }
  };

  return (
    <Mainlayout>
      <Seo title={t("Login")} />
      <Style>
        <div className="container pt60 pb60">
          <h1>{t("You need a crypto wallet to use LendaChain.")}</h1>
          <div className="login-page pt60 pb60">
            <div className="wallet-connect-modal">
              <div className="wallet-items">{renderFarm()}</div>
            </div>
          </div>
        </div>
      </Style>
    </Mainlayout>
  );
}
export const getServerSideProps = async ctx => {
  const { res, req, params, locale, query } = ctx;

  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
