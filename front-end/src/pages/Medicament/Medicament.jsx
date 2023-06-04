import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Global/Icon";
import API from "../../api-client";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Global/toasts";
import { useSelector } from "react-redux";

const Medicament = ({
  id,
  medicamentIndex,
  title,
  description,
  imageAnnoun,
  className,
  fabricant,
  prix,
  handleDelete,
  forme,
  index,
}) => {
  const user = useSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const DeleteMedicament = async () => {
    try {
      setSuccess("");
      setError("");
      setLoading(true);
      await API.post("/medicaments/delete", {
        id: id,
      });
      handleDelete(index,medicamentIndex);
      setLoading(false);
      setSuccess("Maladie deleted successfuly!");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".annoucement-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <>
      {loading && <LoadingToast />}
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      <li
        className={
          `w-[28rem] rounded-lg shadow-custom text-secondaryColor list-none ` +
          className
        }
      >
        <div className="flex flex-col gap-0 px-4 py-4 relative">
          <h3 className="pt-2">Nom</h3>
          <p className="text-thirdColor pb-2">{title}</p>
          <h3 className="pt-2">Description</h3>
          <p className="text-thirdColor pb-2">{description}</p>
           <h3 className="pt-2">Forme</h3>
          <p className="text-thirdColor pb-2">{forme}</p>
          <div className="flex justify-between">
            <h3 className="pt-2">
              Prix&nbsp;<p className="text-thirdColor pb-2">{prix}&nbsp;DA</p>
            </h3>
            <h3 className="pt-2">
              Fabricant&nbsp;<p className="text-thirdColor pb-2">{fabricant}</p>
            </h3>
          </div>

          <div className="flex justify-between pt-6">
            <button
              onClick={() => {
                navigate(`${id}/view`);
              }}
              className="text-primaryColor hover:underline"
            >
              Voir plus
            </button>
          </div>
          {user.role.name === "PRESTATAIRE" && (
            <section className="annoucement-container">
              <Icon
                icon="more"
                className="stroke-primaryColor absolute top-[5%] right-[5%] cursor-pointer"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
              {isOpen && (
                <div className="absolute top-[10%] right-[5%] w-[8rem] z-10">
                  <div className="bg-bgColor rounded-md">
                    <ul
                      onClick={() => {
                        navigate(`${id}/update`);
                      }}
                      className="hover:bg-secondBgColor py-3 flex rounded-md gap-4 px-4 hover:cursor-pointer"
                    >
                      <li>
                        <Icon
                          icon={"edit"}
                          className={"stroke-secondaryColor h-5"}
                        />
                      </li>
                      <li>Edit</li>
                    </ul>
                    <ul
                      onClick={async () => {
                        if (
                          confirm(
                            "Are you sure you want to delete this medicament?"
                          )
                        ) {
                          await DeleteMedicament();
                          setIsOpen(false);
                        } else {
                        }
                      }}
                      className="hover:bg-secondBgColor py-3 flex rounded-md gap-4 px-4 hover:cursor-pointer"
                    >
                      <li>
                        <Icon
                          icon={"trash"}
                          className={"stroke-secondaryColor h-[23px]"}
                        />
                      </li>
                      <li>Delete</li>
                    </ul>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>

        <img src={imageAnnoun} alt="maladie" className="w-full rounded-b-lg" />
      </li>
    </>
  );
};

export default Medicament;
