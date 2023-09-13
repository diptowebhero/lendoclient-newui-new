import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Style from "@src/partials/exploreCollections/style";
import Mainlayout from "@src/components/layouts/mainLayout";
import CollectionList from "@src/components/lists/collectionList";
import { Row, Col, Tooltip, Button } from "antd";
import Pagination from "@src/components/antd/pagination";
import Seo from "@src/components/seo";
import { InfoCircleOutlined } from "@ant-design/icons";
import { ROUTE_CREATE_COLLECTION, ROUTE_MY_COLLECTIONS } from "@src/routes";
import Link from "next/link";
import { API_URL_GET_USER_COLLECTION } from "@src/partials/collection/const";
import { getRequest, redirectOnServer } from "@src/helpers/api";
import { get } from "lodash";

export default function MyCollections({ data }) {
  const [t, i18n] = useTranslation("common");
  const total = get(data, "metadata.total", 0);
  const offset = get(data, "metadata.offset", 1);
  const myCollectionsItems = get(data, "data", []);
  function onChangePagination(page) {
    router.replace({
      pathname: ROUTE_MY_COLLECTIONS,
      query: { offset: page },
    });
  }
  return (
    <Mainlayout>
      <Seo title={t("My Collections")} desc="" />
      <Style>
        <div className="container">
          <Row>
            <Col span={24}>
              <h1 className="page-title pb40 pt40">{t("My Collections")}</h1>
              <div className="page-description">
                <p style={{color:"white"}}>
                  
                  {t(
                    "Create and manage collections of unique NFTs to share and sell."
                  )}
                </p>
                <Tooltip
                  overlayStyle={{
                    whiteSpace: "pre-line",
                    textAlign: "center",
                  }}
                  overlayInnerStyle={{ textAlign: "center" }}
                  title={t(
                    "Collections can be created either directly on LendoChain."
                  )}
                >
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
              <div className="page-cta pb60">
                <Link href={ROUTE_CREATE_COLLECTION} preFetch={false}>
                  <a>
                    <Button type="primary" size="large">
                      {t("Create a collection")}
                    </Button>
                  </a>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row>
            <Col span={24}>
              <div className="collections pb60">
                <CollectionList data={myCollectionsItems} />
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Col span={24}>
            <Pagination
              onChange={onChangePagination}
              current={offset}
              total={total}
            />
          </Col>
        </Row>
      </Style>
    </Mainlayout>
  );
}

export const getServerSideProps = async ctx => {
  const { res, req, params, locale, query } = ctx;
  let userCollectionsApiResponse = {};
  try {
    if (query.blockChain) {
      userCollectionsApiResponse = await getRequest(
        API_URL_GET_USER_COLLECTION,
        query,
        ctx
      )
    }
  } catch (e) {
    return redirectOnServer(e);
  }

  return {
    props: {
      data: get(userCollectionsApiResponse, "data", {}
      ),
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
