import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Row,
  Col,
  Statistic,
} from "antd";
import {
  LoadingOutlined,
  UserOutlined,
  FileDoneOutlined,
  MessageOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  FaIdCard,
  FaKey,
  FaHouse,
  FaUserPlus,
  FaUserGroup,
} from "react-icons/fa6";
import AntdModal from "../components/AntdModal";
import { getUsersCountsRequest, getTasksCountsRequest } from "../api/admin";
const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

const statsData = [
  {
    title: "Usuarios Activos",
    icon: "UserOutlined",
    color: "#1890ff",
    value: await getUsersCountsRequest().then(
      (res) => res.data.filter((u) => u.active).length
    ),
  },
  {
    title: "Usuarios Inactivos",
    icon: "UserOutlined",
    color: "red",
    value: await getUsersCountsRequest().then(
      (res) => res.data.filter((u) => !u.active).length
    ),
  },
  {
    title: "Tareas Almacenadas",
    icon: "FileDoneOutlined",
    color: "#52c41a",
    value: await getTasksCountsRequest().then((res) => res.data.length),
  },
  {
    title: "Nuevos Usuarios Hoy",
    icon: "UserAddOutlined",
    color: "#eb2f96",
    value: await getUsersCountsRequest().then(
      (res) =>
        res.data.filter(
          (u) =>
            dayjs(u.createdAt).format("DD/MM/YYYY") ===
            dayjs().format("DD/MM/YYYY")
        ).length
    ),
  },
];

const iconMap = {
  UserOutlined: <UserOutlined />,
  FileDoneOutlined: <FileDoneOutlined />,
  MessageOutlined: <MessageOutlined />,
  UserAddOutlined: <UserAddOutlined />,
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [home, setHome] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [users, setUsers] = useState(false);
  const [myData, setMyData] = useState(false);
  const [logoutSure, setLogoutSure] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [today, setToday] = useState("");

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleMenuClick = async (e) => {
    setLoading(true);

    if (e.key == 1) {
      setHome(true);
      setLoading(false);
    }

    if (e.key == 2) {
      setNewUser(true);
      setLoading(false);
    }

    if (e.key == 3) {
      setUsers(true);
      setLoading(false);
    }

    if (e.key == 4) {
      setMyData(true);
      setLoading(false);
    }

    if (e.key == 5) {
      setLogoutSure(true);
      setLoading(false);
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

  const closeModal = () => {
    setNewUser(false);
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
      <Layout className="overflow-hidden min-h-screen bg-gradient-to-b from-[#a5caf5] to-[#cebdf4]">
        <Sider
          collapsible
          collapsed={isOpen}
          onCollapse={() => setIsOpen(!isOpen)}
          className="fixed min-h-screen inset-0 overflow-auto top-0 bottom-0 bg-gradient-to-b from-[#a5caf5] to-[#cebdf4]"
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
                icon: <FaHouse />,
                label: "Inicio",
                className: "text-sm drop-shadow-sm",
                style: {
                  color: "white",
                  margin: "24px 0",
                },
              },
              {
                key: 2,
                icon: <FaUserPlus />,
                label: "Nuevo Usuario",
                className: "text-sm drop-shadow-sm",
                style: {
                  color: "white",
                  margin: "24px 0",
                },
              },
              {
                key: 3,
                icon: <FaUserGroup />,
                label: "Ver Usuarios",
                className: "text-sm drop-shadow-sm",
                style: {
                  color: "white",
                  margin: "24px 0",
                },
              },
              {
                key: 4,
                icon: <FaIdCard />,
                label: "Mis Datos",
                className: "text-sm drop-shadow-sm",
                style: {
                  color: "white",
                  margin: "24px 0",
                },
              },
              {
                key: 5,
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
                {statsData.map((stat, index) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={index}>
                    <Card
                      className="duration-150 hover:scale-105 hover:cursor-pointer"
                      bordered={false}
                      style={{ minHeight: "150px" }}
                    >
                      <div className="flex flex-col items-center justify-center text-center h-full">
                        <div
                          style={{
                            fontSize: "36px",
                            color: stat.color,
                            marginBottom: "10px",
                          }}
                        >
                          {iconMap[stat.icon]}
                        </div>
                        <Statistic title={stat.title} value={stat.value} />
                      </div>
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
        title="Nuevo usuario"
        open={newUser}
        onCancel={closeModal}
        btnCancel={"Cancelar"}
        btnOk={"Crear"}
        children={
          <Form
            name="newTask"
            className="flex flex-col px-4 sm:px-16 pt-6 pb-6 rounded-xl bg-transparent"
            layout="vertical"
            autoComplete="off"
            onFinish={
              {
                /* funcion */
              }
            }
          >
            <Form.Item
              name="name"
              label={
                <span className="text-white font-[Nunito] font-semibold select-none">
                  Nombre
                </span>
              }
              rules={[
                { required: true, message: "Este campo es requerido" },
                { min: 3, message: "Debe tener al menos 3 caracteres" },
                { max: 25, message: "No puede sobrepasar los 25 caracteres" },
              ]}
            >
              <Input
                placeholder="Nombre del usuario"
                id="name"
                className="text-gray-500 p-1.5 pl-4"
              />
            </Form.Item>

            <Form.Item
              name="email"
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
                placeholder="correo@email.com"
                id="email"
                className="text-gray-500 p-1.5 pl-4"
              />
            </Form.Item>

            <Form.Item
              name="passw"
              label={
                <span className="text-white font-[Nunito] font-semibold select-none">
                  Contraseña
                </span>
              }
              rules={[
                { required: true, message: "Este campo es requerido" },
                { min: 8, message: "Debe tener al menos 8 caracteres" },
              ]}
            >
              <Input.Password
                placeholder="thebestpassword123"
                id="passw"
                className="text-gray-500 p-1.5 pl-4 pr-2"
              />
            </Form.Item>

            <Form.Item
              name="role"
              label={
                <span className="text-white font-[Nunito] font-semibold select-none">
                  Seleccione el rol
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Por favor selecciona un rol",
                },
              ]}
            >
              <Select
                placeholder="Selecciona el rol"
                className="text-gray-500"
                options={[
                  { value: "usuario", label: <span>Usuario</span> },
                  { value: "admin", label: <span>Administrador</span> },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="active"
              label={
                <span className="text-white font-[Nunito] font-semibold select-none">
                  Activo
                </span>
              }
              rules={[
                {
                  required: true,
                  message:
                    "Por favor selecciona si la cuenta está activa o no.",
                },
              ]}
            >
              <Select
                placeholder="Activo"
                className="text-gray-500"
                options={[
                  { value: "1", label: <span>Sí</span> },
                  { value: "0", label: <span>No</span> },
                ]}
              />
            </Form.Item>
          </Form>
        }
      />

      <AntdModal
        title="Mis Datos"
        open={myData}
        onCancel={isEditing ? handleEditToggle : closeModal}
        onOk={isEditing ? null : handleEditToggle} // AGREGAR FUNCION GUARDAR DATOS
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
                placeholder="Nombre de usuario"
                disabled={!isEditing}
                className="text-gray-500 p-1.5 pl-4"
                value={user.name}
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
                placeholder="Correo electrónico"
                disabled={!isEditing}
                className="text-gray-500 p-1.5 pl-4"
                value={user.email}
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
