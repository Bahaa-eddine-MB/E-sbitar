import logo from "../../assets/Landing page/white logo.svg";
import social from "../../assets/Landing page/social.svg";
const Footer = () => {
  return (
    <section className="bg-footer-texture bg-cover px-20 text-white flex flex-col justify-end gap-16  h-[40rem]">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <img src={logo} alt="e-sbitar" className="h-12" />
          <p className="font-medium text-fs-600">e-Sbitar</p>
        </div>
        <img src={social} alt="social"  className="h-8"/>
      </div>
      <div className="flex justify-between text-fs-400 pb-16">
        <p>© e-Sbitar. Tous droits réservés.</p>
        <div className="flex gap-8">
          <p>Conditions générales d'utilisation</p>
          <p>Politique de confidentialité</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
