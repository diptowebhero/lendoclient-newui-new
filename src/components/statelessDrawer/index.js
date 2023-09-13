import { Drawer } from "antd";
import { useTranslation } from "next-i18next";

export default function StateLessDrawer(props) {
  const [t, i18n] = useTranslation("common");
  const { title, visibleStatus, onClose, children, className, titleImage } =
    props;
  function renderDrawerTitle() {
    return (
      <div className="modal-title">
        {titleImage && <img src={titleImage} />}
        <h2>{t(title)}</h2>
      </div>
    );
  }
  return (
    <Drawer
      className={className}
      open={visibleStatus}
      onClose={onClose}
      footer={null}
      title={renderDrawerTitle()}
      {...props}
    >
      {children}
    </Drawer>
  );
}
