// src/components/NavSidebar.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faHospital,
  faRightFromBracket,
  faUserNurse,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

/**
 * Props
 * - active: boolean
 * - onClose: () => void
 * - isLoggedIn: boolean
 * - user: { first_name, last_name, email, profile_image?[] }
 * - roles: string[] (e.g. ['Admin', 'Practice'])
 * - activePlan: { id?: string|number, expires_at?: string } | null
 * - filteredRoutes: Array<{ name: string, to: string, icon: any }>
 * - getMediaURL: (file, type) => string
 * - logoutDialog: () => void
 * - logoSrc?: string
 */
function NavSidebar({
  active = false,
  onClose = () => {},
  isLoggedIn = false,
  user = {},
  roles = [],
  activePlan = null,
  filteredRoutes = [],
  getMediaURL = () => "",
  logoutDialog = () => {},
  logoSrc = "/logo/logo_dentabase_white.png",
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showRegisterMenu, setShowRegisterMenu] = useState(false);

  useEffect(() => {
    if (active) {
      document.body.classList.add("nav-restrict");
    } else {
      document.body.classList.remove("nav-restrict");
      setShowRegisterMenu(false);
    }

    return () => {
      document.body.classList.remove("nav-restrict");
    };
  }, [active]);

  const close = () => {
    setShowRegisterMenu(false);
    onClose?.();
  };

  const checkRoute = (route) => {
    if (route) {
      close();
      navigate(route);
    } else {
      logoutDialog?.();
    }
  };

  const activeRouteClass = (path) =>
    path === location.pathname
      ? "brightness-100 bg-white bg-opacity-30"
      : "brightness-90 bg-white bg-opacity-0";

  return (
    <div>
      {/* Sidebar */}
      <div
        className={[
          "bg-primary-teal-dark fixed right-0 top-0 z-50 flex h-dvh w-full max-w-[330px]",
          "flex-col items-center justify-center shadow-lg",
          "transform transition-transform duration-300 ease-in-out",
          active ? "translate-x-0" : "translate-x-full pointer-events-none",
        ].join(" ")}
        aria-hidden={!active}
      >
        <div className="flex-none p-4 pt-12">
          <img
            src={logoSrc}
            alt="logo"
            className="w-full cursor-pointer"
            onClick={() => checkRoute("/")}
          />
        </div>

        {/* {isLoggedIn ? (
          <div className="w-full flex-1 overflow-y-auto px-4">
            <ul>
              {filteredRoutes.map((item) => (
                <li key={item.name} className="item-animate">
                  <button
                    type="button"
                    className={[
                      "flex w-full cursor-pointer items-center gap-2 rounded px-4 py-2 text-left",
                      "text-lg font-semibold text-white transition hover:bg-white/15",
                      activeRouteClass(item.to),
                    ].join(" ")}
                    onClick={() => checkRoute(item.to)}
                  >
                    <span className="flex min-w-6 justify-center">
                      <FontAwesomeIcon icon={item.icon} />
                    </span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-2 p-4">
            <div className="relative flex-1">
              <button
                type="button"
                className="bg-primary-teal-dark hover:bg-primary-teal w-full rounded-md border border-white px-4 py-2 text-sm font-semibold text-white transition"
                onClick={() => checkRoute("/login")}
              >
                Login
              </button>
            </div>

            <div className="relative flex flex-1 flex-col gap-2">
              <span className="flex items-center gap-2">
                <hr className="flex-1" />
                <p className="text-center text-xs text-white/80">or</p>
                <hr className="flex-1" />
              </span>

              <button
                type="button"
                className="hover:bg-primary-blue text-primary-blue w-full rounded-md border border-white bg-white px-4 py-2 text-center text-sm font-semibold transition hover:text-white"
                onClick={() => setShowRegisterMenu((v) => !v)}
              >
                Register
              </button>
            </div>
          </div>
        )} */}


        {/* {isLoggedIn && (
          <div className="bg-primary-teal/70 flex w-full flex-none items-center gap-2 border-t p-2 drop-shadow-lg">
            <button
              type="button"
              className="hover:bg-primary-white/15 flex w-full flex-1 items-center gap-2 rounded-full bg-transparent ring-white/30 ring-offset-0 transition hover:ring-1"
              onClick={() => checkRoute("/account")}
            >
              <img
                src={getMediaURL(user?.profile_image?.[0] ?? null, "user")}
                alt="profile"
                className="size-10 flex-none rounded-full border-2 border-white object-cover drop-shadow-lg"
              />
              <article className="grid w-full flex-1 pr-4">
                <div className="line-clamp-1 w-full break-all text-left font-semibold text-white">
                  {`${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim()}
                </div>
                <div className="line-clamp-1 w-full break-all text-left text-xs font-normal text-white/80">
                  {user?.email ?? ""}
                </div>
              </article>
            </button>

            <button
              type="button"
              className="text-primary-teal-dark flex aspect-square size-8 items-center justify-center rounded-full bg-white px-2 text-xl drop-shadow-md transition hover:scale-110 hover:bg-gray-100"
              onClick={logoutDialog}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </div>
        )} */}
      </div>

      {/* Overlay */}
      <div
        className={[
          "fixed inset-0 z-40 h-dvh w-full bg-black/50 transition-opacity duration-300",
          active ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={close}
      />

    </div>
  );
}

export default NavSidebar;
