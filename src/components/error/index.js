import { useTranslation } from "next-i18next";
import Style from "./style";
import { Button } from "antd";
import Link from "next/link";
import { ROUTE_HOME } from "@src/routes";

export default function ErrorPage({
  status,
  title,
  shortDescription,
  longDescription,
}) {
  const [t, i18n] = useTranslation("common");
  return (
    <Style>
      <div className="container pb60 pt60">
        <div className="error-box">
          <div className="image">
            <img src="/assets/images/error.svg" />
          </div>
          <div className="info">
            <h4>{t("Error")}</h4>
            <h1 className="status">{status}</h1>
            <h2 className="short-description">{shortDescription}</h2>
            <p className="long-description">{longDescription}</p>
            <Link href={ROUTE_HOME} prefetch={false}>
              <a>
                <Button type="primary" size="large">
                  {t("Back Home")}
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Style>
  );
}
