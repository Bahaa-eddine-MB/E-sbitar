import SettingsMenu from "./SettingsMenu";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ children }) => {
  const navigate = useNavigate()
  return (
    <section className="flex bg-white w-[100%]">
      <nav className="bg-bgColor py-10 pl-7 w-[17.5rem] shrink-0 min-h-screen">
        <div onClick={()=>{
            navigate("/")
        }} className="flex gap-4 items-center mb-11 hover:cursor-pointer transition-all hover:scale-105 duration-700">
          <img src={logo} alt="e-sbitar" />
          <h1 className="text-fs-500 font-extrabold text-secondaryColor mt-2">
            E-Sbirat
          </h1>
        </div>
        <SettingsMenu title="settings" />
      </nav>
      {children}
    </section>
  );
};

export default Navbar;
