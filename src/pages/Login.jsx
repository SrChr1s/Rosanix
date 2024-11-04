import { useState } from "react";
import { Link } from "wouter";
import { loginRequest } from "../api/auth";
import { Form, Input, Checkbox, Spin } from "antd";
import { LoadingOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import Button from "../components/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleSend = async (values) => {
    setLoading(true);
    console.log(values);
    try {
      await loginRequest(values);
    } catch ({ response }) {
      withReactContent(Swal).fire({
        icon: "error",
        text: response.data,
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
    }
  };

  return (
    <div className="h-dvh flex justify-center items-center">
      <Form
        name="login"
        className="flex flex-col px-20 pt-10 w-[500px] rounded-xl bg-[#B8C0FF]"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSend}
      >
        <div className="self-center w-24 mb-5">
          <Link to="/">
            <img src="/kitty2.png" alt="img-kitty" />
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
          <Input prefix={<UserOutlined />} placeholder="correo@email.com" />
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
          />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-between items-center">
            <Checkbox className="select-none">Recuérdame</Checkbox>
            <div className="hover:scale-105 duration-100">
              <Link to="/forgot-password">Olvidé la contraseña</Link>
            </div>
          </div>
        </Form.Item>

        <Form.Item className="self-center">
          <Button form text="Entrar" />
        </Form.Item>

        <Form.Item className="self-center hover:scale-105 duration-100">
          <Link to="/register">Aún no tenés una cuenta?</Link>
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
