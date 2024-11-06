import React from "react";

export default function NotFound() {
  return (
    <div className="bg-gradient-to-b from-[#93bff1] to-[#d6cef1] h-screen relative overflow-hidden flex flex-col items-center justify-center">
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
        <h1 className="text-5xl font-bold text-[#456297] mb-4 font-[Nunito]">Error  404</h1>
        <p className="text-2xl text-[#506181] mb-8 font-[Nunito]">Página no encontrada</p>
      </div>
    </div>
  );
}
