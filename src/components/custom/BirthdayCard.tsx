import { MonthEnum } from "@/enums/MonthEnum";
import { Card, CardContent } from "../ui/card";
import DeleteWarningModal from "./DeleteWarningModal";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { FaRegTrashCan } from "react-icons/fa6";

type Props = {
  birthday: {
    name: string;
    month: number;
    day: number;
    id: number;
  };
  timeStyle: "today" | "past" | "future";
  deleteBirthday: (id: number) => void;
};

const BirthdayCard = ({ birthday, timeStyle, deleteBirthday }: Props) => {
  return (
    <div className="flex">
      <Card
        className={`${
          timeStyle == "today"
            ? "bg-fuchsia-300 text-violet-900 border-fuchsia-500"
            : "bg-transparent text-white "
        } w-full flex items-center mb-2 `}
      >
        {timeStyle !== "past" ? (
          <FutureCard birthday={birthday} />
        ) : (
          <PastCard birthday={birthday} />
        )}
      </Card>
      <DeleteWarningModal item={birthday} deleteItem={deleteBirthday}>
        <DialogTrigger className="p-2">
          <FaRegTrashCan className="text-red-500" />
        </DialogTrigger>
      </DeleteWarningModal>
    </div>
  );
};

const FutureCard = ({
  birthday,
}: Omit<Props, "timeStyle" | "deleteBirthday">) => {
  return (
    <CardContent className="flex justify-between items-center w-full p-1 px-2">
      <div className="text-xl">{birthday.name}</div>
      <div className="date flex flex-col justify-center">
        <div className="text-2xl text-center day">
          {birthday.day < 10 ? `0${birthday.day}` : birthday.day}
        </div>
        <div className="text-xs text-center month">
          {MonthEnum[birthday.month]}
        </div>
      </div>
    </CardContent>
  );
};

const PastCard = ({
  birthday,
}: Omit<Props, "timeStyle" | "deleteBirthday">) => {
  return (
    <CardContent className="flex justify-between items-center w-full p-1 opacity-50">
      <div className="text-md">{birthday.name}</div>
      <div className="date flex flex-col justify-center">
        <div className="text-md text-center day">
          {birthday.day < 10 ? `0${birthday.day}` : birthday.day}
        </div>
        <div className="text-xs text-center month">
          {MonthEnum[birthday.month]}
        </div>
      </div>
    </CardContent>
  );
};

export default BirthdayCard;
