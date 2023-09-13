import { NextSeo } from "next-seo";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { SITE_URL } from "@src/config";

export default function Seo({ title = "", desc = "", isHome = false, image }) {
  const [t, i18n] = useTranslation("common");
  const router = useRouter();
  const URL = (
    `${SITE_URL}` + (router.asPath === "/" ? "" : router.asPath)
  ).split("?")[0];
  const SITE_NAME = "LendoChain";
  return (
    <NextSeo
      title={isHome ? `${t(title)}` : `${t(title)} | ${SITE_NAME}`}
      description={t(desc)}
      canonical={URL}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
      openGraph={{
        type: "website",
        url: URL,
        title: isHome ? `${t(title)}` : `${t(title)} | ${SITE_NAME}`,
        description: t(desc),
        images: [
          {
            url: `${image}`,
            alt: title,
          },
        ],
      }}
    />
  );
}
