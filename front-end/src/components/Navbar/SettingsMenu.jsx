import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoadingToast } from "../Global/toasts";
import Icon from "../Global/Icon";
import { useDispatch } from "react-redux";
import { deletUser } from "../../Redux/Slices/userSlice";

const SettingsMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const settings = [
    { title: "Maladies", path: "/maladies", icon: "hospital" },
    { title: "Médicaments", path: "/medicaments", icon: "shield-tick" },
    { title: "Profile", path: "/profile", icon: "profile-circle" },
  ];
  const handleLogout = async () => {
    setLoading(true);
    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="text-fs-300">
      {loading && <LoadingToast />}
      <div
        className={`transition-[grid-template-rows_opacity] duration-500 pl-3 overflow-hidden grid`}
      >
        <ul className="min-h-0 space-y-3 text-secondaryColor">
          {settings.map((page) => (
            <Link
              className="flex items-center gap-3 relative"
              to={page.path}
              key={page.path}
            >
              <Icon icon={page.icon} className="stroke-secondaryColor" />
              <span className="grow">{page.title}</span>
              <div
                className={`h-10 bg-primaryColor rounded-[10px] 
                                ${
                                  (page.path === location ||
                                    (page.path != location &&
                                      location.includes(page.path))) &&
                                  "w-1"
                                }`}
              ></div>
            </Link>
          ))}
          <li
            className="flex items-center gap-3 cursor-pointer pt-8"
            onClick={() => !loading && handleLogout()}
          >
            <Icon icon="logout" className="stroke-secondaryColor" />
            <span
              onClick={async () => {
                localStorage.removeItem("auth_token");
                navigate("/login");
                dispatch(deletUser());
              }}
              className="grow"
            >
              Logout
            </span>
            <div className="h-10 bg-primaryColor rounded-[10px]"></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsMenu;
