import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Style from "@src/partials/exploreCollections/style";
import Mainlayout from "@src/components/layouts/mainLayout";
import CollectionList from "@src/components/lists/collectionList";
import CategorySlider from "@src/components/categorySlider";
import { Row, Col } from "antd";
import Pagination from "@src/components/antd/pagination";
import Seo from "@src/components/seo";
import { getRequest } from "@src/helpers/api";
import { API_URL_COLLECTION } from "@src/partials/exploreCollections/const";
import get from "lodash/get";
import { categories } from "@src/data";
import { useRouter } from "next/router";
import { ROUTE_EXPLORE } from "@src/routes";

export default function ExploreCollections(props) {
  const { data } = props;
  const collections = get(data, "data.collections", []);
  const total = get(data, "metadata.total", 0);
  const offset = get(data, "metadata.offset", 1);
  const router = useRouter();
  const { query } = router;
  const [t, i18n] = useTranslation("common");
  function onChangePagination(page) {
    router.replace({ pathname: ROUTE_EXPLORE, query: { offset: page, query } });
  }
  return (
    <Mainlayout>
      <Seo title="Explore Collections" desc="" />
      <Style>
        <div className="container">
          <Row>
            <Col span={24}>
              <h1 className="page-title pb40 pt40">
                {t("Explore Collections")}
              </h1>
            </Col>
          </Row>
        </div>
          <div className="categories pb40">
            <CategorySlider data={categories} />
          </div>
        <div className="container">
          <Row>
            <Col span={24}>
              <div className="collections pb20">
                <CollectionList data={collections} />
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Col span={24}>
            <Pagination
              onChange={onChangePagination}
              total={total}
              current={offset}
            />
          </Col>
        </Row>
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
  let collectionApiResponse = {};
  try {
    collectionApiResponse = await getRequest(API_URL_COLLECTION, query);
  } catch (e) { }
  return {
    props: {
      data: get(collectionApiResponse, "data", {}),
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
