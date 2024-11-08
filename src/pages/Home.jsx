import { FaIdCard, FaKey, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { logoutRequest } from "../api/auth";
import { ConfigProvider, Layout, Menu } from "antd";
const { Header, Content, Footer, Sider } = Layout;

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  const handleMenuClick = async (e) => {
    if (e.key == 3) {
      await logoutRequest();
      window.location = "/";
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            triggerBg: "#84799b3e",
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
            <h1 className="text-xl sm:text-3xl font-[Nunito]">Welcome, user!</h1>
          </Header>
          <Content className="bg-gradient-to-b from-[#a5caf5] to-[#cebdf4]"></Content>
          <Footer className="bg-[#bbacdf]"></Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
