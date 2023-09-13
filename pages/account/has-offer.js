import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Tooltip, message, Form, Collapse } from "antd";
import Style from "@partials/user/style";
import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import HeaderProfile from "@src/components/headerProfile";
import { TbShare } from "react-icons/tb";
import Link from "next/link";
import {
  ROUTE_ACCOUNT,
  ROUTE_ACCOUNT_ACTIVITY,
  ROUTE_ACCOUNT_COLLECTIONS,
  ROUTE_ACCOUNT_CREATED,
  ROUTE_ACCOUNT_FAVORITES,
  ROUTE_ACCOUNT_HAS_OFFER,
  ROUTE_ACCOUNT_MADE_OFFER,
  ROUTE_ACCOUNT_OTHERS,
  ROUTE_ACCOUNT_SETTING,
  ROUTE_SINGLE_ASSET,
} from "@src/routes";
import { getRequest, redirectOnServer } from "@src/helpers/api";
import { API_URL_PROFILE } from "@src/partials/user/const";
import get from "lodash/get";
import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import copyTextToClipboard from "@src/helpers/copyToClipboard";
import { SITE_URL } from "@src/config";
import ProfileSocial from "@src/components/profileSocial";
import { truncateAddress } from "@src/helpers/walletConnect/utils.web3";
import Table from "@src/components/table";
import AvatarWithVerified from "@src/components/avatarWithVerify";
import NetworkIconWithPrice from "@src/components/networkIconWithPrice";
import textDots from "@src/helpers/textDots";
import moment from "moment";
import NetworkIcon from "@src/components/networkIcon";

export default function AccountOther(props) {
  const { profileData, collectedData, usernameParam } = props;
  const [t, i18n] = useTranslation("common");
  const [form] = Form.useForm();
  const router = useRouter();
  const { query } = router;
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const username = get(profileData, "user.username", "");
  const avatar = get(profileData, "user.avatar", "");
  const heroAvatar = get(profileData, "user.heroAvatar", "");
  const publicAddress = get(profileData, "user.publicAddress", "");
  const joinedAt = get(profileData, "user.joinedAt", "");
  const links = get(profileData, "user.links", []);
  const bio = get(profileData, "user.bio", "");
  const isVerified = get(profileData, "user.isVerified", false);
  const total = get(collectedData, "metadata.total", 0);
  const offset = get(collectedData, "metadata.offset", 1);
  const offerItems = get(collectedData, "data.hasOffer", []);

  const columns = [
    {
      title: t("item"),
      dataIndex: "item",
      key: "item",
      render: ({ name, fileUrl, slug }) => (
        <Link href={ROUTE_SINGLE_ASSET.replace(":slug", slug)}>
          <a className="flex-inline rank-item">
            <AvatarWithVerified image={fileUrl} title={name} verified={false} />
            <span>{textDots(name, 30)}</span>
          </a>
        </Link>
      ),
    },
    {
      title: t("blockChain"),
      dataIndex: "item",
      key: "item",
      render: ({ blockChain }) => (
        <NetworkIcon
          blockchain={blockChain}
        />
      ),
    },
    {
      title: t("unit price"),
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (unitPrice, { item }) => (
        <NetworkIconWithPrice
          secondaryDesign={true}
          blockchain={item.blockChain}
          price={unitPrice}
        />
      ),
    },
    {
      title: t("floor diffrence"),
      dataIndex: "floorPriceDiff",
      key: "floorPriceDiff",
      render: (floorPrice, { }) => {
        const { amount, isHigher } = floorPrice;
        if (amount === 0) {
          return "--";
        }
        if (isHigher) {
          return `${amount}% ${t("above")}`;
        } else {
          return `${amount}% ${t("below")}`;
        }
      },
    },
    {
      title: t("from"),
      dataIndex: "from",
      key: "from",
      render: (from = "", { fromPublicAddress }) => (
        <Link
          href={ROUTE_ACCOUNT_OTHERS.replace(":username", fromPublicAddress)}
        >
          <a>{from.length >= 30 ? truncateAddress(from) : from}</a>
        </Link>
      ),
    },
    {
      title: t("Expiration"),
      dataIndex: "expiration",
      key: "expiration",
      render: expiration => moment(expiration).fromNow(),
    },

    {
      title: t("Received"),
      dataIndex: "created_at",
      key: "created_at",
      render: created_at => moment(created_at).fromNow(),
    },
  ];
  function onChangePagination(page) {
    router.replace({
      pathname: ROUTE_ACCOUNT_HAS_OFFER,
      query: { ...query, offset: page },
    });
  }
  return (
    <Style>
      <Seo title={username || publicAddress} desc={bio} isHome={false} />
      <Mainlayout>
        <HeaderProfile
          coverImage={heroAvatar}
          avatarImage={avatar}
          name={username}
          isVeryfied={isVerified}
          description={bio}
          joinedTime={joinedAt}
          publicAddress={publicAddress}
        >
          <div className="socials-box">
            <ul>
              <li>
                <a href="#">
                  <Tooltip title="copy link">
                    <TbShare
                      onClick={e => {
                        e.preventDefault();
                        copyTextToClipboard(
                          `${SITE_URL}${ROUTE_ACCOUNT_OTHERS.replace(
                            ":username",
                            username
                          )}`
                        );
                        message.success(t("Link Copied!"));
                      }}
                    />
                  </Tooltip>
                </a>
              </li>
              <ProfileSocial links={links} />
              {/* <li>
                <a href="#">
                  <Dropdown
                    arrow
                    overlay={moreMenu}
                    trigger={["click"]}
                    overlayClassName="big"
                  >
                    <div className="big-icon">
                      <TbDots />
                    </div>
                  </Dropdown>
                </a>
              </li> */}
            </ul>
          </div>
        </HeaderProfile>
        <div className="content pt40 pb40">
          <div className="container">
            <div className="profile-menu">
              <ul>
                <li>
                  <Link href={ROUTE_ACCOUNT}>
                    <a>{t("collected")}</a>
                  </Link>
                </li>
                <li>
                  <Link href={ROUTE_ACCOUNT_COLLECTIONS}>
                    <a>{t("collections")}</a>
                  </Link>
                </li>
                <li>
                  <Link href={ROUTE_ACCOUNT_CREATED}>
                    <a>{t("created")}</a>
                  </Link>
                </li>
                <li>
                  <Link href={ROUTE_ACCOUNT_ACTIVITY}>
                    <a>{t("activity")}</a>
                  </Link>
                </li>
                <li>
                  <Link href={ROUTE_ACCOUNT_MADE_OFFER}>
                    <a>{t("offers made")}</a>
                  </Link>
                </li>
                <li>
                  <Link href={ROUTE_ACCOUNT_HAS_OFFER}>
                    <a className="active">{t("offers received")}</a>
                  </Link>
                </li>
                <li>
                  <Link href={ROUTE_ACCOUNT_FAVORITES}>
                    <a>{t("favorites")}</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="pb40">
              <div className="list pt40 pb40">
                <Table
                  columns={columns}
                  rowKey={"id"}
                  dataSource={offerItems}
                  pagination={{
                    onChange: onChangePagination,
                    total: total,
                    current: offset,
                    defaultPageSize: 12,
                    hideOnSinglePage: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Mainlayout>
    </Style>
  );
}

export const getServerSideProps = async ctx => {
  const { res, req, params, locale, query } = ctx;

  let profileApiResponse = {};
  let profileItemsApiResponse = {};
  try {
    [profileApiResponse, profileItemsApiResponse] = await Promise.all([
      (profileApiResponse = await getRequest(API_URL_PROFILE, query, ctx)),
      (profileItemsApiResponse = await getRequest(
        `${API_URL_PROFILE}/has-offer`,
        query,
        ctx
      )),
    ]);
  } catch (e) {
    return redirectOnServer(e);
  }
  return {
    props: {
      profileData: get(profileApiResponse, "data.data", {}),
      collectedData: get(profileItemsApiResponse, "data", {}),
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
