import { useState, useEffect, Fragment } from "react";
import ProfileAvatar from "@src/components/profileAvatar";
import StateLessDrawer from "@src/components/statelessDrawer";
import AccountBalanceWalletDrawerContainer from "@src/containers/accountBalanceWalletDrawer";
import { hooks, metaMask } from "@src/components/wallet/connectors/metamask";
import { truncateAddress } from "@src/helpers/walletConnect/utils.web3";
import { formatEther } from "@ethersproject/units";
import { useTranslation } from "next-i18next";
import { Button, Typography, Input, Form, Dropdown, Menu, Spin } from "antd";
import StateLessModal from "@src/components/statelessModal";
import detectEthereumProvider from "@metamask/detect-provider";
import Style from './style';
import {
  DownOutlined,
  LogoutOutlined,
  Loading3QuartersOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { ROUTE_HOME, ROUTE_LOGIN } from "@src/routes";
import { isAuth, removeCredentials } from "@src/helpers/authUtils";
import UserContainer from "@src/containers/userContainer";
import { get } from "lodash";
import copyTextToClipboard from "@src/helpers/copyToClipboard";
import { getRequest } from "@src/helpers/api";
import { API_URL_USER_BALANCE } from "./const";
import IsWalletConnectedContainer from "@src/containers/isWalletConnected";
import getCurrentNetwork from "@src/helpers/getCurrentNetwork";

const { Paragraph } = Typography;

const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

// function useBalances(provider, accounts) {
//   const [balances, setBalances] = useState();
//   useEffect(() => {
//     if (provider && accounts?.length) {
//       let stale = false;
//       Promise.all(accounts.map(account => provider.getBalance(account))).then(
//         balances => {
//           if (stale) return;
//           setBalances(balances);
//         }
//       );
//       return () => {
//         stale = true;
//         setBalances(undefined);
//       };
//     }
//   }, [provider, accounts]);

//   return balances;
// }


export default function AccountBalanceDrawer() {
  const [t, i18n] = useTranslation("common");
  const [visibleFundsModal, setVisibleFundsModal] = useState(false);
  const [userUnitBalance, setUserUnitBalance] = useState(0);
  const [userUsdBalance, setUserUsdBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const accountBalanceWalletDrawerContainerContext =
    AccountBalanceWalletDrawerContainer.useContainer();
  const userData = UserContainer.useContainer();
  const isWalletConnected = IsWalletConnectedContainer.useContainer();
  const accounts = useAccounts();
  const provider = useProvider();
  const [form] = Form.useForm();
  const router = useRouter();
  const username = get(userData, "user.username", "");
  const network = getCurrentNetwork();

  useEffect(() => {
    if (network.blockChain) {
      getBalanceApi();
    }
  }, [network]);

  async function getBalanceApi() {
    if (isAuth()) {
      try {
        setLoading(true);

        const response = await getRequest(API_URL_USER_BALANCE, { blockChain: network.blockChain, });
        setUserUnitBalance(response.data.data.unitBalance.balance);
        setUserUsdBalance(response.data.data.usdBalance);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
  }

  function onCopy() {
    copyTextToClipboard(accounts[0]);
  }

  function renderUsername() {
    if (username) {
      if (username.length >= 20) {
        return truncateAddress(username);
      } else {
        return username;
      }
    }
  }

  if (accounts === undefined) return null;
  const logout = async () => {
    if (metaMask?.deactivate) {
      metaMask.deactivate();
    } else {
      // accountBalanceWalletDrawerContainerContext.set(false);
      isWalletConnected.set(false);
      userData.set({});
      removeCredentials();
      metaMask.resetState();
      window.location.replace(ROUTE_HOME);
    }
  };
  const refreshFunds = async () => {
    getBalanceApi();
  };
  const menu = (
    <Menu
      size="large"
      items={[
        {
          key: "1",
          label: (
            <div className="log-out" onClick={logout}>
              {t("logout")}
            </div>
          ),
          icon: <LogoutOutlined onClick={logout} />,
        },
        {
          key: "2",
          label: (
            <div className="refresh-funds" onClick={refreshFunds}>
              {t("refresh funds")}
            </div>
          ),
          icon: <Loading3QuartersOutlined onClick={refreshFunds} />,
        },
      ]}
    />
  );

  return (
    <Style>
      <div className="wrapping-sidebar">
        <StateLessDrawer
          className="account-balance-wallet-drawer"
          visibleStatus={accountBalanceWalletDrawerContainerContext.open}
          onClose={() => accountBalanceWalletDrawerContainerContext.set(false)}
          title=""
          closable={false}
          placement="right"
          titleImage="/assets/icons/user-walllet-connect-modal.svg"
          destroyOnClose={true}
        >
          <Fragment >
            <Dropdown
              size="large"
              overlay={menu}
              trigger={["click"]}
              overlayClassName="big"
            >
              <div className="user-avatar">
                <div className="content">
                  <ProfileAvatar size={35} />
                  <div className="details">
                    <span className="username">{renderUsername()}</span>
                    <Paragraph
                      copyable={{
                        text: accounts?.length && accounts[0],
                      }}
                    >
                      <span className="public-address">
                        {accounts?.length && truncateAddress(accounts[0])}
                      </span>
                    </Paragraph>
                  </div>
                </div>
                <div style={{color:"white"}} className="arrow-bottom">
                  <DownOutlined />
                </div>
              </div>
            </Dropdown>

            <Spin spinning={loading}>
              <div className="balance-box">
                <p>{t("Total balance")}</p>
                {provider && accounts?.length !== 0 && (
                  <h5>{parseFloat(userUnitBalance).toFixed(4)} {network.currency}</h5>
                )}
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={() => setVisibleFundsModal(true)}
                >
                  {t("Add Funds")}
                </Button>
              </div>
            </Spin>
          </Fragment>
        </StateLessDrawer>
        <StateLessModal
          className="add-funds-modal"
          visibleStatus={visibleFundsModal}
          onClose={() => setVisibleFundsModal(false)}
          footer={null}
          title="Add funds"
          width={550}
          destroyOnClose={true}
        >
          <img src="/assets/icons/wallet-connect.svg" />
          <p>
            {t(
              "Transfer funds from an exchange or another wallet to your wallet address below:"
            )}
          </p>
          <Form
            form={form}
            name="horizontal_login"
            layout="inline"
            onFinish={onCopy}
          >
            <Form.Item className="input-section" name="account">
              <Input
                size="large"
                disabled
                placeholder={accounts?.length !== 0 ? accounts[0] : ""}
              />
            </Form.Item>
            <Form.Item className="button-section">
              <Button type="primary" size="large" htmlType="submit">
                {t("Copy")}
              </Button>
            </Form.Item>
          </Form>
        </StateLessModal>
      </div>
    </Style>
  );
}



