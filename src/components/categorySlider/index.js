import Style from "./style";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { ROUTE_EXPLORE } from "@src/routes";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";

export default function CategorySlider(props) {
  const [t, i18n] = useTranslation("common");
  const router = useRouter();
  const { query } = router;
  const { data } = props;
  function renderFarm() {
    return data.map(item => {
      return (
        <Link
          key={item.id}
          href={{
            pathname: ROUTE_EXPLORE,
            query: { categoryName: item.slug },
          }}
          passHref
        >
          <a
            className={`category ${
              query.categoryName == item.slug ? "active" : ""
            }`}
          >
            <div>{item.label}</div>
          </a>
        </Link>
      );
    });
  }
  return (
    <Style>
      <div className="category-slider">
        <div className="desktop-version">
          {/* <div className="container"> */}
            <ul>
              <Link
                href={{
                  pathname: ROUTE_EXPLORE,
                }}
                passHref
              >
                <a className={`category ${isEmpty(query) ? "active" : ""}`}>
                  <div>{t("All")}</div>
                </a>
              </Link>
              {renderFarm()}
            </ul>
          {/* </div> */}
        </div>
      </div>
    </Style>
  );
}
