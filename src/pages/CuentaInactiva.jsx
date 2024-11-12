import React from "react";

export default function CuentaInactiva() {
  return (
    <div className="bg-gradient-to-b from-[#698eb8] to-[#d6cef1] h-screen relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute bottom-0 left-0 h-[360px] w-[900px] sm:w-full sm:h-auto overflow-hidden flex">
        <img
          src="/Nube1.png"
          alt="cloud"
          className="w-full opacity-100 animate-cloudMove"
        />
        <img
          src="/Nube1.png"
          alt="cloud"
          className="w-full opacity-100 animate-cloudMove"
        />
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold text-[#456297] mb-4 font-[Nunito]">
          Error 403
        </h1>
        <p className="text-2xl max-w-sm text-[#506181] mb-8 font-[Nunito]">
          Parece que tu cuenta está inactiva, revisa la bandeja de entrada de tu
          correo!
        </p>
      </div>
    </div>
  );
}
