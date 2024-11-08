import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "wouter";

const SideBar = ({ menus = [], open, setOpen }) => {
  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#d884a6] sm:min-h-[90vh] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-white px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className="flex justify-center py-4">
          <img
            src={open ? "/main-logo.png" : "/logo-rosanix.png"}
            alt="logo"
            className="transition-all duration-500"
            style={{
              width: open ? "190px" : "35px", 
              height: open ? "auto" : "26px", 
            }}
          />
        </div>

        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.length > 0 ? (
            menus.map((menu, i) => (
              <Link href={menu.link} key={i}>
                <a
                  className={`${
                    menu.margin && "mt-5"
                  } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-[#b16080] rounded-md`}
                >
                  <div>{React.createElement(menu.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-[#d884a6] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                  >
                    {menu.name}
                  </h2>
                </a>
              </Link>
            ))
          ) : (
            <p>No hay menús disponibles.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SideBar;
