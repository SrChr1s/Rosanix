import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/Tasks";
import { useAuth } from "../context/Auth";
import dayjs from "dayjs";
import {
  ConfigProvider,
  Layout,
  Menu,
  Spin,
  Form,
  Input,
  Select,
  DatePicker,
  Card,
  Button,
  Row,
  Col,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { FaIdCard, FaKey, FaPlus, FaPencil, FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AntdModal from "../components/AntdModal";
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [myData, setMyData] = useState(false);
  const [logoutSure, setLogoutSure] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [today, setToday] = useState("");
  const [expanded, setExpanded] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskValues, setTaskValues] = useState({});
  const [isTaskMod, setIsTaskMod] = useState(false);

  const { user, logout, updateInfo } = useAuth();
  const { tasks, getTasks, createTask, deleteTask, updateTask } = useTasks();
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const handleMenuClick = async (e) => {
    setLoading(true);

    if (e.key == 1) {
      setNewTask(true);
      setLoading(false);
    }

    if (e.key == 2) {
      setMyData(true);
      setLoading(false);
    }

    if (e.key == 3) {
      setLogoutSure(true);
      setLoading(false);
    }
  };

  const handleCreateTask = async (values) => {
    setLoading(true);
    const res = await createTask(values);

    if (res) {
      if (res.code == "ERR_NETWORK") {
        setLoading(false);
        return MySwal.fire({
          icon: "error",
          title: "Ups!",
          text: "Error en el servidor, intenta más tarde.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#e299b6",
        });
      }
      setLoading(false);
      MySwal.fire({
        icon: "error",
        title: "Ups!",
        text: res.response.data,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e299b6",
      });
    } else {
      setLoading(false);
      await MySwal.fire({
        icon: "success",
        title: "Éxito!",
        text: "Has creado una tarea correctamente",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e299b6",
      }).then((res) => navigate(0));
    }
  };

  const handleUpdateTask = async (values) => {
    setLoading(true);
    const res = await updateTask({
      ...values,
      expiresIn: values.expiresIn
        ? dayjs(values.expiresIn).format("YYYY-MM-DDTHH:mm:ss.sss[Z]")
        : "",
      descr: values.descr ? values.descr.trim() : "",
    });

    if (res) {
      if (res.code == "ERR_NETWORK") {
        setLoading(false);
        return MySwal.fire({
          icon: "error",
          title: "Ups!",
          text: "Error en el servidor, intenta más tarde.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#e299b6",
        });
      }
      setLoading(false);
      MySwal.fire({
        icon: "error",
        title: "Ups!",
        text: res.response.data,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e299b6",
      });
    } else {
      setLoading(false);
      await MySwal.fire({
        icon: "success",
        title: "Éxito!",
        text: "Has modificado esta tarea correctamente",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e299b6",
      }).then((res) => navigate(0));
    }
  };

  const handleDeleteTask = (id) => {
    MySwal.fire({
      title: "Estás seguro?",
      text: "No podrás recuperar esta tarea!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e299b6",
      cancelButtonColor: "#bbacdf",
      confirmButtonText: "Si, borrala!",
      cancelButtonText: "No, me arrepentí",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id);
        MySwal.fire({
          title: "Eliminado!",
          text: "Tu tarea ha sido eliminada con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#e299b6",
        });
      }
    });
  };

  const handleLogout = async () => {
    setLogoutSure(false);
    setLoading(true);
    await logout();
    setLoading(false);
    navigate("/");
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    handleEditToggle();
    closeModal();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateInfo({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
      });
      navigate(0);
    }, 1000);
  };

  const handlePasswordChange = () => {
    // manejar el cambio de contraseña
    setShowPasswordModal(false);
  };

  const toggleDescription = (taskId) => {
    setExpanded((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const closeModal = () => {
    setNewTask(false);
    setMyData(false);
    setLogoutSure(false);
    setShowEditModal(false);
  };

  const handleEditModal = (task) => {
    setShowEditModal(true);
    setTaskValues({
      ...task,
      expiresIn: task.expiresIn ? dayjs(task.expiresIn, "YYYY-MM-DD") : null,
    });
  };

  useEffect(() => {
    setToday(
      `${dayjs().year()}-${(dayjs().month() + 1)
        .toString()
        .padStart(2, "0")}-${dayjs().date().toString().padStart(2, "0")}`
    );
    getTasks();
  }, []);

  useEffect(() => {
    form.setFieldsValue(taskValues);
  }, [form, taskValues]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#d47da0",
        },
        components: {
          Modal: {
            headerBg: "transparent",
            footerBg: "transparent",
          },
          Layout: {
            triggerBg: "#84799b3e",
          },
          Button: {
            colorPrimaryHover: "#947bcf",
          },
          Input: {
            colorBorder: "white",
            activeBorderColor: "#947bcf",
            hoverBorderColor: "#947bcf",
          },
          Select: {
            activeBorderColor: "#947bcf",
            hoverBorderColor: "#947bcf",
          },
          DatePicker: {
            activeBorderColor: "#947bcf",
            hoverBorderColor: "#947bcf",
          },
          Card: {
            colorTextHeading: "#ffffff",
            headerBg: "#e299b6",
          },
        },
      }}
    >
      <Layout className="overflow-hidden min-h-screen bg-gradient-to-b from-[#a5caf5] to-[#cebdf4]">
        <Sider
          collapsible
          collapsed={isOpen}
          onCollapse={() => setIsOpen(!isOpen)}
          className="fixed min-h-screen inset-0 overflow-auto top-0 bottom-0 bg-gradient-to-b from-[#a5caf5] to-[#cebdf4] transition-all duration-300"
          width={230}
        >
          {isOpen && (
            <div className="logo w-12 sm:w-14 mt-3 mb-10 drop-shadow-sm self-center">
              <img src="/logo-rosanix.png" alt="logo" />
            </div>
          )}

          {!isOpen && (
            <div className="logo w-44 sm:w-48 mt-2 mb-10 drop-shadow-sm self-center">
              <img src="/main-logo.png" alt="logo" />
            </div>
          )}

          <Menu
            className={`${
              !isOpen
                ? "bg-[#84799b28] rounded-3xl w-10/12 self-center"
                : "bg-transparent"
            } max-sm:text-xl justify-items-center px-2`}
            mode="inline"
            selectable={false}
            onClick={handleMenuClick}
            style={{ borderStyle: "none" }}
            items={[
              {
                key: 1,
                icon: <FaPlus />,
                label: "Nueva Tarea",
                className: "text-sm drop-shadow-sm",
                style: {
                  color: "white",
                  margin: "24px 0",
                },
              },

              {
                key: 2,
                icon: <FaIdCard />,
                label: "Mis Datos",
                className: "text-sm drop-shadow-sm",
                style: {
                  color: "white",
                  margin: "24px 0",
                },
              },
              {
                key: 3,
                icon: <FaKey />,
                label: "Cerrar Sesión",
                className: "text-sm drop-shadow-sm",
                style: {
                  color: "white",
                  margin: "24px 0",
                },
              },
            ]}
          />
        </Sider>
        <Layout
          className={`${
            isOpen ? "ml-[80px]" : "ml-[230px]"
          } transition-all duration-300`}
        >
          <Header className="flex items-center w-screen pl-5 text-white bg-[#a5caf5]">
            <h1 className="text-xl sm:text-3xl font-[Nunito]">
              Hola, {user ? user.name : "usuario"}!
            </h1>
          </Header>
          <Content className="flex flex-grow justify-center pt-2 bg-gradient-to-b from-[#a5caf5] to-[#cebdf4]">
            <div className="w-full max-w-[calc(100%-2rem)] px-4 lg:px-0 py-4">
              <Row gutter={[16, 16]} justify="start">
                {tasks.map((task) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={task.id}>
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
                      className="w-full flex flex-col justify-between min-h-[210px] shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                      actions={[
                        <FaPencil
                          className="place-self-center mt-1 hover:text-[#d47da0] w-full"
                          key="edit"
                          onClick={() => handleEditModal(task)}
                        />,
                        <FaTrash
                          className="place-self-center mt-1 hover:text-[#d47da0] w-full"
                          key="delete"
                          onClick={() => handleDeleteTask(task.id)}
                        />,
                      ]}
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
                                onClick={() => toggleDescription(task.id)}
                              >
                                {expanded[task.id] ? "Ver menos" : "Ver más"}
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="px-4 text-gray-700 mb-5">
                          <p className="italic text-gray-500">
                            Sin descripción
                          </p>
                        </div>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Content>

          <Footer className="bg-[#bbacdf]"></Footer>
        </Layout>
      </Layout>
      <Spin
        spinning={loading}
        fullscreen
        indicator={
          <LoadingOutlined
            spin
            style={{
              fontSize: 80,
              color: "#FFD6FF",
            }}
          />
        }
      />

      <AntdModal
        title="Nueva Tarea"
        open={newTask}
        onCancel={closeModal}
        onOk={() => document.getElementById("btn-newtask-submit").click()}
        btnCancel={"Cancelar"}
        btnOk={"Crear"}
        children={
          <Form
            name="newTask"
            className="flex flex-col px-4 sm:px-16 pt-6 pb-6 rounded-xl bg-transparent"
            layout="vertical"
            autoComplete="off"
            onFinish={handleCreateTask}
          >
            <Form.Item
              name="title"
              label={
                <span className="text-white font-[Nunito] font-semibold select-none">
                  Nombre de la tarea
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el nombre de la tarea",
                },
              ]}
            >
              <Input
                placeholder="Nombre de la tarea"
                className="text-gray-500 p-1.5 pl-4"
              />
            </Form.Item>

            <Form.Item
              name="descr"
              label={
                <span className="text-white font-[Nunito] font-semibold select-none">
                  Descripción (opcional)
                </span>
              }
            >
              <TextArea
                placeholder="Descripción de la tarea"
                className="max-h-[80px] text-gray-500 p-1.5 pl-4"
              />
            </Form.Item>

            <Form.Item
              name="priority"
              initialValue={"media"}
              label={
                <span className="text-white font-[Nunito] font-semibold select-none">
                  Selecciona la prioridad
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Por favor selecciona una prioridad",
                },
              ]}
            >
              <Select
                placeholder="Selecciona la prioridad"
                className="text-gray-500"
                options={[
                  { value: "baja", label: <span>Baja</span> },
                  { value: "media", label: <span>Media</span> },
                  { value: "alta", label: <span>Alta</span> },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="exp"
              label={
                <span className="text-white font-[Nunito] font-semibold select-none">
                  Fecha de expiración (opcional)
                </span>
              }
            >
              <DatePicker
                className="w-full text-gray-500"
                placeholder="Selecciona una fecha"
                format="YYYY-MM-DD"
                minDate={dayjs(today, "YYYY-MM-DD")}
              />
            </Form.Item>
            <Button id="btn-newtask-submit" htmlType="submit" hidden />
          </Form>
        }
      />

      <AntdModal
        title="Editar Tarea"
        open={showEditModal}
        onCancel={closeModal}
        onOk={() => document.getElementById("btn-updatetask-submit").click()}
        btnCancel={"Cancelar"}
        btnOk={"Guardar cambios"}
        disabledOk={!isTaskMod}
        children={
          <Form
            form={form}
            name="editTask"
            className="flex flex-col px-4 sm:px-16 pt-6 pb-6 rounded-xl bg-transparent"
            layout="vertical"
            autoComplete="off"
            onChange={() => setIsTaskMod(true)}
            onFinish={() =>
              handleUpdateTask({ ...form.getFieldsValue(), id: taskValues.id })
            }
            initialValues={taskValues}
          >
            <Form.Item
              name="title"
              label={
                <span className="text-white font-[Nunito] font-semibold select-none">
                  Nombre de la tarea
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el nombre de la tarea",
                },
              ]}
            >
              <Input
                placeholder="Nombre de la tarea"
                className="text-gray-500 p-1.5 pl-4"
              />
            </Form.Item>

            <Form.Item
              name="descr"
              label={
                <span className="text-white font-[Nunito] font-semibold select-none">
                  Descripción (opcional)
                </span>
              }
            >
              <TextArea
                placeholder="Descripción de la tarea"
                className="max-h-[80px] text-gray-500 p-1.5 pl-4"
              />
            </Form.Item>

            <Form.Item
              name="priority"
              label={
                <span className="text-white font-[Nunito] font-semibold select-none">
                  Selecciona la prioridad
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Por favor selecciona una prioridad",
                },
              ]}
            >
              <Select
                placeholder="Selecciona la prioridad"
                className="text-gray-500"
                options={[
                  { value: "baja", label: <span>Baja</span> },
                  { value: "media", label: <span>Media</span> },
                  { value: "alta", label: <span>Alta</span> },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="expiresIn"
              label={
                <span className="text-white font-[Nunito] font-semibold select-none">
                  Fecha de expiración (opcional)
                </span>
              }
            >
              <DatePicker
                onChange={() => setIsTaskMod(true)}
                className="w-full text-gray-500"
                placeholder="Selecciona una fecha"
                format="YYYY-MM-DD"
                minDate={dayjs(today, "YYYY-MM-DD")}
              />
            </Form.Item>
            <Button id="btn-updatetask-submit" htmlType="submit" hidden />
          </Form>
        }
      />

      <AntdModal
        title="Mis Datos"
        open={myData}
        onCancel={isEditing ? handleEditToggle : closeModal}
        onOk={isEditing ? handleSaveProfile : handleEditToggle}
        btnCancel={isEditing ? "Cancelar" : "Cerrar"}
        btnOk={isEditing ? "Guardar" : "Editar"}
        children={
          <Form
            layout="vertical"
            className="flex flex-col px-4 sm:px-16 pt-6 pb-6 rounded-xl bg-transparent"
            autoComplete="off"
          >
            <Form.Item
              label={
                <span className="text-white font-[Nunito] font-semibold select-none">
                  Nombre
                </span>
              }
            >
              <Input
                id="name"
                placeholder="Nombre de usuario"
                disabled={!isEditing}
                className="text-gray-500 p-1.5 pl-4"
                defaultValue={user.name}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-white font-[Nunito] font-semibold select-none">
                  Email
                </span>
              }
              rules={[
                { required: true, message: "Este campo es requerido" },
                { type: "email", message: "No es un email válido" },
                { max: 100, message: "No puede sobrepasar los 100 caracteres" },
              ]}
            >
              <Input
                id="email"
                placeholder="Correo electrónico"
                disabled={!isEditing}
                className="text-gray-500 p-1.5 pl-4"
                defaultValue={user.email}
              />
            </Form.Item>
            <Button
              className="mt-4 rounded-full bg-[#bbacdf] text-white font-semibold"
              onClick={() => setShowPasswordModal(true)}
            >
              Cambiar contraseña
            </Button>
          </Form>
        }
      />

      <AntdModal
        title="Cambiar Contraseña"
        open={showPasswordModal}
        onCancel={() => setShowPasswordModal(false)}
        onOk={handlePasswordChange}
        btnCancel="Cancelar"
        btnOk="Guardar"
      >
        <Form
          layout="vertical"
          className="flex flex-col px-4 sm:px-16 pt-6 pb-6 rounded-xl bg-transparent"
          autoComplete="off"
        >
          <Form.Item
            label={
              <span className="text-white font-[Nunito] font-semibold select-none">
                Contraseña Actual
              </span>
            }
            rules={[
              { required: true, message: "Por favor ingresa tu contraseña actual" },
            ]}
          >
            <Input.Password
              id="current-password"
              placeholder="Introduce tu contraseña actual"
              className="text-gray-500 p-1.5 pl-4 pr-5"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-white font-[Nunito] font-semibold select-none">
                Contraseña Nueva
              </span>
            }
            rules={[
              { required: true, message: "Por favor ingresa una nueva contraseña" },
            ]}
          >
            <Input.Password
              id="new-password"
              placeholder="Introduce una nueva contraseña"
              className="text-gray-500 p-1.5 pl-4 pr-5"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-white font-[Nunito] font-semibold select-none">
                Confirmar Contraseña
              </span>
            }
          >
            <Input.Password
              id="confirm-password"
              placeholder="Confirma tu nueva contraseña"
              className="text-gray-500 p-1.5 pl-4 pr-5"
            />
          </Form.Item>
        </Form>
      </AntdModal>

      <AntdModal
        title="Cerrar sesión"
        open={logoutSure}
        onCancel={closeModal}
        onOk={handleLogout}
        btnCancel={"No"}
        btnOk={"Si"}
        children={
          <div className="text-center px-4 sm:px-16 pt-6 pb-6 rounded-xl bg-transparent">
            <p className="text-white font-semibold font-[Nunito] text-base">
              Estás seguro de querer cerrar sesión?
            </p>
          </div>
        }
      />
    </ConfigProvider>
  );
}
