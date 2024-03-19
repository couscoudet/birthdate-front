import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { MonthEnum } from "@/enums/MonthEnum";

const CreateBirthModal = ({ children }: { children: ReactNode }) => {
  const [birthday, setBirthday] = useState({ day: 0, month: 0, name: "" });
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const setDay: (day: number) => void = (day: number) => {
    setBirthday({ ...birthday, day: day });
    nextStep();
  };

  const displaySteps = () => {
    switch (step) {
      case 1:
        return <DayStep setDay={setDay} />;
      case 2:
        return <MonthStep day={birthday.day} />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className=" bg-gradient-to-b from-violet-900 to-fuchsia-950 text-white">
        {displaySteps()}
      </DialogContent>
    </Dialog>
  );
};

const DayStep = ({ setDay }: { setDay: (day: number) => void }) => {
  const days = [];
  for (let i = 1; i < 32; i++) {
    days.push(i);
  }
  return (
    <DialogHeader>
      <DialogTitle className="text-white text-xl font-display">
        Choisis le jour
      </DialogTitle>
      <DialogDescription>
        <div className="grid grid-cols-4 gap-2">
          {days.map((day) => (
            <button
              onClick={(e) => setDay(+(e.target as HTMLButtonElement).id)}
              key={day}
              id={day.toString()}
              className="shadow-inner hover:shadow-white focus:animate-bounce
          active:shadow-xl focus:shadow-xl active:shadow-white focus:shadow-white shadow-fuchsia-200 text-xs md:text-2xl text-white font-bold py-4 px-4 rounded-full m-1"
            >
              {day < 10 ? `0${day}` : day}
            </button>
          ))}
        </div>
      </DialogDescription>
    </DialogHeader>
  );
};

const MonthStep = ({ day }: { day: number }) => {
  const months = [];

  if (day < 30) {
    for (const month in MonthEnum) {
      months.push(month);
    }
  }

  return <div></div>;
};
export default CreateBirthModal;
