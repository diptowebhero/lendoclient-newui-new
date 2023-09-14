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
import {
  TbDots,
  TbShare,
  TbAlignLeft,
  TbSearch,
  TbAlignRight,
} from "react-icons/tb";
import Link from "next/link";
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
  getRequest,
  postRequest,
  deleteWalletRequest,
  getWalletRequest,
  redirectOnServer,
} from "@src/helpers/api";
import { API_URL_PROFILE, API_URL_WALLET_NFTS } from "@src/partials/user/const";
import get from "lodash/get";
import ProfileNftList from "@src/components/lists/profileNftList";
import StatusBy from "@src/components/forms/status";
import PriceBy from "@src/components/forms/price";
import SortBy from "@src/components/forms/sortBy";
import Pagination from "@src/components/antd/pagination";
import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import copyTextToClipboard from "@src/helpers/copyToClipboard";
import { SITE_URL } from "@src/config";
import ProfileSocial from "@src/components/profileSocial";
import message from "@src/helpers/message";
import NftList from "@src/components/lists/nftList";
import { fetchWalletNFTs } from "@helpers/walletConnect/chains";

const { Item } = Form;
const { Panel } = Collapse;

export default function AccountOther(props) {
  const { profileData, collectedData, collectionData, usernameParam } = props;
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
  const collectedItems = get(collectedData, "data.collected", []);

  const [nftDocs, setnftDocs] = useState([]);
  const [Data, setData] = useState([]);
  const [totalData, settotalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setcountPage] = useState(1);

  const [formetPage, setformetPage] = useState(1);
  const [formetPageLength, setformetPageLength] = useState(0);
  const [formetCountPage, setformetCountPage] = useState(1);

  function onEnter(values) {
    router.replace({
      pathname: ROUTE_ACCOUNT_OTHERS.replace(":username", usernameParam),
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
        pathname: ROUTE_ACCOUNT_OTHERS.replace(":username", usernameParam),
        query: { ...query, ...allFields, offset: 1 },
      });
    }
  }

  function applyPrice() {
    const allFields = form.getFieldsValue();
    if (allFields.max && allFields.min !== undefined) {
      if (allFields.max >= allFields.min) {
        router.replace({
          pathname: ROUTE_ACCOUNT_OTHERS.replace(":username", usernameParam),
          query: { ...query, ...allFields, offset: 1 },
        });
      } else {
        message("error", t("Minumum must be less than maximum"));
      }
    } else {
      router.replace({
        pathname: ROUTE_ACCOUNT_OTHERS.replace(":username", usernameParam),
        query: { ...query, ...allFields, offset: 1 },
      });
    }
  }

  function onChangePagination(page) {
    setCurrentPage(page);
    setcountPage(page);
    // router.replace({
    //   pathname: ROUTE_ACCOUNT_OTHERS.replace(":username", usernameParam),
    //   query: { ...query, offset: page },
    // });
  }

  const filterDrawerToggle = () => {
    setVisibleDrawer(!visibleDrawer);
  };
  const onCloseFilterDrawer = () => {
    setVisibleDrawer(false);
  };

  useEffect(() => {
    let data = {
      creator_id: profileData.user.id,
      db_nft: "",
    };
    const lestingRec = async () => {
      const res = await postRequest(
        `${API_URL_WALLET_NFTS}/onlylist?page=${countPage}`,
        data
      );
      const vl = res.data;
      setData(vl.items);
      settotalData(vl.totalItems);
      setCurrentPage(vl.currentPage);
    };
    lestingRec();
  }, [countPage]);

  useEffect(() => {
    const fetchData = async () => {
      let collectionId = collectionData?.data?.collections[0]?.id;
      if (publicAddress) {
        try {
          let data = {
            creator_id: profileData.user.id,
            db_nft: "",
          };

          await postRequest(`${API_URL_WALLET_NFTS}/delete`, data);

          data.db_nft = "no";
          const Docs = await fetchWalletNFTs(publicAddress);
          const checkformet = await postRequest(
            `${API_URL_WALLET_NFTS}/list`,
            data
          );
          const totalLength = checkformet.data.length + Docs?.length;
          setformetPageLength(totalLength);

          if (Docs?.length > 0) {
            for (const vl of Docs) {
              let obj = {
                process_step: "COMPLETE",
                file_url: vl?.fileUrl,
                name: vl.name ? vl.name : vl?.tokenId,
                external_link: null,
                description: vl.description ? vl.description : "",
                block_chain: vl?.price.asset,
                metadata: vl?.metadata,
                creator_id: profileData.user.id,
                owner_ids: [publicAddress],
                token_id: vl?.tokenId,
                collection_id: collectionId ? collectionId : 128,
                slug: vl?.tokenId,
                preview_url: vl?.fileUrl,
                protocol: vl?.protocol,
                is_external: false,
                quantity: 0,
                is_verified: false,
                is_mint: false,
                db_nft: "yes",
              };
              await postRequest(`${API_URL_WALLET_NFTS}/insert`, obj);
            }
          }
        } catch (error) {
          console.error("Error fetching NFTs:", error);
        }
      }
    };

    fetchData();
  }, [publicAddress]);

  console.log({ Data });

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
                  <Link
                    href={ROUTE_ACCOUNT_OTHERS.replace(
                      ":username",
                      usernameParam
                    )}
                  >
                    <a className="active">{t("collected")}</a>
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
                    <a>{t("activity")}</a>
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
                          icon={<TbAlignRight />}
                          onClick={() => filterDrawerToggle()}
                        >
                          Filter
                        </Button>
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
                              placeholder={t(`   Search by name`)}
                              size="large"
                              allowClear
                              className="search-input"
                              style={{ fontSize: "14px" }}
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
                        style={{position:"relative"}}
                      >
                        <TbSearch style={{position:"absolute",color:"#fff", top:"0px"}}/>
                        <SortBy width="100%"/>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="list pt40 pb40">
                  <NftList data={Data} userAdd={publicAddress} />
                  <br />
                </div>
                <Pagination
                  onChange={onChangePagination}
                  current={parseInt(currentPage)}
                  total={parseInt(formetPageLength || totalData)}
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
  const { username } = params;
  let profileApiResponse = {};
  let profileItemsApiResponse = {};
  let profileCollectionApiResponse = {};

  try {
    [
      profileApiResponse,
      profileItemsApiResponse,
      profileCollectionApiResponse,
    ] = await Promise.all([
      (profileApiResponse = await getRequest(`${API_URL_PROFILE}/${username}`)),
      (profileItemsApiResponse = await getRequest(
        `${API_URL_PROFILE}/${username}/collected`,
        query
      )),
      (profileCollectionApiResponse = await getRequest(
        `${API_URL_PROFILE}/${username}/collections`,
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
      collectionData: get(profileCollectionApiResponse, "data", {}),
      usernameParam: username,
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
