import {
  FaIdCard,
  FaIndent,
  FaKey,
  FaOutdent,
  FaPlus,
  FaUser,
} from "react-icons/fa6";
import { useState } from "react";
import { logoutRequest } from "../api/auth";
import { useLocation } from "wouter";
import { Layout, Menu, Button } from "antd";
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
    <Layout className="overflow-hidden">
      <Sider
        trigger={null}
        collapsible
        collapsed={isOpen}
        className="h-dvh *:flex *:flex-col"
      >
        <img
          src="/logo-rosanix.png"
          alt="logo"
          className="w-16 mt-2 mb-10 self-center"
        />
        <Menu
          theme="dark"
          mode="inline"
          selectable={false}
          onClick={handleMenuClick}
          items={[
            {
              key: 1,
              icon: <FaPlus />,
              label: "Nueva Tarea",
            },
            {
              key: "sub1",
              icon: <FaUser />,
              label: "Mi Perfil",
              type: "submenu",
              children: [
                {
                  key: 2,
                  icon: <FaIdCard />,
                  label: "Mis Datos",
                },
                {
                  key: 3,
                  icon: <FaKey />,
                  label: "Cerrar Sesión",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="flex items-center w-dvw p-0">
          <Button
            type="text"
            icon={isOpen ? <FaIndent /> : <FaOutdent />}
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-white"
          />
        </Header>
        <Content></Content>
      </Layout>
    </Layout>
  );
}
