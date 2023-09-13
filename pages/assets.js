import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import Style from "@src/partials/collection/collectionId/style";
import { useTranslation } from "next-i18next";
import { getRequest, redirectOnServer } from "@src/helpers/api";
import get from "lodash/get";
import { API_URL_ITEMS } from "@src/partials/asset/const";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbAlignLeft } from "react-icons/tb";
import Pagination from "@src/components/antd/pagination";
import { Row, Col, Form, Drawer, Collapse, Button } from "antd";
import StatusBy from "@src/components/forms/status";
import PriceBy from "@src/components/forms/price";
import NftList from "@src/components/lists/nftList";
import { ROUTE_ALL_ASSETS } from "@src/routes";
import message from "@src/helpers/message";
import SortBy from "@src/components/forms/sortBy";

const { Item } = Form;
const { Panel } = Collapse;

export default function AllNfts(props) {
  const [t, i18n] = useTranslation("common");
  const router = useRouter();
  const { data } = props;
  const { data: items = [], metadata } = data;
  const { total, offset } = metadata;
  const { query } = router;
  const [form] = Form.useForm();
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const filterDrawerToggle = () => {
    setVisibleDrawer(!visibleDrawer);
  };
  const onCloseFilterDrawer = () => {
    setVisibleDrawer(false);
  };
  function onFinish(changedFields, allFields) {
    if (
      changedFields.hasOwnProperty("currency") ||
      changedFields.hasOwnProperty("min") ||
      changedFields.hasOwnProperty("max")
    ) {
    } else {
      router.replace({
        pathname: ROUTE_ALL_ASSETS,
        query: { ...query, ...allFields, offset: 1 },
      });
    }
  }
  function applyPrice() {
    const allFields = form.getFieldsValue();
    if (allFields.max && allFields.min !== undefined) {
      if (allFields.max >= allFields.min) {
        router.replace({
          pathname: ROUTE_ALL_ASSETS,
          query: { ...query, ...allFields, offset: 1 },
        });
      } else {
        message("error", t("Minumum must be less than maximum"));
      }
    } else {
      router.replace({
        pathname: ROUTE_ALL_ASSETS,
        query: { ...query, ...allFields, offset: 1 },
      });
    }
  }
  function onChangePagination(page) {
    router.replace({
      pathname: ROUTE_ALL_ASSETS,
      query: { ...query, offset: page },
    });
  }
  return (
    <Style>
      <Seo title={t("Browse NFTs")} desc="" />
      <Mainlayout>
        <div className="container pt40 pb40">
          <Form
            form={form}
            className="form"
            onValuesChange={onFinish}
            initialValues={{
              currency: "BNB",
              ...query,
            }}
          >
            <div className="nft-filter">
              <div className="filter-box">
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
                      onClick={() => filterDrawerToggle()}
                    />
                  </Col>
                  <Col>
                    <SortBy />
                  </Col>
                </Row>
              </div>
            </div>
            <div className="list pt40 pb40">
              <NftList data={items} size="medium" />
            </div>
            <Pagination
              onChange={onChangePagination}
              total={total}
              current={offset}
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
          </Form>
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
  let itemApiResponse = {};
  try {
    itemApiResponse = await getRequest(API_URL_ITEMS, query);
  } catch (e) {
    return redirectOnServer(e);
  }

  return {
    props: {
      data: get(itemApiResponse, "data", {}),
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
