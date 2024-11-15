import { useAuth } from "../context/Auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Spin } from "antd";
import { LoadingOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { FaArrowLeft, FaRegEnvelope } from "react-icons/fa6";
import Button from "../components/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Register() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState(0);

  const MySwal = withReactContent(Swal);

  const handleNext = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (name === "" || email === "") {
      return MySwal.fire({
        icon: "error",
        title: "Ups!",
        text: "Debes completar todos los campos",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e299b6",
      });
    }

    setSteps(steps + 1);
  };

  const handleSend = async (values) => {
    setLoading(true);
    const res = await signup(values);

    if (res.status == 200) {
      setLoading(false);
      return MySwal.fire({
        icon: "success",
        title: "Éxito!",
        text: "Su cuenta ha sido registrada con éxito",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e299b6",
      })
        .then(() => {
          MySwal.fire({
            icon: "info",
            title: "Espera!",
            text: "Te hemos enviado un correo de confirmación, por favor revisa tu bandeja de entrada!",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#e299b6",
          });
        })
        .then(() => {
          navigate("/login");
        });
    }
    console.log(res);

    setLoading(false);
    MySwal.fire({
      icon: "error",
      title: "Ups!",
      text: res.response.data.error,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#e299b6",
    });
  };

  return (
    <div
      className="h-screen flex justify-center items-center bg-[url('/background.png')] bg-cover bg-center bg-fixed overflow-hidden"
      onDragStart={(e) => e.preventDefault()}
    >
      <Form
        name="register"
        className="flex flex-col sm:max-w-[400px] lg:max-w-[500px] px-4 sm:px-20 pt-10 rounded-xl sm:bg-white/35"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSend}
      >
        <div className="self-center w-60 sm:w-72 mb-5">
          <Link to="/">
            <img src="/rosanix-logo.png" alt="logo-rosanix" />
          </Link>
        </div>
        <Form.Item
          name="name"
          label="Nombre"
          hidden={steps !== 0}
          validateFirst
          rules={[
            { required: true, message: "Este campo es requerido" },
            {
              pattern: new RegExp(/^[A-Za-z\s]+$/i),
              message: "Solo puede debe contener letras",
            },
            { min: 3, message: "Debe tener al menos 3 caracteres" },
            { max: 30, message: "No puede sobrepasar los 30 caracteres" },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            autoFocus
            placeholder="John Doe"
            id="name"
            className="rounded-2xl text-gray-500 p-2 w-full"
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          hidden={steps !== 0}
          validateFirst
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
        {steps === 0 && (
          <Form.Item className="flex justify-center w-full mt-5">
            <Button form noaction text="Siguiente" onclick={handleNext} />
          </Form.Item>
        )}

        <Form.Item
          name="passw"
          label="Contraseña"
          validateFirst
          hidden={steps !== 1}
          rules={[
            { required: true, message: "Este campo es requerido" },
            { min: 8, message: "Debe tener al menos 8 caracteres" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="thebestpassword123"
            id="passw"
            className="rounded-2xl text-gray-500 p-2 w-full"
          />
        </Form.Item>
        <Form.Item
          name="cpassw"
          label="Confirme su contraseña"
          hidden={steps !== 1}
          validateFirst
          dependencies={["passw"]}
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
            className="rounded-2xl text-gray-500 p-2 w-full"
          />
        </Form.Item>
        {steps === 1 && (
          <Form.Item className="flex justify-center mt-5">
            <Button form text="Registrarse" />
          </Form.Item>
        )}

        <Form.Item className="self-center hover:scale-105 duration-100">
          <Link
            to={`${steps === 0 ? "/login" : ""}`}
            className="flex items-center font-[Nunito]"
            onClick={steps === 1 ? () => setSteps(0) : null}
          >
            {steps === 1 && <FaArrowLeft className="mr-2" />}
            {steps === 1 ? "Volver" : "¿Ya tenés una cuenta?"}
          </Link>
        </Form.Item>
      </Form>

      <Spin
        spinning={loading}
        fullscreen
        indicator={
          <LoadingOutlined spin style={{ fontSize: 80, color: "#FFD6FF" }} />
        }
      />
    </div>
  );
}
