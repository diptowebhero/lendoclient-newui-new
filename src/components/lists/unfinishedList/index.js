import Link from "next/link";
import Style from "./style";
import { useTranslation } from "next-i18next";
import TitleWithVerified from "@src/components/titleWithVerify";
import textDots from "@src/helpers/textDots";
import get from "lodash/get";
import { ROUTE_SINGLE_ASSET, ROUTE_SINGLE_COLLECTION } from "@src/routes";
import { isEmpty } from "lodash";
import LazyLoadImage from "@src/components/lazyLoadImage";
import {
  Button,
  Dropdown,
  PageHeader,
  Row,
  Tag,
  Typography,
  Empty,
} from "antd";
import time from "@src/helpers/time";
const { Paragraph } = Typography;

export default function UnfinishedList(props) {
  const [t, i18n] = useTranslation("common");
  const { data } = props;

  const IconLink = ({ src, text }) => (
    <a className="example-link">
      <img className="example-link-icon" src={src} alt={text} />
      {text}
    </a>
  );

  function renderFarm() {
    return data.map(item => {
      const message = get(item, "message", "");
      const id = get(item, "id", "");
      const name = get(item, "data.item.name", "");
      const protocol = get(item, "data.item.protocol", "");
      const created_at = get(item, "data.item.created_at", "");
      const image = get(item, "data.item.fileUrl", "");
      return (
        <PageHeader
          key={id}
          ghost={true}
          title={name}
          className="unfinished-item"
          subTitle={protocol}
          tags={<Tag color="blue">{time(created_at)}</Tag>}
          extra={[
            <Button key="3">{t("Reject")}</Button>,
            <Button key="1" type="primary">
              {t("Blockchain sync")}
            </Button>,
          ]}
          avatar={{
            src: image,
          }}
        >
          {message}
        </PageHeader>
      );
    });
  }
  return (
    <Style>
      {!isEmpty(data) ? (
        <div className="unfinished-list">{renderFarm()}</div>
      ) : (
        <Empty />
      )}
    </Style>
  );
}
