import { useAuth } from "../context/Auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Spin } from "antd";
import { LoadingOutlined, LockOutlined } from "@ant-design/icons";
import { FaArrowLeft, FaRegEnvelope } from "react-icons/fa6";
import Button from "../components/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ForgotPass() {
  const { forgotPassw, testCode, resetPassw } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const MySwal = withReactContent(Swal);

  const handleSend = async (values) => {
    setLoading(true);

    const res = await forgotPassw(values);

    if (res.status == 204) {
      setLoading(false);
      return MySwal.fire({
        icon: "success",
        title: "Éxito!",
        text: "Te hemos enviado el codigo a tu bandeja de entrada!",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e299b6",
      }).then(() => {
        setStep(1);
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

  const handleCod = async (values) => {
    setLoading(true);

    const res = await testCode(values);

    if (res.status == 204) {
      setLoading(false);
      return setStep(2);
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

  const handleResetPass = async (values) => {
    setLoading(true);

    const res = await resetPassw(values);

    if (res.status == 204) {
      setLoading(false);
      return MySwal.fire({
        icon: "success",
        title: "Éxito!",
        text: "Has reestablecido tu contraseña con éxito!",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e299b6",
      }).then(() => {
        navigate("/login");
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

  useEffect(() => {
    MySwal.fire({
      icon: "info",
      title: "Hey!",
      text: "Te enviaremos un código a tu correo que utilizarás para definir una nueva contraseña",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#e299b6",
    });
  }, []);

  return (
    <div
      className="h-screen flex justify-center items-center bg-[url('/background.png')] bg-cover bg-center bg-fixed select-none overflow-hidden"
      onDragStart={(e) => e.preventDefault()}
    >
      <Form
        name="forgot"
        className="flex flex-col sm:max-w-[400px] lg:max-w-[500px] px-4 sm:px-20 pt-10 rounded-xl sm:bg-white/35"
        layout="vertical"
        autoComplete="off"
        onFinish={
          step == 0
            ? handleSend
            : step == 1
            ? handleCod
            : step === 2
            ? handleResetPass
            : null
        }
      >
        <div className="self-center w-60 sm:w-72 mb-5 ">
          <Link to="/">
            <img src="/rosanix-logo.png" alt="logo-rosanix" />
          </Link>
        </div>

        <Form.Item
          hidden={step !== 0}
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

        {step === 1 && (
          <Form.Item
            name="code"
            label="Código"
            validateFirst
            rules={[
              { required: true, message: "Este campo es requerido" },
              {
                pattern: new RegExp(/^[0-9]+$/i),
                message: "Debe contener sólo números",
              },
            ]}
          >
            <Input.OTP length={6} />
          </Form.Item>
        )}

        {step === 2 && (
          <Form.Item
            name="newPassw"
            label={
              <span className="text-white font-[Nunito] font-semibold select-none">
                Nueva contraseña
              </span>
            }
            rules={[
              { required: true, message: "Este campo es requerido" },
              { min: 8, message: "Debe tener al menos 8 caracteres" },
            ]}
          >
            <Input.Password
              id="newPassw"
              placeholder="Introduce una nueva contraseña"
              className="text-gray-500 p-1.5 pl-4 pr-5"
            />
          </Form.Item>
        )}

        {step === 2 && (
          <Form.Item
            name="cNewPassw"
            label={
              <span className="text-white font-[Nunito] font-semibold select-none">
                Confirmar nueva contraseña
              </span>
            }
            validateFirst
            dependencies={["newPassw"]}
            rules={[
              { required: true, message: "Este campo es requerido" },
              { min: 8, message: "Debe tener al menos 8 caracteres" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassw") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Su contraseña no coincide"));
                },
              }),
            ]}
          >
            <Input.Password
              id="cNewPassw"
              placeholder="Confirma tu nueva contraseña"
              className="text-gray-500 p-1.5 pl-4 pr-5"
            />
          </Form.Item>
        )}

        <Form.Item className="self-center">
          <Button
            form
            text={
              step == 0
                ? "Enviar Código"
                : step === 1
                ? "Siguiente"
                : step === 2
                ? "Reestablecer"
                : null
            }
          />
        </Form.Item>

        <Form.Item className="self-center hover:scale-105 duration-100">
          <Link to="/login" className="flex items-center font-[Nunito]">
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
