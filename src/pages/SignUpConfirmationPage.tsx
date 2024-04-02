import { Link } from "react-router-dom";

const SignUpConfirmationPage = () => {
  return (
    <div className="flex justify-center items-center h-full text-white flex-col font-thin font-display">
      {" "}
      <h1 className="text-2xl text-display">
        Un email vous a été transmis pour valider votre inscription
      </h1>
      <p>Pensez également à contrôler vos spams</p>
      <Link className="mt-5 font-sans text-xl" to="/login">
        Connexion
      </Link>
    </div>
  );
};

export default SignUpConfirmationPage;
