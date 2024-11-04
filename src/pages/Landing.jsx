import { Link } from "wouter";
import Button from "../components/Button";
import { Layout } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
const { Header, Content, Footer } = Layout;

export default function Landing() {
  return (
    <Layout className="h-dvh">
      <Header className="flex justify-between items-center min-h-20 bg-[#B8C0FF] font-[Roboto]">
        <div className="logo w-48 drop-shadow-lg">
          <img src="/main-logo.png" alt="logo" />
        </div>
        <div>
        <Link to="/login" className="sm:hidden">
            <FontAwesomeIcon icon={faUser} className="text-white w-6 h-6 hover:text-gray-300" />
          </Link>
          <Link to="/login" className="hidden sm:block">
            <Button
              text={"Iniciar Sesión"}
              className="bg-white text-[#B8C0FF] hover:bg-gray-100 font-semibold py-2 px-4 rounded-md"
            />
          </Link>
        </div>
      </Header>
      <Content className="flex justify-center py-10 bg-[#BBD0FF]">
        <div className="flex flex-col w-11/12 sm:w-8/12 lg:w-6/12 py-10 px-12 justify-center items-center rounded-3xl text-center bg-white/25">
          <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-[Bebas] mt-10 mb-4 sm:mt-16 sm:mb-10">
            Toma el control de tu día, tarea a tarea
          </h1>
          <h2 className="text-sm sm:text-lg mb-10 sm:mb-16">
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
