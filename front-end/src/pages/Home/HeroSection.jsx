import logo from "../../assets/Landing page/white logo.svg";
import hero from "../../assets/Landing page/hero.png";
import icon1 from "../../assets/Landing page/receive-square.svg";
import icon2 from "../../assets/Landing page/audio.svg";
import icon3 from "../../assets/Landing page/book.svg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate= useNavigate()
  return (
    <section className={`bg-hero-pattern bg-no-repeat bg-cover `}>
      <nav className="flex justify-between mx-32 pt-2 transition-all ">
        <div className="flex gap-2 items-center">
          <img src={logo} alt="e-Sbitar" className="h-14" />
          <p className="text-white font-medium text-fs-600 ">e-Sbitar</p>
        </div>
        <div className="grid grid-flow-col gap-8 text-white pt-5 justify-center self-center">
          <div onClick={()=>{
            navigate("login")
          }} className="py-2 hover:font-medium hover:scale-105 duration-1000 hover:cursor-pointer">Se connecter</div>
          <div onClick={()=>{
            navigate("register")
          }}  className=" border-white rounded-full px-3 py-2 border-2 hover:font-medium hover:scale-105 duration-1000 hover:cursor-pointer">
            Commencez Maintenant
          </div>
        </div>
      </nav>
      <main className="flex justify-between mx-40 pt-[15rem]">
        <div className="text-white text-fs-800 w-[30rem]">
          e-Sbitar, votre plateforme de santé en ligne. Explorez et découvrez !
          <div
            className="bg-white
            relative
            border-2 border-primaryColor 
                   items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline mt-16 rounded-full flex"
          >
            <input
              className="disabled:text-thirdColor py-4 placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor text-thirdColor text-fs-400 ml-4"
              type="text"
              placeholder="Votre address adresse"
            />
            <button className="absolute text-fs-400 bg-primaryColor px-4 py-4 rounded-full  -right-1">
              Contactez-nous
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <ul className="flex gap-16">
            <li className="text-center text-white flex flex-col  items-center ">
              <div className="flex justify-center items-center bg-white  w-32 h-32 rounded-[50px] rotate-45">
                <div className="relative w-24 h-24 rounded-full bg-blue-300  -rotate-45 ">
                  <img
                    src={icon1}
                    className=" absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16  self-center"
                    alt="Image"
                  />
                </div>
              </div>
              <p className="pt-4 text-fs-500 w-36 self-center ">
                Rester à jour !
              </p>
            </li>
            <li className="text-center text-white flex flex-col  items-center ">
              <div className="flex justify-center items-center bg-white  w-32 h-32 rounded-[50px] rotate-45">
                <div className="relative w-24 h-24 rounded-full bg-blue-500  -rotate-45 ">
                  <img
                    src={icon2}
                    className=" absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16  self-center"
                    alt="Image"
                  />
                </div>
              </div>
              <p className="pt-4 text-fs-500 w-36 self-center">
                Parcourir les maladies communes
              </p>
            </li>
            <li className="text-center text-white flex flex-col  items-center ">
              <div className="flex justify-center items-center bg-white  w-32 h-32 rounded-[50px] rotate-45">
                <div className="relative w-24 h-24 rounded-full bg-primaryColor  -rotate-45 ">
                  <img
                    src={icon3}
                    className=" absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16  self-center"
                    alt="Image"
                  />
                </div>
              </div>
              <p className="pt-4 text-fs-500 w-36 self-center">
                Trouvez les meilleurs médicaments
              </p>
            </li>
          </ul>
          <img src={hero} alt="e-sbitar" />
        </div>
      </main>
    </section>
  );
};

export default HeroSection;
