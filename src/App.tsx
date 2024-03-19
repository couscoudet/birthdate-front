import { useState } from "react";
import "./App.css";
import SelectMonth from "./components/custom/SelectMonth";
import MyLayout from "./layouts/MyLayout";
import { MonthEnum } from "./enums/MonthEnum";
import BirthdayCard from "./components/custom/BirthdayCard";
import { birthdays } from "./faker/birthdays";
import AddButton from "./components/custom/AddButton";
import DisconnectButton from "./components/custom/DisonnectButton";
import MyProfileButton from "./components/custom/MyProfileButton";
import { BirthdayType } from "./type/globalTypes";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import CreateBirthModal from "./components/custom/CreateBirthModal";

function App() {
  const date = new Date();
  const monthNumber: number = date.getMonth() + 1;
  const [monthToDisplay, setMonthToDisplay] = useState<MonthEnum>(monthNumber);

  const compare = (a: BirthdayType, b: BirthdayType) => {
    if (a.day < b.day) {
      return -1;
    }
    if (a.day > b.day) {
      return 1;
    }
    return 0;
  };

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
  return (
    <MyLayout>
      <MyLayout.Header>
        <SelectMonth month={monthToDisplay} setMonth={setMonthToDisplay} />
      </MyLayout.Header>
      <MyLayout.Body>
        <ScrollArea className="w-full h-full">
          {birthdays
            .filter((birthday) => birthday.month == monthToDisplay)
            .sort(compare)
            .map((birthday, i) => (
              <BirthdayCard
                key={i}
                birthday={birthday}
                timeStyle={generateTime(birthday.month, birthday.day)}
              ></BirthdayCard>
            ))}
        </ScrollArea>
      </MyLayout.Body>
      <MyLayout.Footer>
        <div>
          <DisconnectButton />
          <MyProfileButton />
        </div>
        <CreateBirthModal>
          <AddButton />
        </CreateBirthModal>
      </MyLayout.Footer>
    </MyLayout>
  );
}

export default App;
