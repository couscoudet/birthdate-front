import { DialogTrigger } from "@radix-ui/react-dialog";
import { FaPlus } from "react-icons/fa6";

const AddButton = () => {
  return (
    <DialogTrigger className="shadow-inner shadow-fuchsia-200 text-4xl text-white font-bold py-6 px-6 rounded-full m-2 hover:shadow-white transition-all active:scale-90 active:shadow-xl active:shadow-white focus:shadow-white">
      <div className="shadow-xl">
        <FaPlus />
      </div>
    </DialogTrigger>
  );
};

export default AddButton;
