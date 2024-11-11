import { FaIdCard, FaKey, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ConfigProvider,
  Layout,
  Menu,
  Spin,
  Modal,
  Button,
  Form,
  Input,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "../context/Auth";
const { Header, Content, Footer, Sider } = Layout;

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [myData, setMyData] = useState(false);
  const [logoutSure, setLogoutSure] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleMenuClick = async (e) => {
    setLoading(true);

    if (e.key == 1) {
      setMyData(true);
      setLoading(false);
    }

    if (e.key == 2) {
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
    setMyData(false);
    setLogoutSure(false);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#ffebf4",
            headerBg: "#ffebf4",
            footerBg: "#ffebf4",
          },
          Layout: {
            triggerBg: "#84799b3e",
          },
          Button: {
            colorPrimaryHover: "#d6547b",
          },
          Input: {
            colorBorder: "white",
            activeBorderColor: "#d6547b",
            hoverBorderColor: "#d6547b",
          },
          Select: {
            activeBorderColor: "#d6547b",
            hoverBorderColor: "#d6547b",
          },
          DatePicker: {
            activeBorderColor: "#d6547b",
            hoverBorderColor: "#d6547b",
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
                icon: <FaIdCard />,
                label: "Mis Datos",
                className: "text-sm drop-shadow-sm",
                style: {
                  color: "white",
                  margin: "24px 0",
                },
              },
              {
                key: 2,
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
          <Content className="bg-gradient-to-b from-[#a5caf5] to-[#cebdf4]"></Content>
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

      <Modal
        title={
          <div className="flex justify-center font-[Nunito] text-[#d67794] text-xl font-semibold mt-2">
            Mis datos
          </div>
        }
        centered
        open={myData}
        closable={false}
        className="border-4 border-[#d67794] rounded-xl"
        footer={
          <div className="flex justify-center space-x-4">
            <Button
              key="edit"
              onClick={handleEditToggle}
              className="rounded-full bg-white text-[#d67794] font-semibold border-2 border-[#d67794]"
            >
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
            {isEditing && (
              <Button
                key="save"
                type="primary"
                onClick={() => setIsEditing(false)}
                className="rounded-full text-white bg-[#d67794] font-semibold border-2 border-[#d67794] hover:bg-white"
              >
                Guardar
              </Button>
            )}
            {!isEditing && (
              <Button
                key="ok"
                type="primary"
                onClick={() => closeModal("myData")}
                className="rounded-full text-white bg-[#d67794] font-semibold border-2 border-[#d67794] hover:bg-white"
              >
                OK
              </Button>
            )}
          </div>
        }
        styles={{
          mask: { backdropFilter: "blur(10px)" },
        }}
      >
        <Form
          layout="vertical"
          className="flex flex-col px-4 sm:px-16 pt-6 pb-6 rounded-xl bg-[#d67794]/90"
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
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={
          <div className="flex justify-center font-[Nunito] text-[#d67794] text-xl font-semibold mt-2">
            Cerrar sesión
          </div>
        }
        centered
        open={logoutSure}
        closable={false}
        className="border-4 border-[#d67794] rounded-xl"
        styles={{ mask: { backdropFilter: "blur(10px)" } }}
        footer={[
          <div className="flex justify-center gap-3">
            <Button
              key="cancel"
              onClick={() => closeModal("logoutSure")}
              className="rounded-full bg-white text-[#d67794] font-semibold border-2 border-[#d67794]"
            >
              Cancelar
            </Button>
            <Button
              key="ok"
              type="primary"
              onClick={handleLogout}
              className="rounded-full text-white bg-[#d67794] font-semibold border-2 border-[#d67794] hover:bg-white"
            >
              Aceptar
            </Button>
          </div>,
        ]}
      >
        <div className="flex flex-col items-center px-4 sm:px-16 pt-6 pb-6 rounded-xl">
          <p className="text-[#d67794] font-semibold font-[Nunito] text-base">
            Estás seguro de querer cerrar sesión?
          </p>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
