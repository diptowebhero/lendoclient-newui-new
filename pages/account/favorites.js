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

const { Item } = Form;
const { Panel } = Collapse;

export default function AccountFavorites(props) {
  const { profileData, favoritedData } = props;
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
  const total = get(favoritedData, "metadata.total", 0);
  const offset = get(favoritedData, "metadata.offset", 1);
  const favoritedItems = get(favoritedData, "data.favourites", []);

  function onEnter(values) {
    router.replace({
      pathname: ROUTE_ACCOUNT_FAVORITES,
      query: { ...query, ...form.getFieldsValue(), offset: 1 },
    });
  }
  function onFinish(changedFields, allFields) {
    if (
      changedFields.hasOwnProperty("currency") ||
      changedFields.hasOwnProperty("min") ||
      changedFields.hasOwnProperty("max")
    ) {
    } else if (changedFields.hasOwnProperty("input")) {
    } else {
      router.replace({
        pathname: ROUTE_ACCOUNT_FAVORITES,
        query: { ...query, ...allFields, offset: 1 },
      });
    }
  }
  function applyPrice() {
    const allFields = form.getFieldsValue();
    if (allFields.max && allFields.min !== undefined) {
      if (allFields.max >= allFields.min) {
        router.replace({
          pathname: ROUTE_ACCOUNT_FAVORITES,
          query: { ...query, ...allFields, offset: 1 },
        });
      } else {
        message("error", t("Minumum must be less than maximum"));
      }
    } else {
      router.replace({
        pathname: ROUTE_ACCOUNT_FAVORITES,
        query: { ...query, ...allFields, offset: 1 },
      });
    }
  }
  function onChangePagination(page) {
    router.replace({
      pathname: ROUTE_ACCOUNT_FAVORITES,
      query: { ...query, offset: page },
    });
  }

  const filterDrawerToggle = () => {
    setVisibleDrawer(!visibleDrawer);
  };
  const onCloseFilterDrawer = () => {
    setVisibleDrawer(false);
  };

  const moreMenu = (
    <Menu
      size="large"
      items={[
        {
          key: "1",
          label: (
            <Link href={ROUTE_ACCOUNT_SETTING} prefetch={false}>
              {t("setting")}
            </Link>
          ),
          icon: <SettingOutlined />,
        },
      ]}
    />
  );

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
              <Form
                form={form}
                className="form"
                onValuesChange={onFinish}
                onFinish={onEnter}
                initialValues={{
                  currency: "BNB",
                  ...query,
                }}
              >
                <div className="nft-filter pt20">
                  <div className="filter-box">
                    <Row
                      align="middle"
                      className="sort-filter-section"
                      gutter={[8, 8]}
                    >
                      <Col
                        xs={{ order: 1 }}
                        sm={{ order: 1 }}
                        md={{ order: 1 }}
                        lg={{ order: 1 }}
                        xl={{ order: 1 }}
                        flex="50px"
                      >
                        <Button
                          className="curve default"
                          size="large"
                          icon={<TbAlignLeft />}
                          onClick={() => filterDrawerToggle()}
                        />
                      </Col>

                      <Col
                        flex="auto"
                        xs={{ order: 3 }}
                        sm={{ order: 3 }}
                        md={{ order: 3 }}
                        lg={{ order: 2 }}
                        xl={{ order: 2 }}
                      >
                        <div className="search">
                          <Item className="sorting" name="input">
                            <Input
                              prefix={<TbSearch />}
                              placeholder={t("Search by name")}
                              size="large"
                              className="search-input"
                              allowClear
                            />
                          </Item>
                        </div>
                      </Col>
                      <Col
                        xs={{ order: 2 }}
                        sm={{ order: 2 }}
                        md={{ order: 2 }}
                        lg={{ order: 3 }}
                        xl={{ order: 3 }}
                        flex="250px"
                      >
                        <SortBy width="100%" />
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="list pt40 pb40">
                  <ProfileNftList data={favoritedItems} />
                </div>
                <Pagination
                  onChange={onChangePagination}
                  current={offset}
                  total={total}
                />
                <Drawer
                  title=""
                  className="filter-drawer"
                  onClose={onCloseFilterDrawer}
                  open={visibleDrawer}
                  placement="left"
                >
                  <div className="filter-list">
                    <Collapse
                      defaultActiveKey={["1", "2"]}
                      ghost
                      expandIconPosition="end"
                      bordered
                    >
                      <Panel header={t("status")} key="1">
                        <StatusBy />
                      </Panel>
                      <Panel header={t("price")} key="2">
                        <PriceBy />
                        <Item style={{ marginTop: "20px" }}>
                          <Button
                            block
                            type="primary"
                            size="large"
                            onClick={() => applyPrice()}
                          >
                            {t("apply")}
                          </Button>
                        </Item>
                      </Panel>
                    </Collapse>
                  </div>
                </Drawer>
                <Form.Item hidden>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
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
  let profileFavoritesApiResponse = {};
  try {
    [profileApiResponse, profileFavoritesApiResponse] = await Promise.all([
      (profileApiResponse = await getRequest(API_URL_PROFILE, query, ctx)),
      (profileFavoritesApiResponse = await getRequest(
        `${API_URL_PROFILE}/favourited`,
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
      favoritedData: get(profileFavoritesApiResponse, "data", {}),
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
