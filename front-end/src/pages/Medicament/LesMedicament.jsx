import Input from "../../components/Global/Input";
import { useState, useEffect } from "react";
import Icon from "../../components/Global/Icon";
import { useNavigate } from "react-router-dom";
import Medicament from "./Medicament";
import API from "../../api-client";
import { ErrorToast, LoadingToast } from "../../components/Global/toasts";
import { useSelector } from "react-redux";

const LesMedicaments = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [toggleFilter, setToggleFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [medicaments, setMedicament] = useState([]);
  const [shown, setShown] = useState([]);
  const fetchData = async () => {
    try {
      const res = await API.get("/medicaments/");
      setMedicament(res.data.data.medicaments);
      setShown(res.data.data.medicaments);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const handleDelete = (index, medicamentIndex) => {
    setMedicament([
      ...medicaments.slice(0, medicamentIndex),
      ...medicaments.slice(medicamentIndex + 1),
    ]);
    setShown([...shown.slice(0, index), ...shown.slice(index + 1)]);
  };

  const filterItems = (query) => {
    const filtered = medicaments.filter((item) =>
      item.nom.toLowerCase().includes(query.toLowerCase())
    );
    setShown(filtered);
  };

  const filterComprime = () => {
    const filtered = medicaments.filter((item) => item.forme == "Comprimé");
    setShown(filtered);
  };
  const filterCapsule = () => {
    const filtered = medicaments.filter((item) => item.forme == "Capsule");
    setShown(filtered);
  };
  const filterSolution_buvable = () => {
    const filtered = medicaments.filter(
      (item) => item.forme == "Solution buvable"
    );
    setShown(filtered);
  };
  const filterSirop = () => {
    const filtered = medicaments.filter((item) => item.forme == "Sirop");
    setShown(filtered);
  };
  const filterCrème = () => {
    const filtered = medicaments.filter((item) => item.forme == "Crème");
    setShown(filtered);
  };

  const filterInjection = () => {
    const filtered = medicaments.filter((item) => item.forme == "Injection");
    setShown(filtered);
  };

  const filterPommade = () => {
    const filtered = medicaments.filter((item) => item.forme == "Pommade");
    setShown(filtered);
  };
  const filterInhalateur = () => {
    const filtered = medicaments.filter((item) => item.forme == "Inhalateur");
    setShown(filtered);
  };

  const filterSuppositoire = () => {
    const filtered = medicaments.filter((item) => item.forme == "Suppositoire");
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
              Medicaments
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
            Trouvez des médicaments en ligne en toute simplicité sur e-Sbitar.
            Commandez et bénéficiez d'une livraison rapide et fiable à votre
            domicile. Faites confiance à notre plateforme pour vos besoins
            pharmaceutiques !
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
                  <p
                    onClick={() => {
                      setShown(medicaments);
                      setToggleFilter(false);
                    }}
                    className="cursor-pointer mb-2"
                  >
                    Show all
                  </p>
                  <p
                    onClick={() => {
                      filterComprime();
                      setToggleFilter(false);
                    }}
                    className="cursor-pointer mb-2"
                  >
                    Show Comprimé
                  </p>
                  <p
                    onClick={() => {
                      filterCapsule();
                      setToggleFilter(false);
                    }}
                    className="cursor-pointer mb-2"
                  >
                    Show Capsule
                  </p>
                  <p
                    onClick={() => {
                      filterSolution_buvable();
                      setToggleFilter(false);
                    }}
                    className="cursor-pointer mb-2"
                  >
                    Show Solution buvable
                  </p>
                  <p
                    onClick={() => {
                      filterSirop();
                      setToggleFilter(false);
                    }}
                    className="cursor-pointer mb-2"
                  >
                    Show Sirop
                  </p>
                  <p
                    onClick={() => {
                      filterInjection();
                      setToggleFilter(false);
                    }}
                    className="cursor-pointer mb-2"
                  >
                    Show Injection
                  </p>
                  <p
                    onClick={() => {
                      filterPommade();
                      setToggleFilter(false);
                    }}
                    className="cursor-pointer mb-2"
                  >
                    Show Pommade
                  </p>
                  <p
                    onClick={() => {
                      filterCrème();
                      setToggleFilter(false);
                    }}
                    className="cursor-pointer mb-2"
                  >
                    Show Crème
                  </p>
                  <p
                    onClick={() => {
                      filterInhalateur();
                      setToggleFilter(false);
                    }}
                    className="cursor-pointer mb-2"
                  >
                    Show Inhalateur
                  </p>
                  <p
                    onClick={() => {
                      filterSuppositoire();
                      setToggleFilter(false);
                    }}
                    className="cursor-pointer mb-2"
                  >
                    Show Suppositoire
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
                Ajouter un medicament
              </button>
            )}
          </div>
          <div className="space-y-8 pt-8">
            {shown.map((e, index) => {
              return (
                <Medicament
                  medicamentIndex={medicaments.findIndex(
                    (item) => item.id === e.id
                  )}
                  imageAnnoun={e.photos[0]}
                  key={index}
                  title={e.nom}
                  description={e.description}
                  id={e.id}
                  handleDelete={handleDelete}
                  prix={e.prix}
                  index={index}
                  forme={e.forme}
                  fabricant={e.fabricant}
                />
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default LesMedicaments;
