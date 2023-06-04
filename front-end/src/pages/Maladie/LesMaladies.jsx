import Input from "../../components/Global/Input";
import { useState, useEffect } from "react";
import Icon from "../../components/Global/Icon";
import Maladie from "./Maladie";
import { useNavigate } from "react-router-dom";
import API from "../../api-client";
import { ErrorToast, LoadingToast } from "../../components/Global/toasts";
import { useSelector } from "react-redux";

const LesMaladies = () => {
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [maladies, setMaladies] = useState([]);
  const [shown, setShown] = useState([]);
  const navigate = useNavigate();
  const [toggleFilter, setToggleFilter] = useState(false);
  const fetchData = async () => {
    try {
      const res = await API.get("/maladies/");
      setMaladies(res.data.data.maladies);
      setShown(res.data.data.maladies);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const handleDelete = (index) => {
    const updatedItems = [...maladies];
    updatedItems.splice(index, 1);
    setMaladies(updatedItems);
    setShown(updatedItems);
  };

  const filterItems = (query) => {
    const filtered = maladies.filter((item) =>
      item.nom.toLowerCase().includes(query.toLowerCase())
    );
    setShown(filtered);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading && <LoadingToast />}
      {error && <ErrorToast message={error} />}
      {!loading && (
        <section className="pt-16 pb-12 px-layout w-full">
          <div className="flex justify-between">
            <div className="text-secondaryColor font-medium text-fs-700 pb-8">
              Maladies
            </div>
            <Input
              onChange={(e) => {
                filterItems(e.target.value);
              }}
              icon="search"
              inputProps={{ placeholder: "Recherche" }}
              className="basis-[21.875rem] mr-8"
            />
          </div>

          <p className="text-fs-400 text-thirdColor max-w-[35rem]">
            Explorez notre page dédiée aux maladies sur e-Sbitar. Obtenez des
            informations complètes sur différentes maladies, y compris leurs
            symptômes et leurs causes possibles. Restez informé et prenez les
            bonnes décisions pour rester en bonne santé grâce à notre contenu
            précis et fiable.
          </p>
          <div className="flex max-w-[35rem] justify-between">
            <div className="flex items-center gap-2 py-4 relative z-10">
              Filtrer
              <Icon
                icon="arrow-down"
                className={`stroke-secondaryColor cursor-pointer transition-all duration-300  ${
                  toggleFilter && "rotate-180"
                }`}
                onClick={() => {
                  setToggleFilter(!toggleFilter);
                }}
              />
              {toggleFilter && (
                <div
                  className={`absolute w-[12rem] bottom-0 translate-x-[-10px] translate-y-[95%] left-0 bg-white rounded-md shadow-md
          py-3 px-5 text-secondaryColor `}
                >
                  <p onClick={() => {}} className="cursor-pointer mb-2">
                    Show all
                  </p>
                  <p onClick={() => {}} className="cursor-pointer mb-2">
                    Show pending
                  </p>
                </div>
              )}
            </div>
            {user.role.name === "PRESTATAIRE" && (
              <button
                onClick={() => {
                  navigate("add");
                }}
                className="text-primaryColor"
              >
                Ajouter une maladie
              </button>
            )}
          </div>
          <div className="space-y-8 pt-8">
            {shown.map((e, index) => {
              return (
                <Maladie
                  key={index}
                  imageAnnoun={e.photos[0]}
                  title={e.nom}
                  description={e.description}
                  id={e.id}
                  handleDelete={handleDelete}
                  index={index}
                />
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default LesMaladies;
