import Input from "../../components/Global/Input";
import { useState, useEffect } from "react";
import DropDownMenu from "../../components/Global/DropDownMenu";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../../api-client";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Global/toasts";
import { useSelector } from "react-redux";

const ViewMedicament = () => {
  const user = useSelector((state) => state.user.user);
  const { id } = useParams();
  const redirect = useNavigate();
  const [images, setImages] = useState([]);
  const [prix, setPrix] = useState("");
  const [quantity, setQuantity] = useState("");
  const [fabriquant, setFabriquant] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [form, setForm] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fetchData = async () => {
    try {
      setError("");
      const res = await API.post("/medicaments/one", {
        id: id,
      });
      setDescription(res.data.data.medicament.description);
      setName(res.data.data.medicament.nom);
      setPrix(res.data.data.medicament.prix);
      setFabriquant(res.data.data.medicament.fabricant);
      setQuantity(res.data.data.medicament.quantite);
      setImages(res.data.data.medicament.photos);
      setCode(res.data.data.medicament.code);
      setForm(res.data.data.medicament.forme);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const DeleteMedicamen = async () => {
    try {
      setSuccess("");
      setError("");
      setLoading(true);
      await API.post("/medicaments/delete", {
        id: id,
      });
      setLoading(false);
      setSuccess("Médicament deleted successfuly!");
      redirect("/medicaments");
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
            Details de médicament
          </div>
          <div className="flex justify-between w-full">
            <p className="text-fs-400 text-thirdColor max-w-[35rem]">
              La page des détails du médicament vous offre une vue d'ensemble
              complète du médicament, y compris son fabricant, prix et forme.
            </p>
            {user.role.name === "PRESTATAIRE" && (
              <div className="text-primaryColor flex flex-col gap-3 pr-8">
                <button
                  onClick={() => {
                    redirect(`/medicaments/${id}/update`);
                  }}
                >
                  Modifier medicament
                </button>
                <button
                  onClick={() => {
                    DeleteMedicamen();
                  }}
                >
                  Supprimer medicament
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3 mb-8 mt-4">
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
                inputProps={{
                  placeholder: "Nom",
                  disabled: true,
                  defaultValue: name,
                }}
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
                      defaultValue={description}
                      disabled={true}
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

            <div className="flex flex-col gap-4 w-[22.5rem]">
              <Input
                label={"Fabricant"}
                className={"w-[22.5rem]"}
                inputProps={{
                  placeholder: "Fabricant",
                  disabled: true,
                  defaultValue: fabriquant,
                }}
                icon={"document-text"}
              />
              <DropDownMenu
                iconColor={"stroke-thirdColor"}
                isEdit={false}
                icon={"clipboard"}
                label={"Forme"}
                title={form}
                list={[
                  "Comprimé",
                  "Capsule",
                  "Capsule",
                  "Solution buvable",
                  "Sirop",
                  "Injection",
                  "Pommade",
                  "Crème",
                  "Inhalateur",
                  "Suppositoire",
                ]}
              />
              <div className="flex justify-between">
                <div
                  className={`bg-secondBgColor w-[40%]
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
               `}
                >
                  <p className="text-thirdColor text-fs-400">Prix:&nbsp;</p>
                  <input
                    defaultValue={prix}
                    disabled={true}
                    type="number"
                    className={`disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor`}
                  />
                  <p className="text-thirdColor text-fs-400">&nbsp;DA</p>
                </div>
                <div
                  className={`bg-secondBgColor w-[40%]
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
               `}
                >
                  <p className="text-thirdColor text-fs-400">Quantite:&nbsp;</p>
                  <input
                    defaultValue={quantity}
                    type="number"
                    disabled={true}
                    className={`disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor`}
                  />
                </div>
              </div>
              <Input
                label={"Code"}
                className={"w-[22.5rem]"}
                inputProps={{
                  placeholder: "Code",
                  disabled: true,
                  defaultValue: code,
                }}
                icon={"document-text"}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ViewMedicament;
