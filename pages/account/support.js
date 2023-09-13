import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Style from "@src/partials/account/setting/style";
import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import { Col, Row, Input } from "antd";
import SettingMenu from "@src/partials/account/setting/settingMenu";
import { hooks, metaMask } from "@src/components/wallet/connectors/metamask";

const { TextArea } = Input;
const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

export default function Setting() {
  const [t, i18n] = useTranslation("common");
  const accounts = useAccounts();
  return (
    <Style>
      <Seo title={t("Account support")} />
      <Mainlayout>
        <div className="container">
          <SettingMenu />
          <Row gutter={30}>
            <Col xs={20} sm={16} md={24} lg={24} xl={24}>
              <div className="pt60 pb60">
                <h1>{t("Account support")}</h1>
              </div>
            </Col>
          </Row>
        </div>
      </Mainlayout>
    </Style>
  );
}

export const getServerSideProps = async ({ res, req, params, locale }) => {
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
