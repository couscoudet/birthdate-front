import { BirthdayType } from "@/type/globalTypes";
import { useState } from "react";
import { useApi } from "./useApi";
import { AxiosResponse } from "axios";

function concatenateWithoutDuplicate(
  arr1: BirthdayType[],
  arr2: BirthdayType[]
) {
  const fullset = arr1.concat(arr2);
  const filteredSet: BirthdayType[] = [];
  fullset.forEach((birthday) => {
    const index = birthday.id!;
    filteredSet[index] = birthday;
  });
  const result: BirthdayType[] = [];
  filteredSet.forEach((birthday) => result.push(birthday));
  return result;
}

const useBirthday = () => {
  const [birthdays, setBirthdays] = useState<BirthdayType[]>([]);
  const api = useApi();

  const loadBirthdaysForMonth = async (month: number) => {
    try {
      const response = await api.get(`/api/birthday/by-month/${month}`);
      setBirthdays((prev) =>
        concatenateWithoutDuplicate(prev, response.data.birthdays)
      );
    } catch (e) {
      alert("problème lors du chargement des anniversaires");
    }
  };

  const addBirthday = async (birthday: BirthdayType) => {
    try {
      const newBirthday: AxiosResponse<BirthdayType> = await api.post(
        `/api/birthday`,
        { birthday: birthday }
      );
      setBirthdays((prev) => [...prev, newBirthday.data]);
    } catch (e) {
      alert("erreur de la sauvegarde : " + e);
    }
  };

  return { birthdays, loadBirthdaysForMonth, addBirthday };
};

export default useBirthday;
