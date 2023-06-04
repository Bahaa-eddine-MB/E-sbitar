import Input from "../../components/Global/Input";
import { useState, useEffect } from "react";
import Icon from "../../components/Global/Icon";
import Button from "../../components/Global/Button";
import DropDownMenu from "../../components/Global/DropDownMenu";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Global/toasts";
import { useParams } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import API from "../../api-client";

const UpdateMedicament = () => {
  const { id } = useParams();
  const [nom, setNom] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [description, setDescription] = useState("");
  const [wordCount, setWordsCount] = useState(0);
  const [images, setImages] = useState([]);
  const [code, setCode] = useState("");
  const [fabricant, setFabricant] = useState("");
  const [prix, setPrix] = useState("");
  const [form, setForm] = useState("");
  const [quantity, setQuantity] = useState("");
  const MAX_WORDS = 100;
  function handleChangeDescription(event) {
    if (event.target.value.trim().split(/\s+/).length <= MAX_WORDS) {
      setDescription(event.target.value);
      let count =
        event.target.value === ""
          ? 0
          : event.target.value.trim().split(/\s+/).length;
      setWordsCount(count);
    }
  }
  const handleImages = (event) => {
    if (images.length < 3) {
      setImages([...images, event.target.files[0]]);
    }
  };
  const handleDeleteImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleFormat = (e) => {
    setForm(e);
  };
  const fetchData = async () => {
    try {
      setError("");
      const res = await API.post("/medicaments/one", {
        id: id,
      });
      setDescription(res.data.data.medicament.description);
      setNom(res.data.data.medicament.nom);
      setPrix(res.data.data.medicament.prix);
      setFabricant(res.data.data.medicament.fabricant);
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
  const uploadPic = (image) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `/files/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              resolve(url);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  const Submit = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      const urls = [];
      for (let i = 0; i < images.length; i++) {
        if (images[i].name) {
          const url = await uploadPic(images[i]);
          urls.push(url);
        } else {
          const url = images[i];
          urls.push(url);
        }
      }
      API.put("/medicaments/", {
        id: id,
        nom: nom,
        description: description,
        code: code,
        fabricant: fabricant,
        photos: urls,
        prix: prix,
        quantite: quantity,
        forme:form
      })
        .then(() => {
          setSuccess("Medicament updated successfully!");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading && <LoadingToast />}
      {error && <ErrorToast message={error} />}
      {success && <SuccessToast message={success} />}
      {(!loading || form) && (
        <section className="pt-16 pb-12 px-layout w-full">
          <div className="text-secondaryColor font-medium text-fs-700 pb-8">
            Modifier un médicament
          </div>
          <p className="text-fs-400 text-thirdColor max-w-[35rem]">
            Modifiez rapidement les médicaments sur e-Sbitar. Modifiez les
            détails essentiels tels que le nom du médicament, description... .
          </p>
          <div className="pt-8 flex gap-32">
            <div className="space-y-4">
              <Input
                onChange={(e) => {
                  setNom(e.target.value);
                }}
                label={"Nom"}
                className={"w-[22.5rem]"}
                inputProps={{ placeholder: "Nom", defaultValue: nom }}
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
                      onChange={handleChangeDescription}
                      placeholder="Description..."
                      rows={5}
                      className={`focus:outline-0  disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor
                text-secondaryColor caret-secondaryColor
                `}
                    />
                    <span
                      className={` absolute bottom-0 right-10 ${
                        wordCount > MAX_WORDS
                          ? "text-mainRed"
                          : "text-thirdColor"
                      }`}
                    >
                      {wordCount} - {MAX_WORDS} words
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-thirdColor text-fs-400 pt-7">
                  Modifier les photos
                </div>
                <p className="text-fs-300 text-thirdColor max-w-[28rem] pt-2 pb-8">
                  Veuillez garder entre 1-3 photos pour ce medicament.
                </p>
              </div>
              <div className="flex gap-3 mb-8">
                {images.map((image, index) => {
                  return (
                    <div key={index} className="relative">
                      <img
                        src={image.name ? URL.createObjectURL(image) : image}
                        alt="Selected Image"
                        className="object-cover rounded-md shadow-custom  h-32 max-w-[9rem] "
                      />

                      <button
                        onClick={() => {
                          handleDeleteImage(index);
                        }}
                        className="absolute top-1 right-1 h-4 w-4 bg-mainRed rounded-full"
                      >
                        <Icon icon={"close"} className={"stroke-white "} />
                      </button>
                    </div>
                  );
                })}
              </div>
              {images.length < 3 && (
                <label
                  htmlFor="file-upload"
                  className="justify-self-start border-[3px] border-dashed border-primaryColor h-[17rem] 
                 rounded-md flex flex-col items-center justify-center hover:cursor-pointer"
                >
                  <div>
                    <h6 className="text-primaryColor flex-grow">
                      Modifier les photo
                    </h6>
                    <p className="text-thirdColor text-center">Upload</p>
                  </div>

                  <input
                    onChange={handleImages}
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden appearance-none"
                  />
                </label>
              )}
              <div className="pt-8">
                <Button
                  onClick={() => {
                    Submit();
                  }}
                >
                  Save
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-[22.5rem]">
              <Input
                onChange={(e) => {
                  setFabricant(e.target.value);
                }}
                label={"Fabricant"}
                className={"w-[22.5rem]"}
                inputProps={{
                  placeholder: "Fabricant",
                  defaultValue: fabricant,
                }}
                icon={"document-text"}
              />
              <DropDownMenu
                handleChange={handleFormat}
                iconColor={"stroke-thirdColor"}
                isEdit={true}
                icon={"clipboard"}
                label={"Forme"}
                title={form}
                list={[
                  "Comprimé",
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
                    onChange={(e) => {
                      setPrix(e.target.value);
                    }}
                    defaultValue={prix}
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
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                    defaultValue={quantity}
                    type="number"
                    className={`disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor`}
                  />
                </div>
              </div>
              <Input
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                label={"Code"}
                className={"w-[22.5rem]"}
                inputProps={{ placeholder: "Code", defaultValue: code }}
                icon={"document-text"}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UpdateMedicament;
