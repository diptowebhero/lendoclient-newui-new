import Style from "./style";
import { useTranslation, Trans } from "next-i18next";
import { Fragment } from "react";

export default function TheBigTitle({ title, coloredString }) {
  const [t, i18n] = useTranslation("common");
  const name = t(coloredString);
  function renderFarm() {
    if (coloredString) {
      return (
        <h2 className="title">
          {" "}
          <Trans i18nKey={title}>
            {" "}
            <strong>{{ name }}</strong>
          </Trans>
        </h2>
      );
    } else {
      return <h2 className="title">{title}</h2>;
    }
  }
  return <Style>{renderFarm()}</Style>;
}
