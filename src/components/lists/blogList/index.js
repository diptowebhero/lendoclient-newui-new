import LazyLoadImage from "@src/components/lazyLoadImage";
import textDots from "@src/helpers/textDots";
import { ROUTE_SINGLE_BLOG } from "@src/routes";
import { Empty } from "antd";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Style from "./style";

function PostItem({ data }) {
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
  const categoryId = get(data, "categoryId", "");
  const categoryName = get(data, "categoryName", "");
  const slug = get(data, "slug", "");
  const created_at = get(data, "created_at", "");
  return (
    <Link href={ROUTE_SINGLE_BLOG.replace(":slug", slug)} prefetch={false}>
      <a className="blog-post-card">
        <div className="top">
          <LazyLoadImage src={image} alt={title} width="100%" height={215} />
        </div>
        <div className="bottom">
          <div className="content">
            <h3 className="title">{textDots(title, 50)}</h3>
            <p className="description">
              {textDots(description.replace(/<[^>]+>/g, ""), 200)}
            </p>
            <p className="time">
              {`${t("Published")} ${moment(new Date(created_at)).format(
                "DD MMMM YYYY"
              )}`}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default function BlogList(props) {
  const { data } = props;
  function renderFarm() {
    return data.map(item => {
      return (
        <div className="blog-item" key={item.id}>
          <PostItem data={item}></PostItem>
        </div>
      );
    });
  }
  return (
    <Style>
      {!isEmpty(data) ? (
        <div className="blog-list">{renderFarm()}</div>
      ) : (
        <Empty />
      )}
    </Style>
  );
}
