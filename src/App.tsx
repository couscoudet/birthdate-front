import { useState } from "react";
import "./App.css";
import SelectMonth from "./components/custom/SelectMonth";
import MyLayout from "./layouts/MyLayout";
import { MonthEnum } from "./enums/MonthEnum";

function App() {
  const date = new Date();
  const monthNumber: number = date.getMonth();
  const [monthToDisplay, setMonthToDisplay] = useState<MonthEnum>(monthNumber);
  return (
    <>
      <MyLayout>
        <MyLayout.Header>
          <SelectMonth month={monthToDisplay} setMonth={setMonthToDisplay} />
        </MyLayout.Header>
        <MyLayout.Body>
          <div></div>
        </MyLayout.Body>
        <MyLayout.Footer>
          <div></div>
        </MyLayout.Footer>
      </MyLayout>
    </>
  );
}

export default App;
