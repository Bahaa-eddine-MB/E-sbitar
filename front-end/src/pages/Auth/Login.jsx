import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { pages } from "../../App";
import { useDispatch } from "react-redux";
import { CreateUser } from "../../Redux/Slices/userSlice";
import LoadingAnimation from "../../components/Global/LoadingAnimation";
import logo from "../../assets/logo.png";
import Input from "../../components/Global/Input";
import PasswordInput from "../../components/Global/PasswordInput";
import Button from "../../components/Global/Button";
import { ErrorToast } from "../../components/Global/toasts";
import API from "../../api-client";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const emailRef = useRef("");
  const [emailError, setEmailError] = useState(false);
  const passwordRef = useRef("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  function verifyEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  const redirect = useNavigate();
  const handleSubmit = async (e) => {
    setEmailError(false);
    e.preventDefault();
    setError("");
    if (!emailRef.current.trim() || !passwordRef.current.trim()) {
      setError("Please fill the fields");
      return;
    }
    if (!verifyEmail(emailRef.current.trim())) {
      setEmailError(true);
      return;
    }
    await handleSignIn();
  };

  const handleSignIn = async () => {
    setLoading(true);
    await API.post("/login", {
      email: emailRef.current.trim(),
      password: passwordRef.current.trim(),
    })
      .then((response) => {
        const user = response.data.data.user;
        localStorage.setItem("auth_token", response.data.data.token);
        dispatch(CreateUser(user));
        redirect(pages.Profile.url);
      })
      .catch((error) => {
        console.log(error);
        setError("Auth failed");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user.email !== "") {
      navigate("/profile");
    }
  }, []);

  return (
    <>
      {user.email === "" ? (
        <section className="relative bg-bgColor min-h-screen  ">
          {error && <ErrorToast message={error} />}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2  px-10  ">
            <div
              className="rounded-tl-lg rounded-tr-lg px-6 shadow-default mx-auto grid justify-items-center gap-4 
          bg-white min-w-[46.25rem] py-8"
            >
              <img src={logo} alt="StartEase" className="" />
              <div className=" text-fs-600 text-secondaryColor font-semibold">
                E-Sbitar
              </div>
              <div className="max-w-[30rem] text-center text-thirdColor">
                Bienvenue sur la plateforme e-Sbitar. Veuillez entrer votre
                adresse e-mail et votre mot de passe pour accéder au site web.
              </div>
              <form className="grid" onSubmit={handleSubmit}>
                <Input
                  isError={emailError}
                  error_message={"Please enter a valid email"}
                  label={"Email"}
                  icon="email"
                  onChange={(e) => {
                    emailRef.current = e.target.value;
                  }}
                  inputProps={{ placeholder: "Email address" }}
                />

                <PasswordInput
                  label={"Password"}
                  className={"pt-5"}
                  onChange={(e) => {
                    passwordRef.current = e.target.value;
                  }}
                  inputProps={{ placeholder: "Password" }}
                />

                {loading ? (
                  <LoadingAnimation className="w-[52px] scale-[2] mx-auto" />
                ) : (
                  <Button className={"mt-8"}>Se connecter</Button>
                )}
                <div className="text-secondaryColor justify-self-center pt-3">
                  Vous n'avez pas de compte ?
                  <span
                    onClick={() => {
                      redirect("/register");
                    }}
                    className="text-primaryColor hover:cursor-pointer"
                  >
                    &nbsp; Créez-en un ici.
                  </span>
                </div>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <section className="text-mainRed font-medium flex justify-center items-center">
          LOG OUT FIRST
        </section>
      )}
    </>
  );
};

export default Login;
