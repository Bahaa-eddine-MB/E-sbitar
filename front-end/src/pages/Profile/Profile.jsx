import { useSelector } from "react-redux";
import Input from "../../components/Global/Input";
import profile from "../../assets/profile.jpg";

export const Profile = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <section className="pt-16 pb-12 px-layout">
      <div className="text-secondaryColor font-medium text-fs-700 pb-8">
        Profil
      </div>
      <p className="text-fs-400 text-thirdColor max-w-[35rem]">
        Votre profil e-Sbitar contient toutes les informations de votre compte
        pour une gestion facile et sécurisée. Vous pouvez mettre à jour vos
        coordonnées, gérer vos préférences de communication et modifier votre
        mot de passe.
      </p>
      <div className="space-y-5 pt-12">
        <div className="flex gap-4 items-center pb-8">
          <img
            src={user.photo_url ? user.photo_url : profile}
            className={`w-20 h-20 rounded-full object-cover`}
          />
          <ul>
            <li className="text-fs-400 font-medium text-secondaryColor capitalize">
              {user.nom}
            </li>
            <li className="text-thirdColor text-fs-400">{user.prenom}</li>
          </ul>
        </div>
        <div className="flex flex-col gap-8 max-w-[365px]">
          <Input
            label={"Email"}
            className="min-w-[22.5rem]"
            inputProps={{
              value: user.email,
              disabled: true,
            }}
            icon="email"
          />
          <Input
            label={"Adresse"}
            className="min-w-[22.5rem]"
            inputProps={{
              value: user.adresse,
              disabled: true,
            }}
            icon="location"
          />
          <Input
            label={"Informations de naissance"}
            className="min-w-[22.5rem]"
            inputProps={{
              value: user.birthday.slice(0, 10),
              disabled: true,
            }}
            icon="calendar"
          />
          <Input
            className="min-w-[22.5rem]"
            inputProps={{
              value: user.birth_place,
              disabled: true,
            }}
            icon="tag-user"
          />
        </div>
      </div>
    </section>
  );
};
