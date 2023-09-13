import Mainlayout from "@src/components/layouts/mainLayout";
import { Fragment, useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Seo from "@src/components/seo";
import { useRouter } from "next/router";
import HeaderProfile from "@src/components/headerProfile";
import Style from "@src/partials/collection/collectionId/style";
import { useTranslation } from "next-i18next";
import CollectionHeaderComponent from "@src/partials/collection/collectionId/collectionHeaderComponent";
import Table from "@src/components/table";
import AvatarWithVerified from "@src/components/avatarWithVerify";
import NetworkIconWithPrice from "@src/components/networkIconWithPrice";
import textDots from "@src/helpers/textDots";
import moment from "moment";
import {
  Row,
  Col,
  Form,
  Select,
  Drawer,
  Checkbox,
  Collapse,
  Radio,
  Button,
} from "antd";
import Link from "next/link";
import { TbAlignLeft } from "react-icons/tb";
import { API_URL_COLLECTION } from "@src/partials/exploreCollections/const";
import { getRequest, redirectOnServer } from "@src/helpers/api";
import get from "lodash/get";
import {
  ROUTE_SINGLE_COLLECTION_ACTIVITY,
  ROUTE_SINGLE_COLLECTION,
  ROUTE_ACCOUNT_OTHERS,
} from "@src/routes";
import { truncateAddress } from "@src/helpers/walletConnect/utils.web3";
import ActivityBy from "@src/components/forms/activity";
import useActivityColumns from "@src/helpers/activityColumns";
const { Panel } = Collapse;

export default function ActivityCollection({ data, activityData }) {
  const { data: collectionData } = data;
  const { data: activity, metadata } = activityData;
  const { total, offset } = metadata;
  const [t, i18n] = useTranslation("common");
  const activityColumns = useActivityColumns();
  const router = useRouter();
  const { query } = router;
  const [form] = Form.useForm();
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  console.log(query);

  const created_at = get(collectionData, "collection.created_at", "");
  const isExternal = get(collectionData, "collection.isExternal", false);
  const updated_at = get(collectionData, "collection.updated_at", "");
  const deleted_at = get(collectionData, "collection.deleted_at", "");
  const id = get(collectionData, "collection.id", "");
  const userId = get(collectionData, "collection.userId", "");
  const name = get(collectionData, "collection.name", "");
  const logoImage = get(collectionData, "collection.logoImage", "");
  const slug = get(collectionData, "collection.slug", "");
  const featured = get(collectionData, "collection.featured", "");
  const featuredImage = get(collectionData, "collection.featuredImage", "");
  const bannerImage = get(collectionData, "collection.bannerImage", "");
  const description = get(collectionData, "collection.description", "");
  const categoryId = get(collectionData, "collection.categoryId", "");
  const royaltiesRate = get(collectionData, "collection.royaltiesRate", "");
  const collectionBlockChain = get(collectionData, "collection.blockchain", "");
  const paymentToken = get(collectionData, "collection.paymentToken", "");
  const displayTheme = get(collectionData, "collection.displayTheme", "");
  const isSensitive = get(collectionData, "collection.isSensitive", "");
  const self = get(collectionData, "self", false);
  const unlockableContent = get(
    collectionData,
    "collection.unlockableContent",
    ""
  );
  const verify = get(collectionData, "collection.verify", false);
  const countItems = get(collectionData, "collection.countItems", 0);
  const countOwners = get(collectionData, "collection.countOwners", 0);
  const isActive = get(collectionData, "collection.isActive", "");
  const username = get(collectionData, "collection.user.username", "");
  const avatar = get(collectionData, "collection.user.avatar", "");
  const publicAddress = get(
    collectionData,
    "collection.user.publicAddress",
    ""
  );
  const items = get(collectionData, "collection.items", []);
  const links = get(collectionData, "collection.links", {});
  const priceAsset = get(collectionData, "collection.price.asset", "");
  const totalVolume = get(collectionData, "collection.price.totalVolume", "");
  const floorPrice = get(collectionData, "collection.price.floorprice", "");

  function onFinish(changedFields, allFields) {
    router.replace({
      pathname: ROUTE_SINGLE_COLLECTION_ACTIVITY.replace(":slug", slug),
      query: { ...query, ...allFields, offset: 1 },
    });
  }
  function onChangePagination(page) {
    router.replace({
      pathname: ROUTE_SINGLE_COLLECTION_ACTIVITY.replace(":slug", slug),
      query: { ...query, offset: page },
    });
  }

  const filterDrawerToggle = () => {
    setVisibleDrawer(!visibleDrawer);
  };
  const onCloseFilterDrawer = () => {
    setVisibleDrawer(false);
  };
  return (
    <Style>
      <Seo title={name} desc={description} image={featuredImage} />
      <Mainlayout>
        <HeaderProfile
          coverImage={bannerImage}
          avatarImage={logoImage}
          name={name}
          isVeryfied={verify}
          description={description}
          joinedTime={created_at}
          publicAddress={publicAddress}
        />
        <div className="container pt40 pb40">
          <CollectionHeaderComponent
            totalVolume={totalVolume}
            floorPrice={floorPrice}
            countOwners={countOwners}
            countItems={countItems}
            links={links}
            self={self}
            slug={slug}
            isExternal={isExternal}
          />
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
                    xs={{ order: 1 }}
                    sm={{ order: 1 }}
                    md={{ order: 1 }}
                    lg={{ order: 1 }}
                    xl={{ order: 1 }}
                    flex="100px"
                  >
                    <div className="double-link">
                      <ul>
                        <li>
                          <Link
                            href={ROUTE_SINGLE_COLLECTION.replace(
                              ":slug",
                              slug
                            )}
                          >
                            <a>{t("items")}</a>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={ROUTE_SINGLE_COLLECTION_ACTIVITY.replace(
                              ":slug",
                              slug
                            )}
                          >
                            <a className="active">{t("activity")}</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="list pt40 pb40">
              <Table
                columns={activityColumns}
                rowKey={"id"}
                dataSource={activity}
                pagination={{
                  onChange: onChangePagination,
                  defaultPageSize: 12,
                  total: total,
                  current: offset,
                  hideOnSinglePage: true,
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
      </Mainlayout>
    </Style>
  );
}
export const getServerSideProps = async ctx => {
  const { res, req, params, locale, query } = ctx;
  const { slug } = params;
  let collectionApiResponse = {};
  let collectionActivityApiResponse = {};
  try {
    [collectionApiResponse, collectionActivityApiResponse] = await Promise.all([
      (collectionApiResponse = await getRequest(
        `${API_URL_COLLECTION}/${slug}`,
        {},
        ctx
      )),
      (collectionActivityApiResponse = await getRequest(
        `${API_URL_COLLECTION}/${slug}/activity`,
        query,
        ctx
      )),
    ]);
  } catch (e) {
    redirectOnServer(e);
  }
  return {
    props: {
      data: get(collectionApiResponse, "data", {}),
      activityData: get(collectionActivityApiResponse, "data", {}),
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
