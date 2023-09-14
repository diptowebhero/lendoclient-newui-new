import AvatarWithVerified from "@src/components/avatarWithVerify";
import SortByRanking from "@src/components/forms/sortByRanking";
import IncreaseDecreaseStatus from "@src/components/increaseDecreaseStatus";
import HomeLayout from "@src/components/layouts/homeLayout";
import NetworkIconWithPrice from "@src/components/networkIconWithPrice";
import Seo from "@src/components/seo";
import Table from "@src/components/table";
import { categories } from "@src/data";
import { getRequest } from "@src/helpers/api";
import textDots from "@src/helpers/textDots";
import { API_URL_COLLECTION } from "@src/partials/exploreCollections/const";
import Style from "@src/partials/rankings/style";
import { ROUTE_RANKINGS, ROUTE_SINGLE_COLLECTION } from "@src/routes";
import Sidebar from "@src/sidebar";
import { Col, Drawer, Form, Row, Select } from "antd";
import get from "lodash/get";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const { Option } = Select;

export default function Rankings({ data }) {
  const router = useRouter();
  const collections = get(data, "data.collections", []);
  const total = get(data, "metadata.total", 0);
  const offset = get(data, "metadata.offset", 1);
  const { query } = router;
  const [t, i18n] = useTranslation("common");
  const [selectedValue, setSelectedValue] = useState("");
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const [form] = Form.useForm();

  function onFilter(changedFields, allFields) {
    console.log({ changedFields, query, allFields });
    router.replace({
      pathname: ROUTE_RANKINGS,
      query: { ...query, ...changedFields, ...allFields, offset: 1 },
    });
  }

  function onChangePagination(page) {
    router.replace({
      pathname: ROUTE_RANKINGS,
      query: { ...query, offset: page },
    });
  }
  function renderCategories() {
    return categories.map(category => {
      const { label, id, slug } = category;
      return (
        <Option key={id} value={slug}>
          {label}
        </Option>
      );
    });
  }

  useEffect(() => {
    const selectedSortBy = form.getFieldValue("time");
    setSelectedValue(selectedSortBy);
  }, [form]);

  const handleItemClick = value => {
    form.setFieldsValue({ time: value });
    setSelectedValue(value);
    onFilter(form.getFieldsValue());
  };

  const onCloseFilterDrawer = () => {
    setVisibleDrawer(false);
  };

  const columns = [
    {
      title: t("collection"),
      dataIndex: "name",
      key: "name",
      render: (name, { id, logoImage, verify, slug }, index) => (
        <Link href={ROUTE_SINGLE_COLLECTION.replace(":slug", slug)}>
          <a className="flex-inline rank-item">
            {/* <span className="rank">{index + 1 * offset}</span> */}
            <AvatarWithVerified
              image={logoImage}
              avatarSize="medium"
              title={name}
              verified={verify}
            />{" "}
            &nbsp;
            <span>{textDots(name, 30)}</span>
          </a>
        </Link>
      ),
      responsive: ["lg","sm","xs"],
    },
    {
      title: t("volume"),
      dataIndex: "price",
      key: "price",
      render: (price, { blockchain }) => {
        const { asset, totalVolume } = price;
        return (
          <NetworkIconWithPrice
            secondaryDesign={true}
            blockchain={asset}
            price={totalVolume}
            isToFixed={true}
          />
        );
      },
      responsive: ["lg","sm","xs"],
    },
    {
      title: t("24h%"),
      dataIndex: "price",
      key: "24h%",
      render: (price, { statusByDay }) => {
        const { asset, last24h, last7d, totalVolume, isPositive, floorprice } =
          price;
        const { amount: amount24, isPositive: isPositive24 } = last24h;
        return (
          <IncreaseDecreaseStatus
            isIncrease={isPositive24}
            average={amount24}
          />
        );
      },
      responsive: ["xl","lg","md","sm","xs"],
    },
    {
      title: t("7d%"),
      dataIndex: "price",
      key: "7d%",
      render: (price, { statusByDay }) => {
        const { asset, last24h, last7d, totalVolume, isPositive, floorprice } =
          price;
        const { amount: amount7, isPositive: isPositive7 } = last7d;
        return (
          <IncreaseDecreaseStatus isIncrease={isPositive7} average={amount7} />
        );
      },
      responsive: ["xl","lg","md","sm","xs"],
    },
    {
      title: t("floor price"),
      key: "floor-price",
      dataIndex: "price",
      render: ({ asset, floorprice }, { blockchain }) => (
        <NetworkIconWithPrice
          secondaryDesign={true}
          blockchain={asset}
          price={floorprice}
        />
      ),
      responsive: ["xl","lg","md","sm","xs"],
    },
    {
      title: t("owners"),
      key: "countOwners",
      dataIndex: "countOwners",
      responsive: ["xl","lg","md","sm","xs"],
    },
    {
      title: t("items"),
      key: "countItems",
      dataIndex: "countItems",
      responsive: ["xl","lg","md","sm","xs"],
    },
  ];

  const timeData = [
    { value: "LAST_1_HOUR", name: "1h" },
    { value: "LAST_6_HOUR", name: "6h" },
    { value: "LAST_1_DAYS", name: "24h" },
    { value: "LAST_7_DAYS", name: "7d" },
    { value: "LAST_30_DAYS", name: "30d" },
    { value: "ALL_TIME", name: "All Time" },
  ];

  return (
    <HomeLayout setVisibleDrawer={setVisibleDrawer}>
      <Seo title="Top NFTs" desc="" />
      <Style>
        {/* <div className="container"> */}
        <Row gutter={[16, 16]}>
          <div style={{ width: "1.5%" }} />
          <Col xs={24} sm={24} md={24} lg={4}>
            <div className="main-sidebar-section">
              <Sidebar />

              <Drawer
                title=""
                className="filter-drawer"
                onClose={onCloseFilterDrawer}
                open={visibleDrawer}
                placement="left"
              >
                <Sidebar />
              </Drawer>
            </div>
          </Col>

          <Col xs={24} sm={24} md={24} lg={18}>
            <div className="page-title-box pt40 pb40">
              <Col>
                <div className="title-section">
                  <span className="title">{t("Top NFTs")}</span>
                  <p className="subtitle">
                    {t(
                      "The top NFTs on Lendochain, ranked by volume, floor price and other statistics."
                    )}
                  </p>
                </div>
              </Col>

              <Form
                form={form}
                name="filter"
                className="form"
                onValuesChange={onFilter}
                initialValues={{
                  time: "ALL_TIME",
                  blockChain: "BSC",
                  category: "all",
                  ...query,
                }}
              >
                <Form.Item name="sortBy" className="no-space">
                  <Col>
                    <SortByRanking
                      onFilter={onFilter}
                      form={form}
                      width={"150px"}
                      className="no-space"
                    />
                  </Col>
                </Form.Item>
              </Form>

              <div className="sorting">
                <Row wrap={true} justify="space-between" align="center" style={{width:"100%"}}>
                  <Col span={24}>
                    {/* <div className="filter-section "> */}
                    <Form
                      form={form}
                      name="filter"
                      className="form"
                      onValuesChange={onFilter}
                      initialValues={{
                        time: "ALL_TIME",
                        blockChain: "BSC",
                        category: "all",
                        ...query,
                      }}
                    >
                      <div
                        className="ranking-flex-space"
                      >
                        <Form.Item name="time" className="no-space">
                          <div class="bytime">
                            {timeData.map((vl, index) => (
                              <div
                                key={index + 1}
                                onClick={() => handleItemClick(vl.value)}
                                className={`sorttime ${
                                  selectedValue === vl.value ? "active" : ""
                                }`}
                              >
                                {t(vl.name)}
                              </div>
                            ))}
                          </div>
                        </Form.Item>
                        <div style={{display:"flex"}}>
                          {" "}
                          <Form.Item name="categoryName" className="no-space">
                            <Select
                              style={{
                                width: "167px",
                                height: "50px",
                                textAlign: "center",
                                marginRight:"10px"
                              }}
                              size="large"
                              placeholder={t("all categories")}
                              className="sortdropdowns"
                            >
                              <Option key={"all"} value={""}>
                                all
                              </Option>
                              {renderCategories()}
                            </Select>
                          </Form.Item>
                          <Form.Item name="blockChain" className="no-space">
                            <Select
                              style={{
                                width: "167px",
                                height: "50px",
                                textAlign: "center",
                              }}
                              size="large"
                              className="sortdropdowns"
                              disabled
                            >
                              <Option value="bsc">{t("BSC")}</Option>
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                    </Form>
                    {/* </div> */}
                  </Col>
                </Row>
                <br /> <br />
              </div>
            </div>
            <div className="nft-items pb40">
              <Row>
                <Col span={24}>
                  <Table
                    className="expand-only-in-mobile"
                    columns={columns}
                    rowKey={"id"}
                    dataSource={collections}
                    pagination={{
                      onChange: onChangePagination,
                      total: total,
                      current: offset,
                      hideOnSinglePage: true,
                      defaultPageSize: 12,
                    }}
                    expandable={{
                      expandedRowRender: record => {
                        return (
                          <ul>
                            <li>
                              <span className="title">{`${t("24h%")}: `}</span>
                              <span className="value">
                                {record.price.last24h.amount}
                              </span>
                            </li>
                            <li>
                              <span className="title">{`${t("1w%")}: `}</span>
                              <span className="value">
                                {record.price.last7d.amount}
                              </span>
                            </li>
                            <li>
                              <span className="title">{`${t(
                                "floor price"
                              )}: `}</span>
                              <span className="value">{record.floorprice}</span>
                            </li>
                            <li>
                              <span className="title">{`${t(
                                "owners"
                              )}: `}</span>
                              <span className="value">
                                {record.countOwners}
                              </span>
                            </li>
                            <li>
                              <span className="title">{`${t("items")}: `}</span>
                              <span className="value">{record.countItems}</span>
                            </li>
                          </ul>
                        );
                      },
                    }}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* </div> */}
      </Style>
    </HomeLayout>
  );
}

export const getServerSideProps = async ({
  res,
  req,
  params,
  locale,
  query,
}) => {
  let collectionApiResponse = {};
  try {
    collectionApiResponse = await getRequest(API_URL_COLLECTION, query);
  } catch (e) {}
  return {
    props: {
      data: get(collectionApiResponse, "data", {}),
      query,
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
