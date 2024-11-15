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
  Card,
  Button,
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
  FaEnvelope,
  FaUserShield,
} from "react-icons/fa6";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AntdModal from "../components/AntdModal";
import { getUsersRequest, getTasksCountsRequest } from "../api/admin";
import { useAdmin } from "../context/Admin";
const { Header, Content, Footer, Sider } = Layout;

const usersCount = await getUsersRequest().then((res) => res.data);

const statsData = [
  {
    title: "Usuarios Activos",
    icon: "UserOutlined",
    color: "#1890ff",
    value: usersCount.filter((u) => u.active).length,
  },
  {
    title: "Usuarios Inactivos",
    icon: "UserOutlined",
    color: "red",
    value: usersCount.filter((u) => !u.active).length,
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
    value: usersCount.filter(
      (u) =>
        dayjs(u.createdAt).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY")
    ).length,
  },
];

const iconMap = {
  UserOutlined: <UserOutlined />,
  FileDoneOutlined: <FileDoneOutlined />,
  MessageOutlined: <MessageOutlined />,
  UserAddOutlined: <UserAddOutlined />,
};

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [home, setHome] = useState(true);
  const [seeUsers, setSeeUsers] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [myData, setMyData] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [logoutSure, setLogoutSure] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updateUsers, setUpdateUsers] = useState(true);

  const { user, logout } = useAuth();
  const { users, getAllUsers, createOneUser } = useAdmin();

  const MySwal = withReactContent(Swal);

  const navigate = useNavigate();

  const handleMenuClick = async (e) => {
    setLoading(true);

    if (e.key == 1) {
      setHome(true);
      setSeeUsers(false);
      setLoading(false);
    }

    if (e.key == 2) {
      setNewUser(true);
      setLoading(false);
    }

    if (e.key == 3) {
      setSeeUsers(true);
      setHome(false);
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
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = (values) => {
    handleEditToggle();
    closeModal();
    if (user.email !== values.email) {
      return MySwal.fire({
        icon: "info",
        title: "Espera!",
        text: "Revisa la bandeja de entrada del nuevo correo para validarlo y poder realizar el cambio",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e299b6",
      }).then(() => navigate(0));
    }
    updateInfo({
      name: values.name,
      email: values.email,
    });
    navigate(0);
  };

  const handlePasswordChange = async (values) => {
    setLoading(true);
    const res = await changePassw(values);
    if (res.status == 200) {
      setLoading(false);
      return MySwal.fire({
        icon: "success",
        title: "Éxito!",
        text: "Has cambiado tu contraseña con éxito!",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e299b6",
      }).then(() => closeModal());
    }
    setLoading(false);
    MySwal.fire({
      icon: "error",
      title: "Ups!",
      text: res.data,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#e299b6",
    }).then(() => closeModal());
  };

  const handleNewUser = async (user) => {
    closeModal();
    setLoading(true);
    const res = await createOneUser(user);
    if (res.status == 200) {
      setLoading(false);
      return MySwal.fire({
        icon: "success",
        title: "Éxito!",
        text: "Has creado un usuario con éxito!",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e299b6",
      }).then(() => setUpdateUsers(true));
    }
    setLoading(false);
    MySwal.fire({
      icon: "error",
      title: "Ups!",
      text: res.data,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#e299b6",
    });
  };

  const closeModal = () => {
    setNewUser(false);
    setMyData(false);
    setLogoutSure(false);
    setShowPasswordModal(false);
  };

  useEffect(() => {
    if (updateUsers) {
      getAllUsers();
      setUpdateUsers(false);
    }
  }, [updateUsers]);

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
                {home &&
                  statsData.map((stat, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                      <Card
                        className="duration-150 hover:scale-105"
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
                {seeUsers &&
                  users
                    .sort((a, b) => b.active - a.active)
                    .map((user) => (
                      <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
                        <Card
                          title={
                            <div className="flex items-center space-x-2">
                              <h2 className="text-lg font-semibold text-white">
                                {user.name}
                              </h2>
                            </div>
                          }
                          extra={
                            <span
                              className={`text-xs font-semibold rounded-full px-2 py-1 ${
                                user.active
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {user.active ? "Activo" : "Inactivo"}
                            </span>
                          }
                          bordered={false}
                          className="w-full flex flex-col justify-between shadow-lg rounded-lg overflow-hidden duration-150 hover:scale-105"
                        >
                          <div className="px-4 py-3 text-gray-700">
                            <div className="mb-2 flex items-center">
                              <span className="text-purple-500 mr-2">
                                <FaEnvelope />
                              </span>
                              <p className="text-sm sm:break-all">
                                {user.email}
                              </p>
                            </div>
                            <div className="mb-2 flex items-center">
                              <span className="text-pink-500 mr-2">
                                <FaUserShield />
                              </span>
                              <p className="text-sm">
                                {user.role === "admin"
                                  ? "Administrador"
                                  : "Usuario"}
                              </p>
                            </div>
                            <div className="text-xs text-gray-400 mt-2">
                              Registrado el{" "}
                              {dayjs(user.createdAt).format("DD/MM/YYYY")}
                            </div>
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
        onOk={() => document.getElementById("btn-new-user").click()}
        btnCancel={"Cancelar"}
        btnOk={"Crear"}
        children={
          <Form
            name="newUser"
            className="flex flex-col px-4 sm:px-16 pt-6 pb-6 rounded-xl bg-transparent"
            layout="vertical"
            autoComplete="off"
            onFinish={handleNewUser}
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
                id="name"
                placeholder="Nombre del usuario"
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
                id="email"
                placeholder="correo@email.com"
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
                id="passw"
                placeholder="thebestpassword123"
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
                id="role"
                placeholder="Selecciona el rol"
                className="text-gray-500"
                options={[
                  { value: "usuario", label: <span>Usuario</span> },
                  { value: "admin", label: <span>Administrador</span> },
                ]}
              />
            </Form.Item>
            <Button id="btn-new-user" htmlType="submit" hidden />
          </Form>
        }
      />

      <AntdModal
        title="Mis Datos"
        open={myData}
        onCancel={isEditing ? handleEditToggle : closeModal}
        onOk={() =>
          isEditing
            ? document.getElementById("btn-change-info").click()
            : handleEditToggle()
        }
        btnCancel={isEditing ? "Cancelar" : "Cerrar"}
        btnOk={isEditing ? "Guardar" : "Editar"}
        children={
          <Form
            layout="vertical"
            className="flex flex-col px-4 sm:px-16 pt-6 pb-6 rounded-xl bg-transparent"
            autoComplete="off"
            initialValues={user}
            onFinish={handleSaveProfile}
          >
            <Form.Item
              name="name"
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
                id="email"
                placeholder="Correo electrónico"
                disabled={!isEditing}
                className="text-gray-500 p-1.5 pl-4"
              />
            </Form.Item>
            <Button
              className="mt-4 rounded-full bg-[#bbacdf] text-white font-semibold"
              onClick={() => {
                closeModal();
                setShowPasswordModal(true);
              }}
              hidden={isEditing}
            >
              Cambiar contraseña
            </Button>
            <Button id="btn-change-info" htmlType="submit" hidden />
          </Form>
        }
      />

      <AntdModal
        title="Cambiar Contraseña"
        open={showPasswordModal}
        onCancel={closeModal}
        onOk={() => document.getElementById("btn-change-pass").click()}
        btnCancel="Cancelar"
        btnOk="Guardar"
      >
        <Form
          layout="vertical"
          className="flex flex-col px-4 sm:px-16 pt-6 pb-6 rounded-xl bg-transparent"
          autoComplete="off"
          onFinish={handlePasswordChange}
        >
          <Form.Item
            name="currentPassw"
            label={
              <span className="text-white font-[Nunito] font-semibold select-none">
                Contraseña Actual
              </span>
            }
            rules={[
              { required: true, message: "Este campo es requerido" },
              { min: 8, message: "Debe tener al menos 8 caracteres" },
            ]}
          >
            <Input.Password
              id="currentPassw"
              placeholder="Introduce tu contraseña actual"
              className="text-gray-500 p-1.5 pl-4 pr-5"
            />
          </Form.Item>

          <Form.Item
            name="newPassw"
            label={
              <span className="text-white font-[Nunito] font-semibold select-none">
                Nueva contraseña
              </span>
            }
            rules={[
              { required: true, message: "Este campo es requerido" },
              { min: 8, message: "Debe tener al menos 8 caracteres" },
            ]}
          >
            <Input.Password
              id="newPassw"
              placeholder="Introduce una nueva contraseña"
              className="text-gray-500 p-1.5 pl-4 pr-5"
            />
          </Form.Item>

          <Form.Item
            name="cNewPassw"
            label={
              <span className="text-white font-[Nunito] font-semibold select-none">
                Confirmar nueva contraseña
              </span>
            }
            validateFirst
            dependencies={["newPassw"]}
            rules={[
              { required: true, message: "Este campo es requerido" },
              { min: 8, message: "Debe tener al menos 8 caracteres" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassw") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Su contraseña no coincide"));
                },
              }),
            ]}
          >
            <Input.Password
              id="cNewPassw"
              placeholder="Confirma tu nueva contraseña"
              className="text-gray-500 p-1.5 pl-4 pr-5"
            />
          </Form.Item>
          <Button id="btn-change-pass" htmlType="submit" hidden />
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
