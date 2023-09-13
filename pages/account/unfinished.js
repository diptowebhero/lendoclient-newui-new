import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Tooltip,
  Menu,
  Dropdown,
  Button,
  Drawer,
  Form,
  Input,
  Row,
  Col,
  Collapse,
  PageHeader,
} from "antd";
import Style from "@partials/user/style";
import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import HeaderProfile from "@src/components/headerProfile";
import { SettingOutlined } from "@ant-design/icons";
import { TbDots, TbShare, TbAlignLeft, TbSearch } from "react-icons/tb";
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
} from "@src/routes";
import { getRequest, redirectOnServer } from "@src/helpers/api";
import { API_URL_PROFILE } from "@src/partials/user/const";
import get from "lodash/get";
import ProfileNftList from "@src/components/lists/profileNftList";
import StatusBy from "@src/components/forms/status";
import PriceBy from "@src/components/forms/price";
import SortBy from "@src/components/forms/sortBy";
import Pagination from "@src/components/antd/pagination";
import { useState, Fragment } from "react";
import { useRouter } from "next/router";
import copyTextToClipboard from "@src/helpers/copyToClipboard";
import { SITE_URL } from "@src/config";
import ProfileSocial from "@src/components/profileSocial";
import message from "@src/helpers/message";
import UnfinishedList from "@src/components/lists/unfinishedList";

const { Item } = Form;
const { Panel } = Collapse;

export default function AccountUnfinished(props) {
  const { profileData, incompleteData } = props;
  const [t, i18n] = useTranslation("common");
  const router = useRouter();
  const { query } = router;
  const username = get(profileData, "user.username", "");
  const avatar = get(profileData, "user.avatar", "");
  const heroAvatar = get(profileData, "user.heroAvatar", "");
  const publicAddress = get(profileData, "user.publicAddress", "");
  const joinedAt = get(profileData, "user.joinedAt", "");
  const links = get(profileData, "user.links", []);
  const bio = get(profileData, "user.bio", "");
  const isVerified = get(profileData, "user.isVerified", false);
  const incompleteItems = get(incompleteData, "data", []);
  console.log(incompleteData);
  function onChangePagination(page) {
    router.replace({
      pathname: ROUTE_ACCOUNT_FAVORITES,
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
                        message("success", t("Link Copied!"));
                      }}
                    />
                  </Tooltip>
                </a>
              </li>
              <ProfileSocial links={links} />
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
                    <a>{t("offers received")}</a>
                  </Link>
                </li>
                <li>
                  <Link href={ROUTE_ACCOUNT_FAVORITES}>
                    <a className="active">{t("favorites")}</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="pb40">
              <div className="list pt40 pb40">
                <UnfinishedList data={incompleteItems} />
              </div>
              {/* <Pagination
                onChange={onChangePagination}
                current={offset}
                total={total}
              /> */}
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
  let inCompleteApiResponse = {};
  try {
    [profileApiResponse, inCompleteApiResponse] = await Promise.all([
      (profileApiResponse = await getRequest(API_URL_PROFILE, query, ctx)),
      (inCompleteApiResponse = await getRequest(
        `${API_URL_PROFILE}/incomplete`,
        query,
        ctx
      )),
    ]);
    console.log(inCompleteApiResponse);
  } catch (e) {
    return redirectOnServer(e);
  }
  return {
    props: {
      profileData: get(profileApiResponse, "data.data", {}),
      incompleteData: get(inCompleteApiResponse, "data", {}),
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
