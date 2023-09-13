import Mainlayout from "@src/components/layouts/mainLayout";
import { Fragment, useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Seo from "@src/components/seo";
import { useRouter } from "next/router";
import HeaderProfile from "@src/components/headerProfile";
import Style from "@src/partials/collection/collectionId/style";
import { useTranslation } from "next-i18next";
import NftList from "@src/components/lists/nftList";
import CollectionHeaderComponent from "@src/partials/collection/collectionId/collectionHeaderComponent";
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Drawer,
  Checkbox,
  Collapse,
  Radio,
  Button,
  Menu,
} from "antd";
import Link from "next/link";
import { TbEdit, TbAlignLeft, TbSearch } from "react-icons/tb";
import { API_URL_COLLECTION } from "@src/partials/exploreCollections/const";
import { getRequest, redirectOnServer } from "@src/helpers/api";
import get from "lodash/get";
import StatusBy from "@src/components/forms/status";
import PriceBy from "@src/components/forms/price";
import SortBy from "@src/components/forms/sortBy";
import {
  ROUTE_SINGLE_COLLECTION,
  ROUTE_SINGLE_COLLECTION_ACTIVITY,
} from "@src/routes";
import qs from "qs";
import Pagination from "@src/components/antd/pagination";
import message from "@src/helpers/message";

const { Item } = Form;
const { Option } = Select;
const { Group: CheckboxGroup } = Checkbox;
const { Group: RadioGroup } = Radio;
const { Panel } = Collapse;

export default function CollectionId({ data }) {
  const { data: collectionData, metadata } = data;
  const { total, offset } = metadata;
  const [t, i18n] = useTranslation("common");
  const router = useRouter();
  const { query } = router;
  const [form] = Form.useForm();
  const [visibleDrawer, setVisibleDrawer] = useState(true);


  const openKeys = Array.apply(null, { length: 200 }).map((value, index) =>
    (index + 1).toString()
  );

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
  const properties = get(collectionData, "props", []);

  useEffect(() => {
    setVisibleDrawer(false);
    setTimeout(() => {
      document.getElementsByClassName("filter-drawer")[0].style.display =
        "block";
    }, 1000);
  }, []);


  function getPropsQuery() {
    const getOnlyPropsDash = Object.fromEntries(
      Object.entries(query).filter(([key]) => key.startsWith("props["))
    );
    const getQueryKeys = Object.keys(getOnlyPropsDash);
    let namedQuerykeys = [];
    getQueryKeys.map(item => {
      const removeAfterEndBracket = item.split("]");
      const getParentKey = removeAfterEndBracket[0].split("[");

      let newKeyName = `props-${getParentKey[1]}`;
      const newData = {
        [newKeyName]: getOnlyPropsDash[item],
      };
      namedQuerykeys = [...namedQuerykeys, newData];
    });
    let finalObject = {};
    namedQuerykeys.map(duplicateItem => {
      let duplicateKeyAndValue = [];
      const filteredDuplicatedItemArray = namedQuerykeys.filter(
        item => Object.keys(item)[0] === Object.keys(duplicateItem)[0]
      );
      filteredDuplicatedItemArray.map(finalItem => {
        duplicateKeyAndValue = [
          ...duplicateKeyAndValue,
          finalItem[Object.keys(duplicateItem)[0]],
        ];
        const newKeyName = Object.keys(duplicateItem)[0];
        const newObject = {
          [newKeyName]: duplicateKeyAndValue,
        };
        finalObject = { ...finalObject, ...newObject };
      });
    });
    return finalObject;
  }
  
  function getStatusQuery() {
    const getOnlyPropsDash = Object.fromEntries(
      Object.entries(query).filter(([key]) => key.startsWith("status"))
    );
    const getValues = Object.values(getOnlyPropsDash);
    const flatValues = getValues.flat();
    const changePropsDashWithParentName = Object.fromEntries(
      Object.entries(getOnlyPropsDash).map(([key, val]) => {
        return [[`status`], flatValues];
      })
    );
    return changePropsDashWithParentName;
  }
  function getQueryFromNextRouter() {
    const getPageQuery = Object.assign({}, query);
    const getAllQueriesExceptPropsArray = Object.fromEntries(
      Object.entries(getPageQuery).filter(
        ([key]) => !key.includes("props[") & !key.includes("status")
      )
    );
    return Object.assign(
      {},
      getAllQueriesExceptPropsArray,
      getPropsQuery(),
      getStatusQuery()
    );
  }
  //props-eye
  //props-parentName
  // exmaple props-EYE to EYE
  function getOnlyProperties() {
    return Object.fromEntries(
      Object.entries(form.getFieldsValue()).filter(([key]) =>
        key.startsWith("props-")
      )
    );
  }
  function changePropsDashKeysWithJustParentName() {
    return Object.fromEntries(
      Object.entries(getOnlyProperties()).map(([key, val]) => [
        key.replace("props-", ""),
        val,
      ])
    );
  }
  // REMOVE ALL Props- from allFields for remove dulpicate Items
  function removePropsDashKeysFromFormFields() {
    return Object.fromEntries(
      Object.entries(form.getFieldsValue()).filter(
        ([key]) => !key.startsWith("props-")
      )
    );
  }
  function onEnter(values) {
    router.replace({
      pathname: ROUTE_SINGLE_COLLECTION.replace(":slug", slug),
      query: decodeURIComponent(
        qs.stringify({
          ...removePropsDashKeysFromFormFields(),
          props: changePropsDashKeysWithJustParentName(),
          offset: 1,
        })
      ),
    });
  }
  function onFinish(changedFields, allFields) {
    if (
      changedFields.hasOwnProperty("currency") ||
      changedFields.hasOwnProperty("min") ||
      changedFields.hasOwnProperty("max")
    ) {
    } else if (Object.keys(changedFields).find(key => key.match("props-"))) {
      router.replace({
        pathname: ROUTE_SINGLE_COLLECTION.replace(":slug", slug),
        query: decodeURIComponent(
          qs.stringify({
            ...removePropsDashKeysFromFormFields(),
            props: changePropsDashKeysWithJustParentName(),
            offset: 1,
          })
        ),
      });
    } else if (changedFields.hasOwnProperty("input")) {
      console.log(changedFields);
    } else {
      router.replace({
        pathname: ROUTE_SINGLE_COLLECTION.replace(":slug", slug),
        query: decodeURIComponent(
          qs.stringify({
            ...removePropsDashKeysFromFormFields(),
            props: changePropsDashKeysWithJustParentName(),
            offset: 1,
          })
        ),
      });
    }
  }
  function applyPrice() {
    const allFields = form.getFieldsValue();
    if (allFields.max && allFields.min !== undefined) {
      if (allFields.max >= allFields.min) {
        router.replace({
          pathname: ROUTE_SINGLE_COLLECTION.replace(":slug", slug),
          query: decodeURIComponent(
            qs.stringify({
              ...removePropsDashKeysFromFormFields(),
              props: changePropsDashKeysWithJustParentName(),
              offset: 1,
            })
          ),
        });
      } else {
        message("error", t("Minumum must be less than maximum"));
      }
    } else {
      router.replace({
        pathname: ROUTE_SINGLE_COLLECTION.replace(":slug", slug),
        query: decodeURIComponent(
          qs.stringify({
            ...removePropsDashKeysFromFormFields(),
            props: changePropsDashKeysWithJustParentName(),
            offset: 1,
          })
        ),
      });
    }
  }

  function onChangePagination(page) {
    router.replace({
      pathname: ROUTE_SINGLE_COLLECTION.replace(":slug", slug),
      query: decodeURIComponent(
        qs.stringify({
          ...removePropsDashKeysFromFormFields(),
          props: changePropsDashKeysWithJustParentName(),
          offset: page,
        })
      ),
    });
  }

  const filterDrawerToggle = () => {
    setVisibleDrawer(!visibleDrawer);
  };
  const onCloseFilterDrawer = () => {
    setVisibleDrawer(false);
  };
  function renderPanelHeader(name, count) {
    return (
      <div className="properties-header">
        <span>{name}</span>
        <span>{` (${count})`}</span>
      </div>
    );
  }

  function renderProperties() {
    return properties.map((item, index) => {
      const { key, values = [] } = item;
      const name = get(key, "name", "");
      const count = get(key, "count", "");

      return (
        <Panel header={renderPanelHeader(name, count)} key={index + 3}>
          {renderPropertiesValues(key, values)}
        </Panel>
      );
    });
  }
  function renderPropertiesValues(key, values) {
    const options = values.map(item => {
      const { count, value } = item;
      return {
        label: (
          <div className="properties-header">
            <span>{value}</span>
            <span>{`(${count})`}</span>
          </div>
        ),
        value: value || "",
      };
    });
    return (
      <Item className="status props" name={`props-${key.name}`}>
        <CheckboxGroup options={options} />
      </Item>
    );
  }
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
            priceAsset={priceAsset}
          />
          <Form
            form={form}
            className="form"
            onValuesChange={onFinish}
            onFinish={onEnter}
            initialValues={{ currency: "BNB", ...getQueryFromNextRouter() }}
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
                            <a className="active">{t("items")}</a>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={ROUTE_SINGLE_COLLECTION_ACTIVITY.replace(
                              ":slug",
                              slug
                            )}
                          >
                            <a>{t("activity")}</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
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
                          allowClear
                          className="search-input"
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
              <NftList data={items} size="medium" />
            </div>
            <Pagination
              onChange={onChangePagination}
              current={offset}
              total={total}
            />
            
            <Drawer
              title=""
              className="filter-drawer first-hide"
              onClose={onCloseFilterDrawer}
              open={visibleDrawer}
              placement="left"
            >
              <div className="filter-list">
                <Collapse
                  defaultActiveKey={openKeys}
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
                  {renderProperties()}
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
  console.log(query);
  try {
    collectionApiResponse = await getRequest(
      `${API_URL_COLLECTION}/${slug}`,
      query,
      ctx
    );
    console.log(collectionApiResponse);
  } catch (e) {
    return redirectOnServer(e);
  }
  return {
    props: {
      locale,
      data: get(collectionApiResponse, "data", {}),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
