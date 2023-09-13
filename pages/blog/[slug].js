import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Style from "@src/partials/blog/style";
import { useRouter } from "next/router";
import Mainlayout from "@src/components/layouts/mainLayout";
import Breadcrumbs from "nextjs-breadcrumbs";
import { Row, Col } from "antd";
import Seo from "@src/components/seo";
import Link from "next/link";
import BlogListSidebar from "@src/components/blogListSidebar";
import time from "@src/helpers/time";
import { ROUTE_SINGLE_BLOG, ROUTE_BLOG_CATEGORY } from "@src/routes";
import {
  API_URL_BLOG_LATEST,
  API_URL_BLOG_SINGLE,
} from "@src/partials/blog/const";
import get from "lodash/get";
import { getRequest, redirectOnServer } from "@src/helpers/api";
import LazyLoadImage from "@src/components/lazyLoadImage";

export default function BlogSingle({ data, latestData }) {
  const [t, i18n] = useTranslation("common");
  const id = get(data, "id", "");
  const title = get(data, "title", "");
  const description = get(data, "description", "");
  const content = get(data, "content", "");
  const lang = get(data, "lang", "");
  const image = get(data, "image", "");
  const image_t = get(data, "image_t", "");
  const image_m = get(data, "image_m", "");
  const banner = get(data, "banner", "");
  const slug = get(data, "slug", "");
  const created_at = get(data, "created_at", "");
  const categoryName = get(data, "category.name", "");
  const categorySlug = get(data, "category.slug", "");
  return (
    <Mainlayout overflow="visible">
      <Seo title={slug} desc="test" image={image} />
      <Style>
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
          <div className="container single-page pb40 pt40">
            <div className="pb20">
              <Breadcrumbs rootLabel="Home" containerClassName="breadcrumb" />
            </div>
            <Row gutter={24}>
              <Col
                xs={{ span: 24, order: 2 }}
                sm={{ span: 24, order: 2 }}
                md={{ span: 24, order: 2 }}
                lg={{ span: 8, order: 1 }}
                xl={{ span: 6, order: 1 }}
              >
                <BlogListSidebar data={latestData} />
              </Col>
              <Col
                xs={{ span: 24, order: 1 }}
                sm={{ span: 24, order: 1 }}
                md={{ span: 24, order: 1 }}
                lg={{ span: 16, order: 2 }}
                xl={{ span: 18, order: 2 }}
              >
                <div className="main-single-post">
                  <div className="hero-image">
                    <LazyLoadImage
                      src={image}
                      alt={title}
                      width="100%"
                      height={385}
                    />
                  </div>
                  <div className="information">
                    <div className="time">{time(created_at)}</div>
                    {/* <div className="writer">{t("by")} 0age</div> */}
                    <div className="category">
                      <Link
                        href={ROUTE_BLOG_CATEGORY.replace(
                          ":slug",
                          categorySlug
                        )}
                        prefetch={false}
                      >
                        <a>{categoryName}</a>
                      </Link>
                    </div>
                  </div>

                  <div className="content">
                    <h1 className="title">{title}</h1>
                    <div
                      className="text"
                      dangerouslySetInnerHTML={{ __html: content }}
                    ></div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Style>
    </Mainlayout>
  );
}

export const getServerSideProps = async ({ res, req, params, locale }) => {
  const { slug } = params;
  let blogApiResponse = [];
  let blogLatestApiResponse = [];
  try {
    [blogApiResponse, blogLatestApiResponse] = await Promise.all([
      (blogApiResponse = await getRequest(`${API_URL_BLOG_SINGLE}/${slug}`)),
      (blogLatestApiResponse = await getRequest(
        `${API_URL_BLOG_LATEST}/${slug}`
      )),
    ]);
  } catch (e) {
    return redirectOnServer(e);
  }
  return {
    props: {
      data: get(blogApiResponse, "data.data", {}),
      latestData: get(blogLatestApiResponse, "data.data", []),
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
