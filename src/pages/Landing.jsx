import { Link } from "wouter";
import Button from "../components/Button";
import { Layout } from "antd";
import { FaUser } from "react-icons/fa";
const { Header, Content, Footer } = Layout;

export default function Landing() {
  return (
    <Layout className="relative min-h-screen bg-[url('/background.png')] flex flex-col overflow-hidden">
      {/* Single animated pink star in various positions */}
      <img
        src="/star1.png"
        className="w-7 absolute bottom-[20vh] left-[8vw] animate-none sm:animate-bounce"
        alt="star"
      />
      <img
        src="/star1.png"
        className="w-8 absolute top-[15vh] right-[20vw] animate-none sm:animate-bounce"
        alt="star"
      />
      <img
        src="/star1.png"
        className="w-7 absolute bottom-[40vh] right-[5vw] animate-none sm:animate-bounce"
        alt="star"
      />

      {/* Main content */}
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

      <Content className="flex-grow flex justify-center items-center py-4 sm:py-6 px-4 overflow-y-auto">
        <div className="flex flex-col w-full max-w-xs sm:max-w-md lg:max-w-xl p-6 sm:p-10 md:p-12 bg-white/25 rounded-3xl text-center">
          <h1 className="text-[#456297] text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-[Bebas] mt-4 sm:mt-8 mb-4 break-words leading-snug">
            Toma el control de tu día, tarea a tarea
          </h1>
          <h2 className="font-[Nunito] text-[#506181] text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed break-words">
            Rosanix es tu compañero en la gestión de tareas. Organiza, prioriza y completa tus pendientes de forma sencilla y segura. Con nuestra plataforma, tu productividad está siempre al alcance.
          </h2>
        </div>
      </Content>

      <Footer className="flex justify-center bg-transparent font-[Nunito] text-[#8da0c2] drop-shadow-sm mt-4 py-4">
        <div>
          <p>Caleidoscopio © 2024</p>
        </div>
      </Footer>
    </Layout>
  );
}
