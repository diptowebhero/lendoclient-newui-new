import Link from "next/link";
import Style from "./style";
import { useTranslation } from "next-i18next";
import moment from "moment";
import textDots from "@src/helpers/textDots";
import isEmpty from "lodash/isEmpty";
import { Empty } from "antd";
import get from "lodash/get";
import { ROUTE_SINGLE_BLOG } from "@src/routes";
import LazyLoadImage from "@src/components/lazyLoadImage";

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
          <LazyLoadImage src={image} alt={title} width={403} height={215} />
        </div>
        <div className="bottom">
          <div className="content">
            <p className="time">
              {`${moment(new Date(created_at)).format("DD MMMM YYYY")}`}
            </p>
            <h3 className="title">{textDots(title, 60)}</h3>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default function BlogListSecond(props) {
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
