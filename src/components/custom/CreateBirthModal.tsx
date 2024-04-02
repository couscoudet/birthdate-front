import { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { MonthEnum } from "@/enums/MonthEnum";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BirthdayType } from "@/type/globalTypes";

type propType = {
  children: ReactNode;
  addBirthday: (birthday: BirthdayType) => void;
};

const CreateBirthModal = ({ children, addBirthday }: propType) => {
  const [birthday, setBirthday] = useState({ day: 0, month: 0, name: "" });
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const setDay: (day: number) => void = (day: number) => {
    setTimeout(() => {
      setBirthday({ ...birthday, day: day });
      nextStep();
    }, 400);
  };

  const setMonth: (month: number) => void = (month: number) => {
    setTimeout(() => {
      setBirthday({ ...birthday, month: month });
      nextStep();
    }, 400);
  };

  const setName: (name: string) => void = (name: string) => {
    setBirthday({ ...birthday, name: name });
  };

  useEffect(() => {
    birthday.name && addBirthday(birthday);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birthday]);

  const displaySteps = () => {
    switch (step) {
      case 1:
        return <DayStep setDay={setDay} />;
      case 2:
        return <MonthStep setMonth={setMonth} day={birthday.day} />;
      case 3:
        return <NameStep setName={setName} />;
      default:
        return <div>Nous avons rencontré une erreur, actualiser la page</div>;
    }
  };

  const reset = () => {
    setStep(1);
    setBirthday({ day: 0, month: 0, name: "" });
  };

  return (
    <Dialog onOpenChange={() => setTimeout(reset, 500)}>
      {children}
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
      <DialogTitle className="text-white text-xl font-thin font-display mb-2">
        Choisis le jour
      </DialogTitle>
      <div className="grid grid-cols-4 gap-2">
        {days.map((day) => (
          <button
            onClick={(e) => setDay(+(e.target as HTMLButtonElement).id)}
            key={day}
            id={day.toString()}
            className="shadow-inner hover:shadow-white transition-all active:scale-90 active:shadow-xl focus:shadow-xl active:shadow-white focus:shadow-white shadow-fuchsia-200 text-xl md:text-2xl text-white font-bold py-4 px-4 rounded-full m-1"
          >
            {day < 10 ? `0${day}` : day}
          </button>
        ))}
      </div>
    </DialogHeader>
  );
};

const MonthStep = ({
  day,
  setMonth,
}: {
  day: number;
  setMonth: (month: number) => void;
}) => {
  let months: Array<number | string | MonthEnum> = Object.values(
    MonthEnum
  ).filter((month) => !isNaN(Number(month)));

  if (day > 29 && day < 31) {
    months = months.filter((month) => month !== 2);
    console.log(months);
  }

  if (day > 30) {
    months = months.filter((month) => [1, 3, 5, 7, 8, 10, 12].includes(+month));
    console.log(months);
  }

  return (
    <DialogHeader>
      <DialogTitle className="text-white text-xl font-thin font-display mb-2">
        Choisis le mois
      </DialogTitle>
      <div className="grid grid-cols-2 gap-2">
        {months.map((month) => (
          <button
            onMouseDown={(e) => setMonth(+(e.target as HTMLButtonElement).id)}
            onTouchStart={(e) => setMonth(+(e.target as HTMLButtonElement).id)}
            key={month}
            id={month.toString()}
            className="shadow-inner hover:shadow-white transition-all active:scale-90 active:shadow-xl focus:shadow-xl active:shadow-white focus:shadow-white shadow-fuchsia-200 text-xl md:text-2xl text-white font-bold py-4 px-4 rounded-full m-1"
          >
            {MonthEnum[+month]}
          </button>
        ))}
      </div>
    </DialogHeader>
  );
};

const NameStep = ({ setName }: { setName: (name: string) => void }) => {
  const formSchema = z.object({
    name: z.string().min(3).max(20),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setName(values.name);
  }
  return (
    <DialogHeader>
      <DialogTitle className="text-white text-xl font-thin font-display mb-2">
        Saisis le nom
      </DialogTitle>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full flex flex-col justify-center items-center"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-black autofill:shadow-[inset_0_0_0px_1000px_rgb(240,240,240)]"
                    placeholder="..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose asChild>
            <Button
              className="border-solid shadow-inner rounded-full shadow-fuchsia-200 py-2 px-8 mt-4 text-white"
              type="submit"
            >
              Valider
            </Button>
          </DialogClose>
        </form>
      </Form>
    </DialogHeader>
  );
};

export default CreateBirthModal;
