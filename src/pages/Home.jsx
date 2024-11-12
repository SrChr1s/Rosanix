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

  const { user, logout, updateInfo } = useAuth();
  const { tasks, getTasks, createTask } = useTasks();

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

  const handleSend = async (values) => {
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
      }).then((res) => closeModal());
    }
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
    }, 3000);
  };

  const closeModal = () => {
    setNewTask(false);
    setMyData(false);
    setLogoutSure(false);
  };

  useEffect(() => {
    setToday(
      `${dayjs().year()}-${(dayjs().month() + 1)
        .toString()
        .padStart(2, "0")}-${dayjs().date().toString().padStart(2, "0")}`
    );
  }, []);

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <ConfigProvider
      theme={{
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
        },
      }}
    >
      <Layout className="overflow-hidden">
        <Sider
          collapsible
          collapsed={isOpen}
          onCollapse={() => setIsOpen(!isOpen)}
          className="h-dvh bg-gradient-to-b from-[#a5caf5] to-[#cebdf4]"
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
        <Layout>
          <Header className="flex items-center w-dvw pl-5 text-white bg-[#a5caf5]">
            <h1 className="text-xl sm:text-3xl font-[Nunito]">
              Hola, {user ? user.name : "usuario"}!
            </h1>
          </Header>
          <Content className="flex flex-shrink justify-evenly pt-2 items-start bg-gradient-to-b from-[#a5caf5] to-[#cebdf4]">
            {tasks.map((task) => (
              <Card
                key={task.id}
                title={task.descr ? `${task.title}` : null}
                bordered={false}
                className="w-[300px] flex flex-col"
                actions={[
                  <p>{dayjs(task.createdAt).format("DD/MM/YYYY")}</p>,
                  <FaPencil className="place-self-center mt-1" key="edit" />,
                  <FaTrash className="place-self-center mt-1" key="delete" />,
                ]}
              >
                {task.descr ? (
                  <p className="mb-5">{task.descr}</p>
                ) : (
                  <p className="text-base font-semibold">{task.title}</p>
                )}
              </Card>
            ))}
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
            onFinish={handleSend}
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
            >
              <Input
                id="email"
                placeholder="Correo electrónico"
                disabled={!isEditing}
                className="text-gray-500 p-1.5 pl-4"
                defaultValue={user.email}
              />
            </Form.Item>
          </Form>
        }
      />

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
