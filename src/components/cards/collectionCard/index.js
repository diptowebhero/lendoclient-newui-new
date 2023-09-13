import Style from "./style";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import textDots from "@src/helpers/textDots";
import { ROUTE_ACCOUNT_OTHERS, ROUTE_SINGLE_COLLECTION } from "@src/routes";
import { truncateAddress } from "@src/helpers/walletConnect/utils.web3";
import get from "lodash/get";
import LazyLoadImage from "@src/components/lazyLoadImage";

export default function CollectionCard({ data }) {
  const [t, i18n] = useTranslation("common");
  const id = get(data, "id", "");
  const name = get(data, "name", "");
  const logoImage = get(data, "logoImage", "");
  const slug = get(data, "slug", "");
  const featured = get(data, "featured", "");
  const featuredImage = get(data, "featuredImage", "");
  const bannerImage = get(data, "bannerImage", "");
  const description = get(data, "description", "");
  const blockChain = get(data, "blockChain", "");
  const paymentToken = get(data, "paymentToken", "");
  const verify = get(data, "verify", false);
  const username = get(data, "user.username", "");
  const avatar = get(data, "user.avatar", "");
  const publicAddress = get(data, "user.publicAddress", "");

  function renderUsername() {
    if (username) {
      if (username.length >= 20) {
        return truncateAddress(username);
      } else {
        return username;
      }
    } else {
      return truncateAddress(publicAddress);
    }
  }

  const coverImg = "/assets/images/collectioncover_img.svg";
  const logoImg = "/assets/images/collectionmain_img.svg";


  return (
    <Style>
      <Link
        href={ROUTE_SINGLE_COLLECTION.replace(":slug", slug)}
        prefetch={false}
      >
        <a className="collection-card" >
          <div className="collection-card-wrapper" style={{ background: "#1D2022", border: "0.5px solid #404242" }}>
            <div className="top">
              <LazyLoadImage
                className="cover"
                src={coverImg || featuredImage}
                alt={name}
                width="100%"
                height={173}
              />
              <div className="avatar">
                <LazyLoadImage
                  width={45}
                  height={45}
                  src={logoImg || logoImage}
                  alt={name}
                />
              </div>
            </div>
            <div className="bottom">
              <h3 className="title">{textDots(name, 40)}</h3>
              <p>
                <span className="by">{`${t("by")}`}</span>{" "}
                <Link
                  href={ROUTE_ACCOUNT_OTHERS.replace(":username", username)}
                  passHref
                  prefetch={false}
                >
                  <a>
                    <span>${renderUsername()}</span>
                  </a>
                </Link>
              </p>
              <p className="desc">{textDots(description, 80)}</p>
            </div>
          </div>
        </a>
      </Link>
    </Style>
  );
}
