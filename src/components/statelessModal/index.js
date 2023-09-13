import { Modal } from "antd";
import { useTranslation } from "next-i18next";

export default function StateLessModal(props) {
  const [t, i18n] = useTranslation("common");
  const { title, visibleStatus, onClose, children, className, titleImage } =
    props;
  function renderModalTitle() {
    return (
      <div className="modal-title">
        {titleImage && <img src={titleImage} />}
        <h2>{t(title)}</h2>
      </div>
    );
  }
  return (
    <Modal
      className={className}
      open={visibleStatus}
      onCancel={onClose}
      footer={null}
      title={renderModalTitle()}
      width={440}
      {...props}
    >
      {children}
    </Modal>
  );
}
