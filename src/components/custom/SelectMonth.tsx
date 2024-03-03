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
    <div className="flex justify-evenly items-center h-full">
      <FaArrowLeft
        className="text-3xl"
        onClick={() => setMonth(minusMonth(month))}
      />
      <div className="text-3xl">{MonthEnum[month]}</div>
      <FaArrowRight
        className="text-3xl"
        onClick={() => setMonth(addMonth(month))}
      />
    </div>
  );
};

export default SelectMonth;
