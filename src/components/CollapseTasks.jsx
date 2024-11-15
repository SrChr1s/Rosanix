import React, { forwardRef } from "react";
import dayjs from "dayjs";
import { Row, Col, Card, Modal, Tooltip } from "antd";
import { FaCircleCheck, FaPencil, FaTrash } from "react-icons/fa6";

const CustomTrigger = forwardRef((props, ref) => <div {...props} ref={ref} />);

export default function CollapseTasks({
  tasks,
  state,
  priority,
  complete,
  edit,
  del,
  expanded,
  seeMore,
  cardExpanded,
  closeCardModal,
}) {
  return (
    <Row gutter={[16, 16]} justify="start">
      {tasks
        .filter((task) => task.state === state && task.priority === priority)
        .map((task) => (
          <Col xs={24} sm={12} md={8} lg={6} key={task.id}>
            <Card
              title={
                <h2 className="text-lg font-semibold text-white">
                  {task.title}
                </h2>
              }
              extra={
                <span className="text-xs text-[#a35776] pl-5">
                  {task.createdAt !== "CURRENT_TIMESTAMP"
                    ? dayjs(task.createdAt).format("DD/MM/YYYY")
                    : dayjs().format("DD/MM/YYYY")}
                </span>
              }
              bordered={false}
              className="w-full flex flex-col justify-between min-h-[210px] shadow-lg rounded-lg overflow-hidden duration-150 hover:scale-105"
              actions={
                state == "pendiente"
                  ? [
                      <Tooltip title="Marcar como completado" key="complete">
                        <CustomTrigger>
                          <FaCircleCheck
                            className="place-self-center mt-1 hover:text-[#d47da0] w-full"
                            onClick={() => complete(task)}
                          />
                        </CustomTrigger>
                      </Tooltip>,
                      <Tooltip title="Editar tarea" key="edit">
                        <CustomTrigger>
                          <FaPencil
                            className="place-self-center mt-1 hover:text-[#d47da0] w-full"
                            onClick={() => edit(task)}
                          />
                        </CustomTrigger>
                      </Tooltip>,
                      <Tooltip title="Eliminar tarea" key="delete">
                        <CustomTrigger>
                          <FaTrash
                            className="place-self-center mt-1 hover:text-[#d47da0] w-full"
                            onClick={() => del(task.id)}
                          />
                        </CustomTrigger>
                      </Tooltip>,
                    ]
                  : [
                      <Tooltip title="Eliminar tarea" key="delete">
                        <CustomTrigger>
                          <FaTrash
                            className="place-self-center mt-1 hover:text-[#d47da0] w-full"
                            onClick={() => del(task.id)}
                          />
                        </CustomTrigger>
                      </Tooltip>,
                    ]
              }
            >
              {task.descr ? (
                <div className="px-4 text-gray-700 mb-5">
                  <div className="relative">
                    <p
                      className={`${
                        expanded[task.id] ? "" : "line-clamp-1"
                      } break-words`}
                    >
                      {task.descr}
                    </p>
                    {task.descr.length > 100 && (
                      <button
                        className="bottom-0 right-0 text-sm text-[#d16d95] hover:text-[#d47da0]"
                        onClick={() => seeMore(task.id)}
                      >
                        Ver más
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="px-4 text-gray-700 mb-5">
                  <p className="italic text-gray-500">Sin descripción</p>
                </div>
              )}
            </Card>
            {cardExpanded === task.id && (
              <Modal
                open={true}
                onCancel={closeCardModal}
                footer={null}
                closable={false}
                className="custom-task-modal"
              >
                <Card
                  title={
                    <h2 className="text-lg font-semibold text-white">
                      {task.title}
                    </h2>
                  }
                  extra={
                    <span className="text-xs text-[#a35776] pl-5">
                      {dayjs(task.createdAt).format("DD/MM/YYYY")}
                    </span>
                  }
                  bordered={false}
                  className="w-full flex flex-col justify-between min-h-[210px] shadow-lg rounded-lg overflow-hidden"
                  actions={[
                    <button
                      className="text-sm text-[#d16d95] hover:text-[#d47da0] w-full"
                      onClick={closeCardModal}
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
            )}
          </Col>
        ))}
    </Row>
  );
}
