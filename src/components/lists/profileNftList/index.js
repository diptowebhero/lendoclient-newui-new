import Link from "next/link";
import Style from "./style";
import { useTranslation } from "next-i18next";
import TitleWithVerified from "@src/components/titleWithVerify";
import textDots from "@src/helpers/textDots";
import get from "lodash/get";
import { ROUTE_SINGLE_ASSET, ROUTE_SINGLE_COLLECTION } from "@src/routes";
import { isEmpty } from "lodash";
import { Empty } from "antd";
import LazyLoadImage from "@src/components/lazyLoadImage";

function CardNft({ data }) {
  const [t, i18n] = useTranslation("common");
  const id = get(data, "id", "");
  const fileUrl = get(data, "fileUrl", "");
  const name = get(data, "name", "");
  const slug = get(data, "slug", "");
  const isVerified = get(data, "isVerified", false);
  const collectionName = get(data, "collection.name", "");
  const collectionSlug = get(data, "collection.slug", "");
  return (
    <Link href={ROUTE_SINGLE_ASSET.replace(":slug", slug)} shallow={false} >
      <a className="nft-card" style={{ background: "#1D2022", border: "0.5px solid #404242" }}>
        <div className="top">
          <LazyLoadImage height={293} width="100%" src={fileUrl} alt={name} />
        </div>
        <div className="bottom">
          <div className="content">
            <div className="name">
              <h4 style={{color:"white"}}>{textDots(name, 35)}</h4>
            </div>
            <div className="collection-title">
              <h4>
                <TitleWithVerified
                  title={textDots(collectionName, 35)}
                  verified={isVerified}
                  link={ROUTE_SINGLE_COLLECTION.replace(
                    ":slug",
                    collectionSlug
                  )}
                />
              </h4>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default function ProfileNftList(props) {
  const { data } = props;
  function renderFarm() {
    return data.map(item => {
      return (
        <div className="nft-item" key={item.id}>
          <CardNft data={item}></CardNft>
        </div>
      );
    });
  }
  return (
    <Style>
      {!isEmpty(data) ? (
        <div className="nft-profile-list">{renderFarm()}</div>
      ) : (
        <Empty />
      )}
    </Style>
  );
}
