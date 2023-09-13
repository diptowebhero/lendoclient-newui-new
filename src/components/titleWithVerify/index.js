import Link from "next/link";
import Style from "./style";

export default function TitleWithVerified(props) {
  const { title, verified = false, link } = props;
  const renderFarm = () => {
    if (link) {
      return (
        <Link href={link}>
          <a>
            <div className="title-with-verify">
              <span>{title}</span>
              {verified ? <img src="/assets/icons/verified-icon.svg" /> : ""}
            </div>
          </a>
        </Link>
      );
    } else {
      return (
        <div className="title-with-verify">
          <span>{title}</span>
          {verified ? <img src="/assets/icons/verified-icon.svg" /> : ""}
        </div>
      );
    }
  };
  return <Style>{renderFarm()}</Style>;
}
