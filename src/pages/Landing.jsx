import { Link } from "wouter";
import Button from "../components/Button";
import { Layout } from "antd";
import { FaUser } from "react-icons/fa";
const { Header, Content, Footer } = Layout;

export default function Landing() {
  return (
    <Layout className="h-dvh bg-gradient-to-br from-[#9fcbf5] to-[#d3bbf3]">
      <Header className="flex justify-between items-center px-4 sm:px-8 lg:px-12 min-h-20 bg-transparent font-[Roboto]">
        <div className="logo w-16 drop-shadow-sm sm:hidden">
          <Link to="/">
            <img src="/logo-rosanix.png" alt="logo" />
          </Link>
        </div>
        <div className="logo w-60 drop-shadow-sm hidden sm:block">
          <Link to="/">
            <img src="/main-logo.png" alt="logo" />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="sm:hidden">
            <FaUser className="text-white w-6 h-6 hover:text-gray-300" />
          </Link>
          <Link to="/login" className="hidden sm:block">
            <Button
              text={"Iniciar sesión"}
              className="font-semibold py-2 px-4 rounded-md"
            />
          </Link>
        </div>
      </Header>
      <Content className="flex justify-center py-10 ">
        <div className="flex flex-col w-11/12 sm:w-8/12 lg:w-6/12 py-10 px-12 justify-center items-center rounded-3xl text-center bg-white/25">
          <h1 className="text-[#456297] text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-[Bebas] mt-10 mb-4 sm:mt-16 sm:mb-10">
            Toma el control de tu día, tarea a tarea
          </h1>
          <h2 className="font-[Nunito] text-[#506181] text-sm sm:text-lg mb-10 sm:mb-16">
            Rosanix es tu compañero en la gestión de tareas. Organiza, prioriza
            y completa tus pendientes de forma sencilla y segura. Con nuestra
            plataforma, tu productividad está siempre al alcance.
          </h2>
        </div>
      </Content>
      <Footer className="flex justify-center bg-transparent font-[Nunito] text-[#8da0c2] drop-shadow-sm">
        <div>
          <p className="Nunito">Caleidoscopio © 2024</p>
        </div>
      </Footer>
    </Layout>
  );
}
