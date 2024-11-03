import { Link } from "wouter";
import Button from "../components/Button";
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

export default function Landing() {
  return (
    <Layout className="h-dvh">
      <Header className="flex justify-between items-center min-h-20 bg-[#B8C0FF] font-[Roboto]">
        <div className="logo w-48 drop-shadow-lg">
          <img src="/main-logo.png" alt="logo" />
        </div>
        <div>
          <Link to="/login">
            <Button text={"Iniciar Sesión"} />
          </Link>
        </div>
      </Header>
      <Content className="flex justify-center py-10 bg-[#BBD0FF]">
        <div className="flex flex-col w-6/12 py-10 px-12 justify-center items-center rounded-3xl text-center bg-white/25">
          <h1 className="text-6xl font-[Bebas] mb-10">
            Toma el control de tu día, tarea a tarea
          </h1>
          <h2 className="text-lg">
            Rosanix es tu compañero en la gestión de tareas. Organiza, prioriza
            y completa tus pendientes de forma sencilla y segura. Con nuestra
            plataforma, tu productividad está siempre al alcance.
          </h2>
        </div>
      </Content>
      <Footer className="flex justify-center bg-[#B8C0FF] text-white drop-shadow-md">
        <div>
          <p>Caleidoscopio © 2024</p>
        </div>
      </Footer>
    </Layout>
  );
}
