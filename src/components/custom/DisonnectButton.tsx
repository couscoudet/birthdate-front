import { FaPlugCircleXmark } from "react-icons/fa6";

const DisconnectButton = () => {
  return (
    <button className="shadow-inner shadow-fuchsia-200 text-2xl text-white font-bold py-4 px-4 rounded-full m-1">
      <div className="shadow-xl">
        <FaPlugCircleXmark />
      </div>
    </button>
  );
};

export default DisconnectButton;
