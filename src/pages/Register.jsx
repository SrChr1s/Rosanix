import { useState } from "react";
import { Link, Redirect } from "wouter";
import { registerRequest } from "../api/auth";
import { Form, Input, Spin } from "antd";
import { LoadingOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { FaArrowLeft, FaRegEnvelope } from "react-icons/fa6";
import Button from "../components/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState(0);

  const handleNext = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (name == "" || email == "") {
      return withReactContent(Swal).fire({
        icon: "error",
        title: "Ups!",
        text: "Debes completar todos los campos",
        confirmButtonText: "Aceptar",
      });
    }

    setSteps(steps + 1);
  };

  const handleSend = async (values) => {
    setLoading(true);
    try {
      await registerRequest(values);

      setLoading(false);
      withReactContent(Swal)
        .fire({
          icon: "success",
          title: "Éxito!",
          text: "Su cuenta ha sido registrada con éxito",
          confirmButtonText: "Aceptar",
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
        });
      }
      setLoading(false);
      withReactContent(Swal).fire({
        icon: "error",
        title: "Ups!",
        text: error.response.data,
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="h-dvh flex justify-center items-center  bg-gradient-to-br from-[#9fcbf5] to-[#d3bbf3]">
      <Form
        name="register"
        className="flex flex-col sm:max-w-[400px] lg:max-w-[500px] px-4 sm:px-20 pt-10 rounded-xl sm:bg-white/35"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSend}
      >
        <div className="self-center w-72 mb-5">
          <Link to="/">
            <img src="/rosanix-logo.png" alt="logo-rosanix" />
          </Link>
        </div>

        <div className={`${steps == 0 ? "" : "hidden"}`}>
          <Form.Item
            hasFeedback
            name="name"
            label="Nombre"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: "Este campo es requerido" },
              { min: 3, message: "Debe tener al menos 3 caracteres" },
              { max: 25, message: "No puede sobrepasar los 25 caracteres" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="John Doe"
              id="name"
              className="rounded-2xl text-gray-500 p-2"
            />
          </Form.Item>
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
              id="email"
              className="rounded-2xl text-gray-500 p-2"
            />
          </Form.Item>
          <Form.Item className="self-center mt-5">
            <Button form noaction text="Siguiente" onclick={handleNext} />
          </Form.Item>
        </div>

        <div className={`${steps == 1 ? "" : "hidden"}`}>
          <Form.Item
            hasFeedback
            name="passw"
            label="Contraseña"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: "Este campo es requerido" },
              { min: 8, message: "Debe tener al menos 8 caracteres" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="thebestpassword123"
              id="passw"
              className="rounded-2xl text-gray-500 p-2"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="cpassw"
            label="Confirme su contraseña"
            dependencies={["passw"]}
            validateTrigger="onBlur"
            rules={[
              { required: true, message: "Este campo es requerido" },
              { min: 8, message: "Debe tener al menos 8 caracteres" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("passw") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Su contraseña no coincide"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="thebestpassword123"
              id="cpassw"
              className="rounded-2xl text-gray-500 p-2"
            />
          </Form.Item>
          <Form.Item className="self-center mt-5">
            <Button form text="Registrarse" />
          </Form.Item>
        </div>

        <Form.Item className="self-center hover:scale-105 duration-100">
          <Link
            to={`${steps == 0 ? "/login" : ""}`}
            className="flex items-center font-[Nunito]"
            onClick={steps == 1 ? () => setSteps(0) : null}
          >
            <FaArrowLeft className="mr-2" />
            Volver
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
