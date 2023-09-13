import Link from "next/link";
import Style from "./style";
import { useTranslation } from "next-i18next";
import { ROUTE_SINGLE_BLOG } from "@src/routes";
import textDots from "@src/helpers/textDots";
import get from "lodash/get";
import LazyLoadImage from "../lazyLoadImage";

export default function BlogListSidebar({ data }) {
  const [t, i18n] = useTranslation("common");
  function renderFarm() {
    return data.map(item => {
      const id = get(item, "id", "");
      const title = get(item, "title", "");
      const description = get(item, "description", "");
      const content = get(item, "content", "");
      const lang = get(item, "lang", "");
      const image = get(item, "image", "");
      const image_t = get(item, "image_t", "");
      const image_m = get(item, "image_m", "");
      const banner = get(item, "banner", "");
      const categoryId = get(item, "categoryId", "");
      const categoryName = get(item, "categoryName", "");
      const slug = get(item, "slug", "");
      const created_at = get(item, "created_at", "");
      return (
        <div className="blog-list-sidebar-item" key={id}>
          <Link
            href={ROUTE_SINGLE_BLOG.replace(":slug", slug)}
            prefetch={false}
          >
            <a className="item">
              <div className="image">
                <LazyLoadImage
                  src={image}
                  alt={title}
                  width={118}
                  height={60}
                />
              </div>
              <h4 className="title">{textDots(title, 50)}</h4>
            </a>
          </Link>
        </div>
      );
    });
  }
  return (
    <Style>
      <div className="blog-list-sidebar">
        <div className="blog-list-sidebar-wrapper">
          <h2 className="section-title">{t("Last blog")}</h2>
          {renderFarm()}
        </div>
      </div>
    </Style>
  );
}
