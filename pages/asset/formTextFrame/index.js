import Link from "next/link";
import Icon, { RightOutlined } from "@ant-design/icons";
import Style from "./style";
import { useTranslation } from "next-i18next";

export default function TextFrame(props) {
  const [t, i18n] = useTranslation("common");
  const { title, title2, title3, icon, formText, t1_size } = props;
  console.log({t1_size})
  return (
    <Style>
      <h2 style={{ fontSize: t1_size }} className="titles">
        {t(title)}
        {icon && <span className="text_orange">*</span>}
      </h2>
      <p className="title_2" >{t(title2)}</p>
      <p style={{ marginTop: '-1.6%' }} className="title_2" >{t(title3)}</p>
      <div className="form-text">{t(formText)}</div>
    </Style>
  );
}


