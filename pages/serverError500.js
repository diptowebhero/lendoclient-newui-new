import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import ErrorPage from "@src/components/error";

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

const ServerErrorPage = () => {
  const { t } = useTranslation();
  return (
    <Mainlayout>
      <Seo title={t("500")} />
      <ErrorPage
        status="500"
        shortDescription={t("internal server error")}
        longDescription={t("Sorry, something went wrong.")}
      />
    </Mainlayout>
  );
};

export default ServerErrorPage;
