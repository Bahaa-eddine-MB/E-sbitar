import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Register, NotFound } from "./pages";
import { Profile } from "./pages/Profile/Profile";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/index";
import LesMedicaments from "./pages/Medicament/LesMedicament";
import AddMedicament from "./pages/Medicament/AddMedicament";
import LesMaladies from "./pages/Maladie/LesMaladies";
import AddMaladie from "./pages/Maladie/AddMaladie";
import ViewMedicament from "./pages/Medicament/ViewMedicament";
import ViewMaladie from "./pages/Maladie/ViewMaladie";
import UpdateMaladie from "./pages/Maladie/UpdateMaladie";
import UpdateMedicament from "./pages/Medicament/UpdateMedicament";
import HomePage from "./pages/Home/HomePage";

export const pages = {
  Home: { url: "/", name: "Home", page: <HomePage /> },
  Login: {
    url: "/login",
    name: "Login",
    page: <Login />,
  },
  Register: {
    url: "/register",
    name: "Register",
    page: <Register />,
  },
  Profile: {
    url: "/profile",
    name: "Profile",
    page: (
      <Navbar>
        <Profile />
      </Navbar>
    ),
  },
  Medicament: {
    url: "/medicaments",
    name: "Profile",
    page: (
      <Navbar>
        <LesMedicaments />
      </Navbar>
    ),
  },
  AddMedicament: {
    url: "/medicaments/add",
    name: "Profile",
    page: (
      <Navbar>
        <AddMedicament />
      </Navbar>
    ),
  },
  ViewMedicament: {
    url: "/medicaments/:id/view",
    name: "Profile",
    page: (
      <Navbar>
        <ViewMedicament />
      </Navbar>
    ),
  },
  UpdateMedicament: {
    url: "/medicaments/:id/update",
    name: "Profile",
    page: (
      <Navbar>
        <UpdateMedicament />
      </Navbar>
    ),
  },
  Maladies: {
    url: "/maladies",
    name: "Profile",
    page: (
      <Navbar>
        <LesMaladies />
      </Navbar>
    ),
  },
  AddMaladies: {
    url: "/maladies/add",
    name: "Profile",
    page: (
      <Navbar>
        <AddMaladie />
      </Navbar>
    ),
  },
  ViewMaladie: {
    url: "/maladies/:id/view",
    name: "Profile",
    page: (
      <Navbar>
        <ViewMaladie />
      </Navbar>
    ),
  },
  UpdateMaladie: {
    url: "/maladies/:id/update",
    name: "Profile",
    page: (
      <Navbar>
        <UpdateMaladie />
      </Navbar>
    ),
  },
  NotFound: { url: "*", name: "Not found", page: <NotFound /> },
};

function App() {
  const user = useSelector((state) => state.user.user);
  return (
    <Router>
      <Routes>
        {user.email !== "" && (
          <>
            {user.role.name === "PRESTATAIRE" && (
              <>
                <Route
                  path={pages.AddMaladies.url}
                  element={pages.AddMaladies.page}
                />{" "}
                <Route
                  path={pages.UpdateMaladie.url}
                  element={pages.UpdateMaladie.page}
                />{" "}
                <Route
                  path={pages.AddMedicament.url}
                  element={pages.AddMedicament.page}
                />{" "}
                <Route
                  path={pages.UpdateMedicament.url}
                  element={pages.UpdateMedicament.page}
                />
              </>
            )}
            <Route path={pages.Profile.url} element={pages.Profile.page} />
            <Route path={pages.Maladies.url} element={pages.Maladies.page} />

            <Route
              path={pages.ViewMaladie.url}
              element={pages.ViewMaladie.page}
            />

            <Route
              path={pages.Medicament.url}
              element={pages.Medicament.page}
            />

            <Route
              path={pages.ViewMedicament.url}
              element={pages.ViewMedicament.page}
            />
          </>
        )}

        <Route path={pages.Login.url} element={pages.Login.page} />
        <Route path={pages.Register.url} element={pages.Register.page} />
        <Route path={pages.Home.url} element={pages.Home.page} />
        <Route path={pages.NotFound.url} element={pages.NotFound.page} />
      </Routes>
    </Router>
  );
}

export default App;
