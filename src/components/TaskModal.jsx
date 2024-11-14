import { Modal, Card } from "antd";
import dayjs from "dayjs";

const TaskModal = ({ task, isVisible, onClose }) => (
    <Modal
      open={isVisible}
      onCancel={onClose}
      closable={false}
      footer={null}
      centered={false}  
      className="custom-task-modal"  
    >
      <Card
        title={
          <h2 className="text-lg font-semibold text-white">{task.title}</h2>
        }
        extra={
          <span className="text-xs text-[#a35776] pl-5">
            {dayjs(task.createdAt).format("DD/MM/YYYY")}
          </span>
        }
        bordered={false}
        className="w-full flex flex-col justify-between min-h-[220px] rounded-lg overflow-hidden"
        actions={[
          <button
            className="text-sm text-[#d16d95] hover:text-[#d47da0] w-full"
            onClick={onClose}
          >
            Cerrar
          </button>,
        ]}
      >
        <div className="px-4 text-gray-700 mb-5">
          <p className="break-words">{task.descr}</p>
        </div>
      </Card>
    </Modal>
);

export default TaskModal;
