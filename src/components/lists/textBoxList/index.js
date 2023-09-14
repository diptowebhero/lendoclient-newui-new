import { Col, Row } from "antd";
import { useTranslation } from "next-i18next";
import Style from "./style";

function TextBoxItem({ data }) {
  const [t, i18n] = useTranslation("common");
  const { subject, icon, description, clssName } = data;
  return (
    <div className="steps  textbox-item">
      <div
        className="stepcontainer"
        lg={6}
        sm={12}
        xs={24}
        style={{ marginBottom: "5rem" }}
      >
        <div className={`step ${clssName ? clssName : ""}`}>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={24} className="create-icon-container">
              <div>
                <div className="mb-4 stepno">STEP 01</div>
                <div className="pb-3 stepname">{t(subject)}</div>
                <div className="aboutstep">{t(description)}</div>
              </div>
              <div className="stepicon text-end">
                <img src={icon} alt="createprofileicon" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default function TextBoxList(props) {
  const [t, i18n] = useTranslation("common");
  const { data, title } = props;
  function renderFarm() {
    return data.map((item, i) => {
      return (
        <Col xs={24} sm={12} md={8} lg={6} xl={6} key={i}>
          <TextBoxItem data={item}></TextBoxItem>
        </Col>
      );
    });
  }
  return (
    <Style>
      <h2 className="title">{t(title)}</h2>
      <div className="textbox-list">
        <Row gutter={24}>{renderFarm()}</Row>
      </div>
    </Style>
  );
}
