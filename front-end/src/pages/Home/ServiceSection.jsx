import icon1 from "../../assets/Landing page/people.svg";
import icon2 from "../../assets/Landing page/glass.svg";
import icon3 from "../../assets/Landing page/award.svg";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

const SrviceSection = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="pt-12 pb-8">
      <ul className="flex gap-12 justify-center">
        <li className="flex flex-col justify-items-center items-center">
          <div className="bg-blue-300 rounded-full">
            <img className="p-6 h-28 w-28" src={icon1} alt="e-sbitar" />
          </div>
          <p ref={ref} className="pt-2">
            {inView && <CountUp end={1000} duration={2} />}
          </p>
          <p>Patients</p>
        </li>
        <li className="flex flex-col justify-items-center items-center">
          <div className="bg-purple-300 rounded-full">
            <img className="p-6 h-28 w-28" src={icon2} alt="e-sbitar" />
          </div>
          <p className="pt-2">{inView && <CountUp end={100} duration={2} />}</p>
          <p>Medecins</p>
        </li>
        <li className="flex flex-col justify-items-center items-center">
          <div className="bg-primaryColor rounded-full">
            <img className="p-6 h-28 w-28" src={icon3} alt="e-sbitar" />
          </div>
          <p className="pt-2">{inView && <CountUp end={500} duration={2} />}</p>
          <p>Medicaments</p>
        </li>
      </ul>
      <div className="flex justify-between mx-40 pt-20">
        <div className="flex flex-col gap-8 justify-items-start max-w-[35rem]">
          <div className="text-6xl font-medium">
            Quels services fournissons-nous ?
          </div>
          <p className="text-fs-400">
            Dans le monde d'aujourd'hui, où tout va à vive allure, les services
            de santé sont très sollicités. Chez e-Sbitar, nous comprenons
            l'importance des soins de santé et nous nous engageons à fournir une
            assistance médicale instantanée aux individus en utilisant la
            puissance de la technologie de l'information et de la communication.
            Notre objectif ultime est d'améliorer la qualité des services de
            santé et de favoriser le bien-être global des patients.
          </p>
          <button
            onClick={() => {
              if(user.email===""){
                navigate("register");
              }else{
                navigate("profile")
              }
              
            }}
            className="text-white px-3 py-4 bg-primaryColor rounded-full max-w-[18rem] transition-all duration-1000 hover:font-medium hover:scale-105"
          >
            Commencez Maintenant
          </button>
        </div>
        <div className="font-medium text-fs-400 grid grid-cols-2 gap-2 text-center">
          <div className="bg-orange-200 w-[15rem] rounded-t-[50px] rounded-bl-[50px] h-[10rem] self-end flex justify-center">
            <p className="w-20  self-center">Assistance médicale instantanée</p>
          </div>
          <div className="bg-blue-200 w-[15rem] rounded-t-[50px] rounded-br-[50px] h-[13rem] flex justify-center">
            <p className="w-20  self-center">Recherche de médecins</p>
          </div>
          <div className="bg-purple-200 w-[15rem] rounded-b-[50px] rounded-tl-[50px] mt-2 h-[13rem] flex justify-center">
            <p className="w-20  self-center">
              Livraison de médicaments en ligne
            </p>
          </div>
          <div className="bg-green-200 w-[15rem] rounded-b-[50px] rounded-tr-[50px] mt-2 h-[10rem] flex justify-center">
            <p className="w-20  self-center"> Sensibilisation à la santé</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SrviceSection;
