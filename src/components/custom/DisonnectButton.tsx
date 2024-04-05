import { useState } from "react";
import { FaPlugCircleXmark } from "react-icons/fa6";
import { Navigate } from "react-router-dom";

const DisconnectButton = () => {
  const [disconnected, setDisconnected] = useState(false);
  const disconnectUser = () => {
    console.log("deconnexion");
    localStorage.clear();
    setDisconnected(true);
  };

  return (
    <>
      {disconnected && <Navigate to="/login" replace={true} />}
      <button
        className="shadow-inner shadow-fuchsia-200 text-2xl text-white font-bold py-4 px-4 rounded-full m-1"
        onClick={() => disconnectUser()}
      >
        <div className="shadow-xl">
          <FaPlugCircleXmark />
        </div>
      </button>
    </>
  );
};

export default DisconnectButton;
