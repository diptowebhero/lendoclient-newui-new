import {
  ROUTE_ACCOUNT_NOTIFICATIONS,
  ROUTE_ACCOUNT_SETTING,
  ROUTE_ACCOUNT_SETTING_SUPPORT,
} from "@src/routes";
import { useTranslation } from "next-i18next";
import Style from "./style";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CustomerServiceOutlined,
  NotificationOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function SettingMenu() {
  const [t, i18n] = useTranslation("common");
  const router = useRouter();
  return (
    <Style>
      <div className="pt60 pb60">
        {/* <h3 className="title">{t("Setting")}</h3> */}
        <ul>
          <li>
            <Link href={ROUTE_ACCOUNT_SETTING} preFetch={false}>
              <a
                className={
                  router.pathname == ROUTE_ACCOUNT_SETTING ? "active" : null
                }
              >
                <span>{t("Profile")}</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href={ROUTE_ACCOUNT_SETTING_SUPPORT}>
              <a
                className={
                  router.pathname == ROUTE_ACCOUNT_SETTING_SUPPORT
                    ? "active"
                    : null
                }
              >
                <span>{t("Account support")}</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href={ROUTE_ACCOUNT_NOTIFICATIONS} preFetch={false}>
              <a
                className={
                  router.pathname == ROUTE_ACCOUNT_NOTIFICATIONS
                    ? "active"
                    : null
                }
              >
                <span>{t("Notifications")}</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </Style>
  );
}


  