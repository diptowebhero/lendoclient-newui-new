import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import { getRequest, redirectOnServer } from "@src/helpers/api";
import { get } from "lodash";

export default function Privacy({ data }) {
  const { content = "" } = data;
  const [t, i18n] = useTranslation("common");
  return (
    <Mainlayout>
      <Seo title={t("Privacy Policy")} desc="" />
      <div className="container">
        <h1 className="page-title pb40 pt40">{t("Privacy Policy")}</h1>
        <div
          className="page-description"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </Mainlayout>
  );
}

export const getServerSideProps = async ctx => {
  const { res, req, params, locale, query } = ctx;
  let systemPolicyApiResponse = {};
  try {
    systemPolicyApiResponse = await getRequest("system-policy");
  } catch (e) {
    return redirectOnServer(e);
  }

  return {
    props: {
      data: get(systemPolicyApiResponse, "data.data", {}),
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
