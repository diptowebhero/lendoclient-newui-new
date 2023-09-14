import { SettingOutlined } from "@ant-design/icons";
import Style from "@partials/user/style";
import ActivityBy from "@src/components/forms/activity";
import HeaderProfile from "@src/components/headerProfile";
import Mainlayout from "@src/components/layouts/mainLayout";
import ProfileSocial from "@src/components/profileSocial";
import Seo from "@src/components/seo";
import Table from "@src/components/table";
import { SITE_URL } from "@src/config";
import useActivityColumns from "@src/helpers/activityColumns";
import { getRequest, redirectOnServer } from "@src/helpers/api";
import copyTextToClipboard from "@src/helpers/copyToClipboard";
import { API_URL_PROFILE } from "@src/partials/user/const";
import {
  ROUTE_ACCOUNT_OTHERS,
  ROUTE_ACCOUNT_OTHERS_ACTIVITY,
  ROUTE_ACCOUNT_OTHERS_COLLECTIONS,
  ROUTE_ACCOUNT_OTHERS_CREATED,
  ROUTE_ACCOUNT_OTHERS_FAVORITES,
  ROUTE_ACCOUNT_OTHERS_HAS_OFFER,
  ROUTE_ACCOUNT_OTHERS_MADE_OFFER,
  ROUTE_ACCOUNT_SETTING,
} from "@src/routes";
import {
  Button,
  Col,
  Collapse,
  Drawer,
  Form,
  Menu,
  Row,
  Tooltip,
  message,
} from "antd";
import get from "lodash/get";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbAlignLeft, TbShare } from "react-icons/tb";
const { Item } = Form;
const { Panel } = Collapse;

export default function AccountOther(props) {
  const { profileData, collectedData, usernameParam } = props;
  const [t, i18n] = useTranslation("common");
  const activityColumns = useActivityColumns();
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
  const activityItems = get(collectedData, "data.activities", []);

  function onFinish(changedFields, allFields) {
    router.replace({
      pathname: ROUTE_ACCOUNT_OTHERS_ACTIVITY.replace(
        ":username",
        usernameParam
      ),
      query: { ...query, ...allFields, offset: 1 },
    });
  }
  function onChangePagination(page) {
    router.replace({
      pathname: ROUTE_ACCOUNT_OTHERS_ACTIVITY.replace(
        ":username",
        usernameParam
      ),
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
                            usernameParam
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
                  <Link
                    href={ROUTE_ACCOUNT_OTHERS.replace(
                      ":username",
                      usernameParam
                    )}
                  >
                    <a>{t("collected")}</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTE_ACCOUNT_OTHERS_COLLECTIONS.replace(
                      ":username",
                      usernameParam
                    )}
                  >
                    <a>{t("collections")}</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTE_ACCOUNT_OTHERS_CREATED.replace(
                      ":username",
                      usernameParam
                    )}
                  >
                    <a>{t("created")}</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTE_ACCOUNT_OTHERS_ACTIVITY.replace(
                      ":username",
                      usernameParam
                    )}
                  >
                    <a className="active">{t("activity")}</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTE_ACCOUNT_OTHERS_MADE_OFFER.replace(
                      ":username",
                      usernameParam
                    )}
                  >
                    <a>{t("offers made")}</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTE_ACCOUNT_OTHERS_HAS_OFFER.replace(
                      ":username",
                      usernameParam
                    )}
                  >
                    <a>{t("offers received")}</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTE_ACCOUNT_OTHERS_FAVORITES.replace(
                      ":username",
                      usernameParam
                    )}
                  >
                    <a>{t("favorites")}</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="pb40">
              <Form
                form={form}
                className="form"
                onValuesChange={onFinish}
                initialValues={{ ...query }}
              >
                <div className="nft-filter pt20">
                  <div className="filter-box">
                    <Row
                      align="middle"
                      className="sort-filter-section"
                      gutter={[8, 8]}
                      justify="space-between"
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
                          style={{
                            display: "flex",
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            gap: "7px",
                            width: "117px",
                            height: "45px",
                            fontSize: "14px",
                            padding: "0",
                            justifyContent: "center",
                            background: "#E46400",
                            color: "#fff",
                            border: "0",
                            outline: "none",
                          }}
                          size="large"
                          icon={<TbAlignLeft />}
                          onClick={() => filterDrawerToggle()}
                        >
                          Filter
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="list pt40 pb40">
                  <Table
                    columns={activityColumns}
                    rowKey={"id"}
                    dataSource={activityItems}
                    pagination={{
                      onChange: onChangePagination,
                      total: total,
                      current: offset,
                      defaultPageSize: 12,
                    }}
                  />
                </div>

                <Drawer
                  title=""
                  className="filter-drawer"
                  onClose={onCloseFilterDrawer}
                  open={visibleDrawer}
                  placement="left"
                >
                  <div className="filter-list">
                    <Collapse
                      defaultActiveKey={["1"]}
                      ghost
                      expandIconPosition="end"
                      bordered
                    >
                      <Panel header={t("activity")} key="1">
                        <ActivityBy />
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

export const getServerSideProps = async ({
  res,
  req,
  params,
  locale,
  query,
}) => {
  const { username } = params;
  let profileApiResponse = {};
  let profileItemsApiResponse = {};
  try {
    [profileApiResponse, profileItemsApiResponse] = await Promise.all([
      (profileApiResponse = await getRequest(`${API_URL_PROFILE}/${username}`)),
      (profileItemsApiResponse = await getRequest(
        `${API_URL_PROFILE}/${username}/activity`,
        query
      )),
    ]);
  } catch (e) {
    return redirectOnServer(e);
  }
  return {
    props: {
      profileData: get(profileApiResponse, "data.data", {}),
      collectedData: get(profileItemsApiResponse, "data", {}),
      usernameParam: username,
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
