import { useAuth } from "../context/Auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Checkbox, Spin } from "antd";
import { LoadingOutlined, LockOutlined } from "@ant-design/icons";
import { FaRegEnvelope } from "react-icons/fa6";
import Button from "../components/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Login() {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const MySwal = withReactContent(Swal);

  const handleSend = async (values) => {
    setLoading(true);

    const res = await signin(values);

    if (res.status == 200) {
      setLoading(false);
      return MySwal.fire({
        icon: "success",
        title: "Éxito!",
        text: "Has iniciado sesión correctamente",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e299b6",
      }).then(() => {
        if (res.data.role === "admin") {
          return navigate("/dashboard");
        }
        navigate("/home");
      });
    }
    setLoading(false);
    MySwal.fire({
      icon: "error",
      title: "Ups!",
      text: res.response.data,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#e299b6",
    });
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
        initialValues={{
          remember: false,
        }}
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
          validateFirst
          rules={[
            { required: true, message: "Este campo es requerido" },
            { type: "email", message: "No es un email válido" },
            { max: 100, message: "No puede sobrepasar los 100 caracteres" },
          ]}
        >
          <Input
            prefix={<FaRegEnvelope />}
            autoFocus
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

        <div className="flex justify-between items-center">
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="select-none font-[Nunito] text-sm">
              Recuérdame
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <div className="hover:scale-105 duration-100">
              <Link to="/forgotpass" className="font-[Nunito] text-sm">
                Olvidé la contraseña
              </Link>
            </div>
          </Form.Item>
        </div>

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
