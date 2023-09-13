import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import { useRouter } from "next/router";
import get from "lodash/get";
import Style from "@src/partials/collection/collectionId/style";
import { useTranslation } from "next-i18next";
import CollectionList from "@src/components/lists/collectionList";
import Pagination from "@src/components/antd/pagination";
import { getRequest, redirectOnServer } from "@src/helpers/api";
import {
  API_URL_CATEGORY_SINGLE,
  API_URL_COLLECTION_BY_CATEGORY,
} from "@src/partials/category/const";
import { ROUTE_SINGLE_CATEGORY } from "@src/routes";

export default function CollectionId(props) {
  const { categoryData, collectionData } = props;
  const data = get(collectionData, "data", []);
  const metadata = get(collectionData, "metadata", { offset: 1, total: 0 });
  const { offset, total } = metadata;
  const collections = get(data, "collections", []);
  const [t, i18n] = useTranslation("common");
  const router = useRouter();
  const { query } = router.query;
  const created_at = get(categoryData, "created_at", "");
  const updated_at = get(categoryData, "updated_at", "");
  const id = get(categoryData, "id", "");
  const name = get(categoryData, "name", "");
  const slug = get(categoryData, "slug", "");
  const description = get(categoryData, "description", "");
  function onChangePagination(page) {
    router.replace({
      pathname: ROUTE_SINGLE_CATEGORY.replace(":categoryId", slug),
      query: { offset: page, ...query },
    });
  }
  return (
    <Style>
      <Seo
        title={name}
        desc="Lendochain is a creative playground for artists, curators and collectors to experience the new creative economy."
      />
      <Mainlayout>
        <div className="container pt40 pb40">
          <h1 className="page-title pb20">{`${t("explore")} ${name}`}</h1>
          <p className="page-description">{description}</p>
          <div className="collections pb20">
            <CollectionList data={collections} />
          </div>
          <Pagination
            onChange={onChangePagination}
            current={offset}
            total={total}
          />
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
  const { categoryId } = params;
  let collectionsApiResponse = [];
  let categoryApiResponse = [];
  try {
    [collectionsApiResponse, categoryApiResponse] = await Promise.all([
      (collectionsApiResponse = await getRequest(
        API_URL_COLLECTION_BY_CATEGORY,
        { categoryName: categoryId, ...query }
      )),
      (categoryApiResponse = await getRequest(
        `${API_URL_CATEGORY_SINGLE}/${categoryId}`
      )),
    ]);
  } catch (e) {
    return redirectOnServer(e);
  }
  return {
    props: {
      locale,
      categoryData: get(categoryApiResponse, "data", {}),
      collectionData: get(collectionsApiResponse, "data", []),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
