import Link from "next/link";
import Style from "./style";
import { useTranslation } from "next-i18next";
import NetworkIconWithPrice from "@src/components/networkIconWithPrice";
import IncreaseDecreaseStatus from "@src/components/increaseDecreaseStatus";
import textDots from "@src/helpers/textDots";
import AvatarWithVerified from "../avatarWithVerify";
import { ROUTE_SINGLE_COLLECTION } from "@src/routes";
import { CheckCircleFilled } from '@ant-design/icons';

import get from "lodash/get";

function CollectionItem({ data,index }) {

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
  const asset = get(data, "price.asset", "BNB");
  const totalVolume = get(data, "price.totalVolume", 0);
  const last7d = get(data, "price.last7d.amount", 0);
  const last7dIsPositive = get(data, "price.last7d.isPositive", false);
  return (
    <Link
      prefetch={false}
      href={ROUTE_SINGLE_COLLECTION.replace(":slug", slug)}
    >
      <a className="collection-item">
        {index+1}
        <AvatarWithVerified image={logoImage} title={name} verified={verify} />
        <div className="information">
          <div className="first">
            <div className="upper" >
              <div className="nftname"> &nbsp; &nbsp;
                {textDots(name, 20)}
                <span className="checkicon">&nbsp;
                  <CheckCircleFilled />
                </span>
              </div>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
              <div className="percent">
                <IncreaseDecreaseStatus
                  isIncrease={last7dIsPositive}
                  average={last7d}
                />
              </div>
            </div>
            <div className="lower" >
              &nbsp;&nbsp;&nbsp;&nbsp;Floor :
              <div className="" style={{ marginTop: '-7%' }}>&nbsp; &nbsp;
                <NetworkIconWithPrice
                  blockchain={ asset}
                  price={totalVolume}
                  isToFixed={true}
                />
              </div>&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              <div className="dailyvol">
                Daily Volume : &nbsp;
                <span className="binancedex">&nbsp;
                  <img src="assets/images/img/binancedexicon.png" alt="binancedexicon" />
                </span>&nbsp;
                <span className="number">&nbsp;4.5K</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default function TopCollections(props) {
  const { data } = props;
  function renderFarm() {
    return data.map((item,index) => {
      return <CollectionItem index={index} data={item} key={item.id}></CollectionItem>;
    });
  }
  return (
    <Style>
      <div className="top-collection-box">{renderFarm()}</div>
    </Style>
  );
}
