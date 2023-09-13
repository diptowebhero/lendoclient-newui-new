import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Style from "@src/partials/blog/style";
import Mainlayout from "@src/components/layouts/mainLayout";
import { Row, Col } from "antd";
import Seo from "@src/components/seo";
import TheBigTitle from "@src/components/titles/theBigTitle";
import BlogListSecond from "@src/components/lists/blogListSecond";
import Pagination from "@src/components/antd/pagination";
import { getRequest } from "@src/helpers/api";
import { API_URL_BLOG_LIST } from "@src/partials/blog/const";
import get from "lodash/get";
import { useRouter } from "next/router";
import { ROUTE_BLOG } from "@src/routes";
export default function BlogList({ data }) {
  const [t, i18n] = useTranslation("common");
  const { data: blogData, metadata } = data;
  const { total, offset } = metadata;
  const router = useRouter();
  function onChangePagination(page) {
    router.replace({ pathname: ROUTE_BLOG, query: { offset: page } });
  }
  return (
    <Mainlayout overflow="visible">
      <Seo title="blog" desc="" />
      <Style>
        <div className="container">
          <div className="pt60 pb60">
            <TheBigTitle title="the.blog" coloredString="blog" />
          </div>
        </div>
        <div className="center-pipe-shape">
          <svg
            className="shape"
            xmlns="http://www.w3.org/2000/svg"
            width="1445.979"
            height="512.206"
            viewBox="0 0 1445.979 512.206"
          >
            <path
              id="Path_21"
              data-name="Path 21"
              d="M-1415,598.157s189.443,126.646,410.783,108.894,406.124-169.174,406.124-169.174,227-196.378,500.2-39.818"
              transform="translate(1404.339 -405.005) rotate(-7)"
              fill="none"
              stroke="#fafafa"
              strokeLinecap="round"
              strokeWidth="71"
            />
          </svg>
          <div className="container">
            <div className="pb40">
              <BlogListSecond data={blogData} />
            </div>
          </div>
        </div>
        <div className="container">
          <Row>
            <Col span={24}>
              <Pagination
                onChange={onChangePagination}
                current={offset}
                total={total}
              />
            </Col>
          </Row>
        </div>
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
  let blogApiResponse = {};
  try {
    blogApiResponse = await getRequest(API_URL_BLOG_LIST, query);
  } catch (e) {}
  return {
    props: {
      data: get(blogApiResponse, "data", {}),
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
