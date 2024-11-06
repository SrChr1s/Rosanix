import { Link } from "wouter";
import Button from "../components/Button";
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

export default function Landing() {
  return (
    <Layout
      className="relative min-h-screen bg-gradient-to-br from-[#a4caf5] to-[#c3c1f4] sm:bg-[url('/background.png')] flex flex-col overflow-hidden"
      onDragStart={(e) => e.preventDefault()}
    >
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
      <Header className="flex justify-between items-center px-4 sm:px-8 lg:px-12 min-h-20 bg-transparent font-[Roboto] select-none">
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
          <Link to="/login">
            <Button
              text={"Iniciar sesión"}
              className="font-semibold py-2 px-4 rounded-md"
            />
          </Link>
        </div>
      </Header>

      <Content className="flex-grow flex justify-center items-center py-4 sm:py-6 px-4 overflow-y-auto select-none">
        <div className="flex flex-col w-full max-w-xs sm:max-w-md lg:max-w-xl p-6 sm:p-10 md:p-12 bg-white/25 rounded-3xl text-center">
          <h1 className="text-[#456297] text-5xl sm:text-6xl md:text-7xl font-[Bebas] mt-4 sm:mt-8 mb-4 break-words leading-snug">
            Toma el control de tu día, tarea a tarea
          </h1>
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
