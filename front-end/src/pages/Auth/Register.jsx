import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pages } from "../../App";
import { useDispatch } from "react-redux";
import { CreateUser } from "../../Redux/Slices/userSlice";
import { ErrorToast, LoadingToast } from "../../components/Global/toasts";
import Input from "../../components/Global/Input";
import PasswordInput from "../../components/Global/PasswordInput";
import Button from "../../components/Global/Button";
import Profile from "../../assets/profile.jpg";
import Icon from "../../components/Global/Icon";
import API from "../../api-client";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const schema = yup.object().shape({
  nom: yup.string().min(3).max(30).required("Your first name is required"),
  prenom: yup.string().min(3).max(30).required("Your last name is required"),
  adresse: yup.string().min(8).max(30).required("Your address  is required"),
  birth_place: yup
    .string()
    .min(5)
    .max(30)
    .required("Your birth place is required"),
  birthday: yup.string().required("Your birthday is required"),
  email: yup
    .string()
    .email("The email is not valid")
    .required("Your email is required"),
  password: yup.string().min(8).max(20).required("A password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "The passwords don't match"),
});

const Register = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const handlePicture = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const redirect = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    setError("");
    const new_user = data;
    new_user["username"] = new_user["email"];
     setLoading(true);
    if(!file){
      setError("Image is required")
      setLoading(false)
      return
    }
    else {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          setError(err);
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            new_user["photo_url"] = url;
            API.post("/register", new_user)
              .then((response) => {
                setLoading(false);
                const user = response.data.data.user;
                localStorage.setItem("auth_token", response.data.data.token);
                dispatch(CreateUser(user));
                redirect(pages.Profile.url);
              })
              .catch((error) => {
                setError(error.response.data.message);
                setLoading(false);
              });
          });
        }
      );
    }
  };

  useEffect(() => {
    if (user.email !== "") {
      redirect("/profile");
    }
  }, []);

  return (
    <>
      {loading && <LoadingToast />}
      {error && <ErrorToast message={error} />}
      {user.email === "" ? (
        <section className="pt-12 px-20 pb-8">
          <div className="text-secondaryColor font-medium text-fs-700 pb-8">
            Créer un compte
          </div>
          <p className="text-fs-400 text-thirdColor">
            Veuillez remplir les informations requises pour vous inscrire sur
            notre plateforme.
          </p>

          <div className={`flex gap-4 items-center `}>
            <div className="flex justify-center items-center w-[78px] h-[76px] relative">
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Selected Image"
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}

              {!file && (
                <img
                  src={Profile}
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}

              <label
                htmlFor="file-upload"
                className="flex justify-center items-center rounded-full absolute w-5 h-5 border-[1px]
              bg-primaryColor top-[70%] left-[70%] hover:cursor-pointer"
              >
                <Icon
                  icon="edit-2"
                  className="fill-transparent stroke-bgColor
                group-hover:stroke-white shrink-0 duration-500 w-[11px]"
                />

                <input
                  onChange={handlePicture}
                  id="file-upload"
                  type="file"
                  className="hidden appearance-none"
                />
              </label>
            </div>
            <ul>
              <li className="text-thirdColor text-fs-400">
                Ajouter une photo de profile
              </li>
            </ul>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-16">
            <div className="pt-12 space-y-5">
              <Input
                register={register}
                name={"email"}
                isError={errors?.email}
                error_message={errors?.email?.message}
                className={"min-w-[22.5rem]"}
                icon={"email"}
                label={"Email"}
                inputProps={{ placeholder: "example@gmail.com" }}
              />
              <Input
                register={register}
                name={"nom"}
                isError={errors?.nom}
                error_message={errors?.nom?.message}
                className={"min-w-[22.5rem]"}
                icon={"person"}
                label={"Nom"}
                inputProps={{ placeholder: "Nom" }}
              />
              <Input
                register={register}
                name={"prenom"}
                isError={errors?.prenom}
                error_message={errors?.prenom?.message}
                className={"min-w-[22.5rem]"}
                icon={"person"}
                label={"Prenon"}
                inputProps={{ placeholder: "Prenon" }}
              />
              <Input
                register={register}
                name={"adresse"}
                isError={errors?.adresse}
                error_message={errors?.adresse?.message}
                className={"min-w-[22.5rem]"}
                icon={"location"}
                label={"Adresse"}
                inputProps={{ placeholder: "Mon adresse" }}
              />
              <Input
                register={register}
                name={"birth_place"}
                isError={errors?.birth_place}
                error_message={errors?.birth_place?.message}
                className={"min-w-[22.5rem]"}
                icon={"tag-user"}
                label={"Lieu de naissance"}
                inputProps={{ placeholder: "Lieu de naissance" }}
              />
              <Input
                register={register}
                name={"birthday"}
                isError={errors?.birthday}
                error_message={errors?.birthday?.message}
                className={"min-w-[22.5rem]"}
                icon={"calendar"}
                label={"Date de naissance"}
                inputProps={{ type: "date" }}
              />
            </div>
            <div className="pt-12 space-y-5">
              <PasswordInput
                register={register}
                name={"password"}
                isError={errors?.password}
                error_message={errors?.password?.message}
                label={"Mot de passe"}
                inputProps={{ placeholder: "Mot de passe" }}
              />
              <PasswordInput
                register={register}
                name={"confirm_password"}
                isError={errors?.confirm_password}
                error_message={errors?.confirm_password?.message}
                label={"Confirmer votre mot de passe"}
                inputProps={{ placeholder: "Confirmer votre mot de passe" }}
              />
              <div className="pt-8">
                <Button>Créer un compte</Button>
              </div>
              <div className="text-secondaryColor text-center pt-2 text-fs-400">
                Vous avez déja un compte ?
                <span
                  onClick={() => {
                    redirect("/login");
                  }}
                  className="text-primaryColor hover:cursor-pointer"
                >
                  &nbsp; Se connecter ici.
                </span>
              </div>
            </div>
          </form>
        </section>
      ) : (
        <section className="text-mainRed font-medium flex justify-center items-center">
          LOG OUT FIRST
        </section>
      )}
    </>
  );
};

export default Register;
