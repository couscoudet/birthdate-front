import AddButton from "@/components/custom/AddButton";
import BirthdayCard from "@/components/custom/BirthdayCard";
import CreateBirthModal from "@/components/custom/CreateBirthModal";
import DisconnectButton from "@/components/custom/DisonnectButton";
import SelectMonth from "@/components/custom/SelectMonth";
import { MonthEnum } from "@/enums/MonthEnum";
import useBirthday from "@/hooks/useBirthday";
import MyLayout from "@/layouts/MyLayout";
import { BirthdayType } from "@/type/globalTypes";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useRef, useState } from "react";

const MainAppPage = () => {
  const date = new Date();
  const monthNumber: number = date.getMonth() + 1;
  const [monthToDisplay, setMonthToDisplay] = useState<MonthEnum>(monthNumber);
  const [fetchedMonths, setFectchedMonths] = useState<number[]>([]);

  const compare = (a: BirthdayType, b: BirthdayType) => {
    if (a.day < b.day) {
      return -1;
    }
    if (a.day > b.day) {
      return 1;
    }
    return 0;
  };

  const { birthdays, loadBirthdaysForMonth, addBirthday, deleteBirthday } =
    useBirthday();

  //Generate string for style depending on timeline from now
  const generateTime = (month: number, day: number) => {
    const now = new Date();
    if (now.getMonth() + 1 === month && now.getDate() === day) {
      return "today";
    } else if (
      (now.getMonth() + 1 === month && now.getDate() < day) ||
      now.getMonth() + 1 < month
    ) {
      return "future";
    } else {
      return "past";
    }
  };

  async function loadBirthdays(month: number) {
    await loadBirthdaysForMonth(month);
    setFectchedMonths((prev) => [...prev, month]);
  }

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!fetchedMonths.includes(monthToDisplay)) loadBirthdays(monthToDisplay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthToDisplay]);

  return (
    <MyLayout>
      <MyLayout.Header>
        <SelectMonth month={monthToDisplay} setMonth={setMonthToDisplay} />
      </MyLayout.Header>
      <MyLayout.Body>
        <ScrollArea className="w-full h-full">
          {birthdays.length > 0 &&
            birthdays
              .filter((birthday) => birthday.month == monthToDisplay)
              .sort(compare)
              .map(
                (birthday) =>
                  birthday && (
                    <BirthdayCard
                      key={birthday.id}
                      deleteBirthday={deleteBirthday}
                      birthday={birthday}
                      timeStyle={generateTime(birthday.month, birthday.day)}
                    ></BirthdayCard>
                  )
              )}
        </ScrollArea>
      </MyLayout.Body>
      <MyLayout.Footer>
        <div>
          <DisconnectButton />
        </div>
        <CreateBirthModal addBirthday={addBirthday}>
          <AddButton />
        </CreateBirthModal>
      </MyLayout.Footer>
    </MyLayout>
  );
};

export default MainAppPage;
