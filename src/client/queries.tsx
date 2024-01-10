import { useState, useEffect } from "react";
import { BadDriverInfoInterface, APIResponseInterface } from "../shared/types";
import { get, post } from "./fetchers";

export const getBadDrivers = () => {
  const [data, setData] = useState<BadDriverInfoInterface[]>([]);

  const getData = async () => {
    const { badDrivers } = await get<APIResponseInterface>("http://localhost:4000/api/top10");
    setData(badDrivers);
  };

  useEffect(() => {
    getData();
  }, []);

  return data;
};
