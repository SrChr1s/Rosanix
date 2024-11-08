import { FaIdCard, FaKey, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { logoutRequest } from "../api/auth";
import { useLocation } from "wouter";
import { ConfigProvider, Layout, Menu } from "antd";
const { Header, Content, Sider } = Layout;

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [location, setLocation] = useLocation();

  const handleMenuClick = async (e) => {
    if (e.key == 3) {
      await logoutRequest();
      setLocation("/");
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            triggerBg: "#c3c1f460",
          },
        },
      }}
    >
      <Layout className="overflow-hidden">
        <Sider
          collapsible
          collapsed={isOpen}
          onCollapse={() => setIsOpen(!isOpen)}
          className="h-dvh bg-[#a4caf5]"
          width={230}
        >
          <div
            className="logo w-14 mt-3 mb-10 drop-shadow-sm self-center"
            hidden={!isOpen}
          >
            <img src="/logo-rosanix.png" alt="logo" />
          </div>

          <div
            className="logo w-48 mt-2 mb-10 drop-shadow-sm self-center"
            hidden={isOpen}
          >
            <img src="/main-logo.png" alt="logo" />
          </div>
          <Menu
            className={`bg-[#c3c1f460] ${
              !isOpen ? "rounded-3xl w-10/12 self-center" : ""
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
                style: {
                  color: "white",
                  margin: "24px 0",
                },
              },

              {
                key: 2,
                icon: <FaIdCard />,
                label: "Mis Datos",
                style: {
                  color: "white",
                  margin: "24px 0",
                },
              },
              {
                key: 3,
                icon: <FaKey />,
                label: "Cerrar Sesión",
                style: {
                  color: "white",
                  margin: "24px 0",
                },
              },
            ]}
          />
        </Sider>
        <Header className="flex items-center w-dvw pl-5 text-white bg-[#a4caf5]">
          <h1 className="text-3xl">Welcome, user!</h1>
        </Header>
        <Content></Content>
      </Layout>
    </ConfigProvider>
  );
}
