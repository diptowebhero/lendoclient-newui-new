import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Mainlayout from "@src/components/layouts/mainLayout";
import Seo from "@src/components/seo";
import { Fragment } from "react";
import ErrorPage from "@src/components/error";

export default function Error(props) {
  const [t, i18n] = useTranslation("common");
  console.log(props);
  const { statusCode } = props;
  return (
    <Mainlayout>
      <Fragment>
        <Seo title={t(statusCode)} />
        <ErrorPage
          status={statusCode}
          shortDescription={
            statusCode == 404
              ? t("page not found.")
              : t("internal server error")
          }
          longDescription={
            statusCode == 404
              ? t("this page is lost.")
              : t("Sorry, something went wrong.")
          }
        />
      </Fragment>
    </Mainlayout>
  );
}

export const getServerSideProps = async ({
  res,
  req,
  params,
  locale = "en",
  query,
}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {
    props: {
      statusCode,
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
