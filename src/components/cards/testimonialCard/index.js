import Style from "./style";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Col, Row, Typography } from "antd";

const { Paragraph } = Typography;
export default function TestimonialCard({ data }) {
  const [t, i18n] = useTranslation("common");
  const { avatar, name, job, content } = data;
  return (
    <Style>
      <Link href="#">
        <a className="collection-card">
          <div className="collection-card-wrapper">
            <div className="pb20 member-info position-rel row">
              <img
                src="/assets/data/back-member-image.svg"
                className="background-img-member position-abs"
              />
              <img className="img-member" src={avatar} />
              <div className="texts-wrapper pt20">
                <h2 className="title">{name}</h2>
                <p>{job}</p>
              </div>
            </div>
            <p>{content}</p>
          </div>
        </a>
      </Link>
    </Style>
  );
}
