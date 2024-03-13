import { FaPlus } from "react-icons/fa6";

const AddButton = () => {
  return (
    <button className="shadow-inner shadow-fuchsia-200 text-4xl text-white font-bold py-6 px-6 rounded-full m-2">
      <div className="shadow-xl">
        <FaPlus />
      </div>
    </button>
  );
};

export default AddButton;
