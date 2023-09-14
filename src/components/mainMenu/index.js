import Icon, {
  EditOutlined,
  MenuOutlined,
  SearchOutlined,
  SettingOutlined,
  TableOutlined,
  UserOutlined,
} from "@ant-design/icons";
import detectEthereumProvider from "@metamask/detect-provider";
import { hooks, metaMask } from "@src/components/wallet/connectors/metamask";
import WalletModal from "@src/components/wallet/walletModal";
import { SITE_URL } from "@src/config";
import AccountBalanceWalletDrawerContainer from "@src/containers/accountBalanceWalletDrawer";
import IsWalletConnectedContainer from "@src/containers/isWalletConnected";
import UserContainer from "@src/containers/userContainer";
import Web3ModalContainer from "@src/containers/web3modal";
import { getUser, isAuth, removeCredentials } from "@src/helpers/authUtils";
import {
  ROUTE_ACCOUNT,
  ROUTE_ACCOUNT_SETTING,
  ROUTE_CREATE_NFT,
  ROUTE_EXPLORE,
  ROUTE_MY_COLLECTIONS,
  ROUTE_RANKINGS,
} from "@src/routes";
import { Button, Drawer, Dropdown, Menu } from "antd";
import { get, isEmpty } from "lodash";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import ProfileAvatar from "../profileAvatar";
import AccountBalanceDrawer from "../wallet/walletBalanceDrawer";
import Style from "./style";

const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

const MENU_ITEMS = [
  {
    title: "explores",
    link: ROUTE_EXPLORE,
    classStyle: "wallet",
    img: "/assets/images/img/binancedexicon.png",
  },
  {
    title: "Rankings",
    link: { pathname: ROUTE_RANKINGS, query: { sortBy: "TOP" } },
    classStyle: "rewards",
    img: "/assets/images/img/rewardsicon.png",
  },
  {
    title: "Create",
    link: ROUTE_CREATE_NFT,
    classStyle: "create",
    img: "/assets/images/img/addicon.png",
  },
];

export default function MainMenu({ MobileSearchToggle }) {
  const [t, i18n] = useTranslation("common");
  const [walletIsConnected, setWalletIsConnected] = useState(false);
  const isActiveMetaMask = useIsActive();
  const accounts = useAccounts();
  const router = useRouter();
  const isWalletConnected = IsWalletConnectedContainer.useContainer();
  const web3ModalContext = Web3ModalContainer.useContainer();
  const accountBalanceDrawerContext =
    AccountBalanceWalletDrawerContainer.useContainer();
  const userData = UserContainer.useContainer();
  const [isMobileMenuDrawerVisible, setIsMobileMenuDrawerVisible] =
    useState(false);
  const replaceUrl = (SITE_URL = "") => {
    return SITE_URL.replace(/https?:\/\//i, "");
  };

  async function check() {
    const provider = await detectEthereumProvider();
    if (provider) {
      provider.on("chainChanged", _chainId => {
        metaMask.connectEagerly().catch(() => {});
      });
    }
  }
  useEffect(() => {
    check();
  }, []);

  async function checkConnection() {
    ethereum
      .request({ method: "eth_accounts" })
      .then(handleAccountsChanged)
      .catch(console.error);
  }

  function handleAccountsChanged(accounts) {
    console.log(accounts);
    const currentUserPublicAddress = get(getUser(), "publicAddress");
    console.log(currentUserPublicAddress);
    if (accounts.length === 0) {
      console.log("You're not connected to MetaMask");
      isWalletConnected.set(false);
    } else {
      if (isAuth()) {
        if (currentUserPublicAddress == accounts[0]) {
          console.log("login");
          isWalletConnected.set(true);
        } else {
          console.log("no login");
          void metaMask.resetState();
          isWalletConnected.set(false);
          removeCredentials();
          userData.set({});
          window.location.reload();
          // openWalletConnectModal();
        }
      } else {
        console.log("no login");
        void metaMask.resetState();
        isWalletConnected.set(false);

        // openWalletConnectModal();
      }
      console.log("connected");
    }
  }

  useEffect(() => {
    detectEthereumProvider()
      .then(provider => {
        if (provider && provider.isMetaMask) {
          provider.on("accountsChanged", handleAccountsChanged);
          checkConnection();
        } else {
          console.log("Please install MetaMask!");
          removeCredentials();
          userData.set({});
        }
      })
      .catch(e => {
        // console.log("milad", e);
      });
  }, []);

  const UserMenu = (
    <Menu
      style={{ width: 216, background: "#2A2C2D" }}
      className="manu-item-listing"
      items={[
        {
          label: (
            <Link href={ROUTE_ACCOUNT} prefetch={false}>
              <a>{t("Profile")}</a>
            </Link>
          ),
          icon: <UserOutlined />,
          key: "0",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Link href={ROUTE_CREATE_NFT} prefetch={false}>
              <a>{t("Create")}</a>
            </Link>
          ),
          icon: <EditOutlined />,
          key: "3",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Link href={ROUTE_MY_COLLECTIONS} prefetch={false}>
              <a>{t("My Collections")}</a>
            </Link>
          ),
          icon: <TableOutlined />,
          key: "4",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Link href={ROUTE_ACCOUNT_SETTING} prefetch={false}>
              <a>{t("Setting")}</a>
            </Link>
          ),
          icon: <SettingOutlined />,
          key: "5",
        },
      ]}
    />
  );

  function renderFarm() {
    return MENU_ITEMS.map((item, index) => {
      const { title, link, classStyle, img } = item;
      return (
        <li className={`menu-item ${classStyle}`} key={index}>
          <Link href={link} prefetch={false}>
            <div className={`${classStyle}`} style={{ height: "40px" }}>
              <img src={img} alt={classStyle} /> &nbsp;&nbsp;
              <a className={`${router.pathname === link ? "active" : null} `}>
                {t(title)}
              </a>
            </div>
          </Link>
        </li>
      );
    });
  }
  function openWalletConnectModal() {
    web3ModalContext.set(true);
  }
  function openMobileMenuDrawer(e) {
    e.preventDefault();
    setIsMobileMenuDrawerVisible(true);
  }
  const closeMobileMenuDrawer = () => {
    setIsMobileMenuDrawerVisible(false);
  };
  function openAccountBalanceDrawer(e) {
    e.preventDefault();
    accountBalanceDrawerContext.set(true);
  }
  const renderIsLoggedIn = () => {
    if (isWalletConnected.isConnected) {
      return (
        <Fragment>
          <li className="only-in-desktop">
            <Dropdown overlay={UserMenu} trigger={["click"]} placement="bottom">
              <a className="gray-link user-avatar">
                <ProfileAvatar />
              </a>
            </Dropdown>
          </li>
          <li className="only-in-desktop" onClick={openAccountBalanceDrawer}>
            <a className="gray-link">
              <svg
                id="tabler-wallet"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  id="Path_7"
                  data-name="Path 7"
                  d="M0,0H24V24H0Z"
                  fill="rgba(0,0,0,0)"
                />
                <path
                  id="Path_8"
                  data-name="Path 8"
                  d="M17,8V5a1,1,0,0,0-1-1H6A2,2,0,0,0,6,8H18a1,1,0,0,1,1,1v3m0,4v3a1,1,0,0,1-1,1H6a2,2,0,0,1-2-2V6"
                  fill="rgba(0,0,0,0)"
                  stroke="#888"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  id="Path_9"
                  data-name="Path 9"
                  d="M20,12v4H16a2,2,0,0,1,0-4h4"
                  fill="rgba(0,0,0,0)"
                  stroke="#888"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </a>
          </li>
        </Fragment>
      );
    } else {
      return (
        <li className="only-in-desktop">
          <a className="gray-link" onClick={openWalletConnectModal}>
            <svg
              id="tabler-wallet"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                id="Path_7"
                data-name="Path 7"
                d="M0,0H24V24H0Z"
                fill="rgba(0,0,0,0)"
              />
              <path
                id="Path_8"
                data-name="Path 8"
                d="M17,8V5a1,1,0,0,0-1-1H6A2,2,0,0,0,6,8H18a1,1,0,0,1,1,1v3m0,4v3a1,1,0,0,1-1,1H6a2,2,0,0,1-2-2V6"
                fill="rgba(0,0,0,0)"
                stroke="#888"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                id="Path_9"
                data-name="Path 9"
                d="M20,12v4H16a2,2,0,0,1,0-4h4"
                fill="rgba(0,0,0,0)"
                stroke="#888"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </a>
        </li>
      );
    }
  };

  return (
    <Style>
      <ul className="gray-link">
        {renderFarm()}
        {renderIsLoggedIn()}
        <li className="mobile-menu">
          <a onClick={() => MobileSearchToggle()}>
            <Icon
              style={{ fontSize: "16px", color: "#08c" }}
              width={"24"}
              height={"24"}
              component={SearchOutlined}
            />
          </a>
        </li>
        <li className="mobile-menu search-icon">
          <a onClick={openMobileMenuDrawer}>
            <Icon
              style={{ fontSize: "16px", color: "#08c" }}
              width={"24"}
              height={"24"}
              component={MenuOutlined}
            />
          </a>
        </li>
      </ul>

      <WalletModal />
      {!isEmpty(userData.user) ? <AccountBalanceDrawer /> : <Fragment />}
      <Drawer
        className="mobile-menu-drawer"
        placement="right"
        onClose={closeMobileMenuDrawer}
        open={isMobileMenuDrawerVisible}
        title={<img src="/assets/images/logo.svg" />}
      >
        <div className="content">
          <ul className="menu">
            {renderFarm()}
            {!isEmpty(userData.user) ? (
              <Fragment>
                <li
                  className="menu-item"
                  onClick={e => {
                    e.preventDefault();
                    accountBalanceDrawerContext.set(true);
                  }}
                >
                  <a>{t("My Wallet")}</a>
                </li>
                <li className="menu-item">
                  <Link href={ROUTE_ACCOUNT} prefetch={false}>
                    <a>{t("Profile")}</a>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link href={ROUTE_MY_COLLECTIONS} prefetch={false}>
                    <a>{t("My Collections")}</a>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link href={ROUTE_ACCOUNT_SETTING} prefetch={false}>
                    <a>{t("Setting")}</a>
                  </Link>
                </li>
              </Fragment>
            ) : (
              <Fragment />
            )}
          </ul>
          {isEmpty(userData.user) ? (
            <div>
              <a
                className="metamask-note"
                href={`https://metamask.app.link/dapp/${replaceUrl(SITE_URL)}`}
                rel="noreferrer"
              >
                click here to use metamask mobile
              </a>
              <Button
                size="large"
                block
                type="primary"
                onClick={openWalletConnectModal}
              >
                {t("Wallet Connect")}
              </Button>
            </div>
          ) : (
            <Fragment />
          )}
        </div>
      </Drawer>
    </Style>
  );
}
