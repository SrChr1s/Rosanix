import { Modal, Button } from "antd";

export default function AntdModal({
  title,
  open,
  onCancel,
  onOk,
  btnCancel,
  btnOk,
  children,
  disabledOk = false,
}) {
  return (
    <Modal
      forceRender
      title={
        <div className="text-center font-[Nunito] text-white text-xl font-semibold mt-2">
          {title}
        </div>
      }
      centered
      closable={false}
      open={open}
      className="border-4 border-[#bbacdf] rounded-xl brightness-90"
      styles={{
        mask: { backdropFilter: "blur(10px)" },
      }}
      footer={
        <div className="flex justify-center gap-3">
          <Button
            onClick={onCancel}
            className="rounded-full bg-white text-[#bbacdf] font-semibold border-2 border-[#bbacdf]"
          >
            {btnCancel}
          </Button>
          <Button
            type="primary"
            onClick={onOk}
            disabled={disabledOk}
            className="rounded-full text-white bg-[#bbacdf] font-semibold border-2 border-[#bbacdf]/60"
          >
            {btnOk}
          </Button>
        </div>
      }
    >
      {children}
    </Modal>
  );
}
