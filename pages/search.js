import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import Style from "@src/partials/search/style";
import { Row, Col, Form, Select, Drawer, Collapse, Button } from "antd";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CollectionSearchSlider from "@src/components/collectionSearchSlider";
import NftList from "@src/components/lists/nftList";
import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL_SEARCH } from "@src/partials/search/const";
import get from "lodash/get";
import { getRequest, redirectOnServer } from "@src/helpers/api";
import { TbAlignLeft } from "react-icons/tb";
import { ROUTE_SEARCH } from "@src/routes";
import Pagination from "@src/components/antd/pagination";
import SortBy from "@src/components/forms/sortBy";
import StatusBy from "@src/components/forms/status";
import PriceBy from "@src/components/forms/price";
import message from "@src/helpers/message";

const { Item } = Form;
const { Option } = Select;
const { Panel } = Collapse;

export default function Search(props) {
  const { searchData } = props;
  const data = get(searchData, "data", []);
  const metadata = get(searchData, "metadata", { offset: 1, total: 0 });
  const { offset, total } = metadata;
  const collections = get(data, "collections", []);
  const items = get(data, "items", []);
  const router = useRouter();
  const { query } = router;
  const [t, i18n] = useTranslation("common");
  const [form] = Form.useForm();
  const [visibleFilterDrawer, setVisibleFilterDrawer] = useState(false);
  function onFinish(changedFields, allFields) {
    if (
      changedFields.hasOwnProperty("currency") ||
      changedFields.hasOwnProperty("min") ||
      changedFields.hasOwnProperty("max")
    ) {
    } else {
      router.replace({
        pathname: ROUTE_SEARCH,
        query: { ...query, ...allFields, offset: 1 },
      });
    }
  }


  function applyPrice() {
    const allFields = form.getFieldsValue();
    if (allFields.max && allFields.min !== undefined) {
      if (allFields.max >= allFields.min) {
        router.replace({
          pathname: ROUTE_SEARCH,
          query: { ...query, ...allFields, offset: 1 },
        });
      } else {
        message("error", t("Minumum must be less than maximum"));
      }
    } else {
      router.replace({
        pathname: ROUTE_SEARCH,
        query: { ...query, ...allFields, offset: 1 },
      });
    }
  }



  function onChangePagination(page) {
    router.replace({
      pathname: ROUTE_SEARCH,
      query: { ...query, offset: page },
    });
  }

  
  function showFilterDrawer() {
    setVisibleFilterDrawer(true);
  }
  function onCloseFilterDrawer() {
    setVisibleFilterDrawer(false);
  }
  return (
    <Mainlayout>
      <Seo
        title="Browse NFTs"
        desc="A gas-free marketplace for NFTs on Polygon. Create, buy, sell, and auction NFTs on the Polygon blockchain without paying any gas fees. Browse popular no-gas fees NFTs."
      />
      <Style>
        <Form
          form={form}
          name="filter"
          className="form"
          onValuesChange={onFinish}
          initialValues={{
            currency: "BNB",
            ...query,
          }}
        >
          <div className="container pt40 pb40">
            <Row
              justify="space-between"
              align="center"
              className="sort-filter-section"
            >
              <Col>
                <Button
                  className="curve default"
                  size="large"
                  icon={<TbAlignLeft />}
                  onClick={() => showFilterDrawer()}
                />
              </Col>
              <Col>
                <SortBy />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <CollectionSearchSlider data={collections} />
              </Col>
            </Row>
            <div className="pt60">
              <h3 className="pb40">{t("total items", { total: total })}</h3>
              <Row>
                <Col span={24}>
                  <NftList data={items} size="medium" />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="pt40">
                    <Pagination
                      onChange={onChangePagination}
                      total={total}
                      current={offset}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <Drawer
            title=""
            className="filter-drawer"
            onClose={onCloseFilterDrawer}
            open={visibleFilterDrawer}
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
        </Form>
      </Style>
    </Mainlayout>
  );
}
export const getServerSideProps = async ({
  res,
  req,
  params,
  locale,
  query,
}) => {
  let searchApiResponse = {};
  try {
    searchApiResponse = await getRequest(API_URL_SEARCH, query);
  } catch (e) {
    return redirectOnServer(e);
  }
  return {
    props: {
      searchData: get(searchApiResponse, "data", {}),
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
