import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Global/Input";
import { useParams } from "react-router-dom";
import API from "../../api-client";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Global/toasts";
import { useSelector } from "react-redux";

const ViewMaladie = () => {
  const user = useSelector((state) => state.user.user);
  const { id } = useParams();
  const redirect = useNavigate();
  const [images, setImages] = useState([]);
  const [symp, setSymp] = useState([]);
  const [coz, setCoz] = useState([]);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const fetchData = async () => {
    try {
      setError("");
      const res = await API.post("/maladies/one", {
        id: id,
      });
      setDescription(res.data.data.maladie.description);
      setName(res.data.data.maladie.nom);
      setCoz(res.data.data.maladie.causes);
      setSymp(res.data.data.maladie.symptomes);
      setImages(res.data.data.maladie.photos);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const DeleteMaladie = async () => {
    try {
      setSuccess("");
      setError("");
      setLoading(true);
      await API.post("/maladies/delete", {
        id: id,
      });
      setLoading(false);
      setSuccess("Maladie deleted successfuly!");
      redirect("/maladies");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      {loading && <LoadingToast />}
      {(!loading || name) && (
        <section className="pt-16 pb-12 px-layout w-full">
          <div className="text-secondaryColor font-medium text-fs-700 pb-8">
            Details de maladie
          </div>
          <div className="flex justify-between w-full">
            <p className="text-fs-400 text-thirdColor max-w-[35rem]">
              La page des détails de la maladie vous offre une compréhension
              approfondie de la maladie spécifique. Vous y trouverez des
              informations détaillées sur les symptômes caractéristiques, les
              possibles causes ... .
            </p>
            {user.role.name === "PRESTATAIRE" && (
              <div className="text-primaryColor flex flex-col gap-3 pr-8">
                <button
                  onClick={() => {
                    redirect(`/maladies/${id}/update`);
                  }}
                >
                  Modifier maladie
                </button>
                <button
                  onClick={() => {
                    DeleteMaladie();
                  }}
                >
                  Supprimer maladie
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3 mb-8 my-4">
            {images.map((image, index) => {
              return (
                <div key={index}>
                  <img
                    src={image}
                    alt="Selected Image"
                    className="object-cover rounded-md shadow-custom  h-32 max-w-[9rem] "
                  />
                </div>
              );
            })}
          </div>
          <div className="pt-8 flex gap-32">
            <div className="space-y-4">
              <Input
                label={"Nom"}
                className={"w-[22.5rem]"}
                inputProps={{ placeholder: "Nom", disabled: true, value: name }}
                icon={"document-text"}
              />
              <div>
                <p className="text-thirdColor pb-1 text-fs-300">Description</p>
                <div
                  className={`bg-secondBgColor w-[22.5rem]
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
          `}
                >
                  <div className="relative w-full">
                    <textarea
                      disabled={true}
                      value={description}
                      rows={5}
                      className={`focus:outline-0  disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor
                text-secondaryColor caret-secondaryColor
                `}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-thirdColor text-fs-400">Symptômes</p>
              {symp.map((e, index) => {
                return (
                  <div key={index} className="flex justify-between py-2">
                    <p className="text-secondaryColor">{e}</p>
                  </div>
                );
              })}
              <p className="text-thirdColor text-fs-400 pt-8">
                Causes possibles
              </p>
              {coz.map((e, index) => {
                return (
                  <div key={index} className="flex justify-between py-2">
                    <p className="text-secondaryColor">{e}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ViewMaladie;
