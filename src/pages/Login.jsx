import { useState } from "react";
import { Link } from "wouter";
import { loginRequest } from "../api/auth";
import { Form, Input, Checkbox, Spin } from "antd";
import { LoadingOutlined, LockOutlined } from "@ant-design/icons";
import { FaRegEnvelope } from "react-icons/fa6";
import Button from "../components/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleSend = async (values) => {
    setLoading(true);
    try {
      await loginRequest(values);

      setLoading(false);
      withReactContent(Swal)
        .fire({
          icon: "success",
          title: "Éxito!",
          text: "Has iniciado sesión correctamente",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#e299b6",
        })
        .then(() => {
          <Redirect to="/home" />;
        });
    } catch (error) {
      if (error.code == "ERR_NETWORK") {
        setLoading(false);
        return withReactContent(Swal).fire({
          icon: "error",
          title: "Ups!",
          text: "Algo no está funcionando en nuestros servidores, espera un poco antes de volver a intentar",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#e299b6",
        });
      }
      setLoading(false);
      withReactContent(Swal).fire({
        icon: "error",
        title: "Ups!",
        text: error.response.data,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e299b6",
      });
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center bg-[url('/background.png')] bg-cover bg-center bg-fixed select-none overflow-hidden"
      onDragStart={(e) => e.preventDefault()}
    >
      <Form
        name="login"
        className="flex flex-col sm:max-w-[400px] lg:max-w-[500px] px-4 sm:px-20 pt-10 rounded-xl sm:bg-white/35"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSend}
      >
        <div className="self-center w-60 sm:w-72 mb-5 ">
          <Link to="/">
            <img src="/rosanix-logo.png" alt="logo-rosanix" />
          </Link>
        </div>

        <Form.Item
          hasFeedback
          name="email"
          label="Email"
          validateTrigger="onBlur"
          rules={[
            { required: true, message: "Este campo es requerido" },
            { type: "email", message: "No es un email válido" },
            { max: 100, message: "No puede sobrepasar los 100 caracteres" },
          ]}
        >
          <Input
            prefix={<FaRegEnvelope />}
            placeholder="correo@email.com"
            className="rounded-2xl text-gray-500 p-2"
          />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="passw"
          label="Contraseña"
          validateFirst
          rules={[
            { required: true, message: "Este campo es requerido" },
            { min: 8, message: "Debe contener al menos 8 caracteres" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="thebestpassword123"
            className="rounded-2xl text-gray-500 p-2" 
          />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-between items-center">
            <Checkbox className="select-none font-[Nunito] text-sm">
              Recuérdame
            </Checkbox>
            <div className="hover:scale-105 duration-100">
              <Link to="/forgot-password" className="font-[Nunito] text-sm">
                Olvidé la contraseña
              </Link>
            </div>
          </div>
        </Form.Item>

        <Form.Item className="self-center">
          <Button form text="Entrar" />
        </Form.Item>

        <Form.Item className="self-center hover:scale-105 duration-100">
          <Link to="/register" className="font-[Nunito]">
            ¿Aún no tenés una cuenta?
          </Link>
        </Form.Item>
      </Form>

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
    </div>
  );
}
