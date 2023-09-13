import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import ErrorPage from "@src/components/error";

export default function NotFoundPage(props) {
  const { t } = useTranslation();
  console.log(props);
  return (
    <Mainlayout>
      <Seo title={t("404")} />

      <ErrorPage
        status="404"
        shortDescription={t("page not found")}
        longDescription={t("Sorry, the page you visited does not exist.")}
      />
    </Mainlayout>
  );
}

export const getServerSideProps = async ({ locale = "en" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
