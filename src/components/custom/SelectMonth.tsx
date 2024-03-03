import { MonthEnum } from "@/enums/MonthEnum";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

type propType = {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<MonthEnum>>;
};

const SelectMonth = ({ month, setMonth }: propType) => {
  const minusMonth = (month: number) => {
    return month === 1 ? 12 : month - 1;
  };
  const addMonth = (month: number) => {
    return month === 12 ? 1 : month + 1;
  };
  return (
    <div className="grid grid-cols-6 h-full">
      <div className="col-start-1 col-span-1 flex justify-center items-center">
        <FaArrowLeft
          className="text-3xl"
          onClick={() => setMonth(minusMonth(month))}
        />
      </div>
      <div className="text-3xl col-start-2 col-span-4 flex justify-center items-center">
        {MonthEnum[month]}
      </div>
      <div className="col-start-6 col-span-1 flex justify-center items-center">
        <FaArrowRight
          className="text-3xl"
          onClick={() => setMonth(addMonth(month))}
        />
      </div>
    </div>
  );
};

export default SelectMonth;
